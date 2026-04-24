# Sistema de Notificaciones — Documentación para el Frontend

> **Base URL:** `/api/v1/notifications`
> **Prefijo global:** `APP_PREFIX` (ver configuración del entorno, habitualmente `/api/v1`)

---

## Arquitectura General

El sistema usa un modelo **Híbrido Pull + Push**:

| Capa | Tecnología | Rol |
|---|---|---|
| **Almacenamiento** | PostgreSQL | Fuente de verdad — texto, tipo, estado |
| **Velocidad** | Redis (key-value) | Contador de no leídas en RAM (sub-ms) |
| **Tiempo Real** | Redis Pub/Sub + SSE | Campanita instantánea sin polling |

### Dos tipos de notificaciones

| Tipo | `is_global` | Cómo se crea | Cómo se muestra |
|---|---|---|---|
| **Dirigida** | `false` | Se inserta 1 fila en `user_notifications` por destinatario | PATCH marca la fila como leída |
| **Global (Broadcast)** | `true` | NO se insertan filas — solo existe en `notifications` | El inbox las fusiona con las dirigidas vía UNION query |

---

## Modelos de Respuesta

### `NotificationResponse` (solo admin)
```typescript
interface NotificationResponse {
  id: string;           // UUID de la notificación
  type: NotificationType;
  title: string;
  message: string;
  action_url: string | null;
  is_global: boolean;   // true = broadcast, false = dirigida
  created_at: string;   // ISO 8601
}
```

### `UserNotificationResponse` (inbox del usuario)
```typescript
interface UserNotificationResponse {
  id: string;              // UUID del pivot (fila user_notifications) o notificación si global
  notification_id: string; // UUID de la notificación base
  type: NotificationType;
  title: string;
  message: string;
  action_url: string | null;
  is_read: boolean;
  is_deleted: boolean;
  is_global: boolean;
  read_at: string | null;  // ISO 8601 o null
  created_at: string;      // ISO 8601
}
```

### `NotificationType` (enum)
```typescript
type NotificationType =
  | "SYSTEM"
  | "COURSE_UPDATE"
  | "ACHIEVEMENT"
  | "PROMOTION"
  | "REMINDER";
```

---

## Rutas del Usuario (cualquier usuario autenticado y activo)

### 📥 1. Obtener inbox

```http
GET /api/v1/notifications/inbox
Authorization: Bearer <token>
```

**Query params opcionales:**

| Param | Tipo | Default | Descripción |
|---|---|---|---|
| `skip` | `int` | `0` | Paginación — saltar N registros |
| `limit` | `int ≤ 100` | `50` | Máximo de registros a retornar |
| `unread_only` | `bool` | `false` | Si `true`, solo retorna no leídas |

**Respuesta `200`:**
```json
[
  {
    "id": "abc123-pivot-id",
    "notification_id": "notif-uuid",
    "type": "SYSTEM",
    "title": "Acceso aprobado",
    "message": "Tu cuenta ha sido activada. Ya puedes acceder a los cursos.",
    "action_url": "/dashboard",
    "is_read": false,
    "is_deleted": false,
    "is_global": false,
    "read_at": null,
    "created_at": "2026-04-04T02:00:00"
  },
  {
    "id": "global-notif-uuid",
    "notification_id": "global-notif-uuid",
    "type": "SYSTEM",
    "title": "Mantenimiento programado",
    "message": "El sistema estará en mantenimiento el sábado de 2AM a 4AM.",
    "action_url": null,
    "is_read": false,
    "is_deleted": false,
    "is_global": true,
    "read_at": null,
    "created_at": "2026-04-04T01:00:00"
  }
]
```

> **Nota para el frontend:** El inbox fusiona notificaciones dirigidas (`is_global: false`) y globales (`is_global: true`) ordenadas por `created_at` descendente.

---

### 🔔 2. Contador de no leídas

```http
GET /api/v1/notifications/inbox/unread-count
Authorization: Bearer <token>
```

**Respuesta `200`:**
```json
{ "unread_count": 3 }
```

> **Optimización:** Este endpoint lee desde Redis (< 1ms). Úsalo en polling cada 30s o complementa con el [stream SSE](#-6-stream-sse-en-tiempo-real) para eliminar el polling.

**Uso típico para el badge de la campanita:**
```typescript
// Polling simple (alternativa al SSE)
const fetchUnreadCount = async () => {
  const res = await fetch('/api/v1/notifications/inbox/unread-count', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const { unread_count } = await res.json();
  setBadgeCount(unread_count);
};
```

---

### ✅ 3. Marcar una notificación como leída

```http
PATCH /api/v1/notifications/inbox/{pivot_id}/read
Authorization: Bearer <token>
```

**Parámetros:**

| Param | Dónde | Descripción |
|---|---|---|
| `pivot_id` | Path | El campo `id` del objeto devuelto por el inbox |

> **Importante:** `pivot_id` es el campo `id` del `UserNotificationResponse` (NO el `notification_id`). Para notificaciones globales, si el usuario no ha interactuado antes, el backend crea la fila pivot automáticamente.

**Respuesta `200`:** Objeto `UserNotificationResponse` con `is_read: true`.

**Ejemplo:**
```typescript
const markRead = async (pivotId: string) => {
  const res = await fetch(`/api/v1/notifications/inbox/${pivotId}/read`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json(); // UserNotificationResponse
};
```

---

### ✅✅ 4. Marcar todas como leídas

```http
PATCH /api/v1/notifications/inbox/read-all
Authorization: Bearer <token>
```

**Respuesta `200`:**
```json
{ "marked_read": 5 }
```

> Marca tanto las dirigidas como las globales. El contador en Redis se pone a `0` instantáneamente.

---

### 🗑️ 5. Eliminar (descartar) del inbox

```http
DELETE /api/v1/notifications/inbox/{pivot_id}
Authorization: Bearer <token>
```

**Parámetros:**

| Param | Dónde | Descripción |
|---|---|---|
| `pivot_id` | Path | El campo `id` del `UserNotificationResponse` |

**Respuesta `200`:**
```json
{ "deleted": true }
```

> **Soft-delete:** La notificación se marca como `is_deleted: true`. No afecta a otros usuarios. No aparecerá en el inbox del usuario en futuras peticiones, pero sigue existiendo en la BD.

**Para notificaciones globales:** Al eliminarla, el sistema crea una fila pivot con `is_deleted: true` para excluirla del inbox de ese usuario sin afectar a los demás.

---

### 📡 6. Stream SSE en tiempo real

```http
GET /api/v1/notifications/stream
Authorization: Bearer <token>
```

> **Este endpoint mantiene la conexión abierta.** El servidor envía eventos cuando llegan notificaciones nuevas.

**Formato del evento:**
```
data: {"id":"...", "type":"SYSTEM", "title":"...", "message":"...", "action_url":null, "is_global":false, "created_at":"..."}

```

**Implementación en Next.js / React:**

```typescript
// hooks/useNotificationStream.ts
import { useEffect, useCallback } from 'react';

interface NotificationEvent {
  id: string;
  type: string;
  title: string;
  message: string;
  action_url: string | null;
  is_global: boolean;
  created_at: string;
}

export function useNotificationStream(
  token: string,
  onNotification: (notif: NotificationEvent) => void
) {
  useEffect(() => {
    if (!token) return;

    const es = new EventSource(
      `/api/v1/notifications/stream`,
      // Si usas cookies en lugar de Bearer, puedes usar { withCredentials: true }
    );

    // Para usar Bearer token con EventSource (no soporta headers nativamente):
    // usa una librería como @microsoft/fetch-event-source
    // Ver sección "Token en SSE" más abajo.

    es.onmessage = (event) => {
      const notif: NotificationEvent = JSON.parse(event.data);
      onNotification(notif);
    };

    es.onerror = () => {
      // EventSource reintenta automáticamente en caso de error
      console.error('SSE connection lost, retrying...');
    };

    return () => {
      es.close(); // Limpia al desmontar el componente
    };
  }, [token, onNotification]);
}

// Uso en un componente:
function NotificationBell() {
  const [count, setCount] = useState(0);
  const { token } = useAuth();

  const handleNotification = useCallback((notif) => {
    setCount(prev => prev + 1);
    toast.info(notif.title); // Mostrar toast
  }, []);

  useNotificationStream(token, handleNotification);

  return <BellIcon badgeCount={count} />;
}
```

**Usando `@microsoft/fetch-event-source` (recomendado para Bearer token):**

```typescript
import { fetchEventSource } from '@microsoft/fetch-event-source';

fetchEventSource('/api/v1/notifications/stream', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  onmessage(event) {
    const notif = JSON.parse(event.data);
    onNotification(notif);
  },
  onerror(err) {
    console.error('SSE error:', err);
    // La librería reintenta automáticamente
  },
});
```

---

## Rutas del Admin (`notification:manage` o `admin:access`)

### 📝 7. Crear notificación

```http
POST /api/v1/notifications/
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Body:**
```json
{
  "type": "SYSTEM",
  "title": "Nuevos cursos disponibles",
  "message": "Se han agregado 3 cursos nuevos a la plataforma.",
  "action_url": "/courses",
  "is_global": true,
  "target_user_ids": []
}
```

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `string` | ✅ | Título de la notificación |
| `message` | `string` | ✅ | Contenido del mensaje |
| `type` | `NotificationType` | No (default: `SYSTEM`) | Tipo de notificación |
| `action_url` | `string \| null` | No | Enlace al hacer click (ej. `/courses/slug`) |
| `is_global` | `boolean` | No (default: `false`) | Si `true`: broadcast global sin fan-out |
| `target_user_ids` | `string[]` | No (default: `[]`) | UUIDs de destinatarios (solo si `is_global=false`) |

**Lógica de entrega:**

| `is_global` | `target_user_ids` | Resultado |
|---|---|---|
| `true` | ignorado | Broadcast global (lazy — no inserta filas por usuario) |
| `false` | `[]` (vacío) | Dirigida a **todos** los usuarios activos |
| `false` | `["uuid1", "uuid2"]` | Dirigida solo a esos usuarios |

**Respuesta `201`:** `NotificationResponse`

---

### 📋 8. Listar todas las notificaciones

```http
GET /api/v1/notifications/?skip=0&limit=50
Authorization: Bearer <admin-token>
```

**Respuesta `200`:** `NotificationResponse[]` ordenadas por `created_at DESC`.

---

### 🔍 9. Detalle de una notificación

```http
GET /api/v1/notifications/{notification_id}
Authorization: Bearer <admin-token>
```

**Respuesta `200`:** `NotificationResponse`

---

### ❌ 10. Eliminar notificación (hard-delete)

```http
DELETE /api/v1/notifications/{notification_id}
Authorization: Bearer <admin-token>
```

**Respuesta `200`:**
```json
{ "deleted": true }
```

> **Impacto:**
> - **Global:** La notificación desaparece del inbox de TODOS los usuarios.
> - **Dirigida:** CASCADE elimina todas las filas de `user_notifications` relacionadas.
> - Los contadores Redis de todos los usuarios activos se invalidan (se recalculan desde SQL en la próxima solicitud).

---

## Tabla Completa de Rutas

| Método | Ruta | Auth requerida | Descripción |
|---|---|---|---|
| `GET` | `/notifications/inbox` | Usuario activo | Inbox unificado (dirigidas + globales) |
| `GET` | `/notifications/inbox/unread-count` | Usuario activo | Contador no leídas (Redis cache) |
| `PATCH` | `/notifications/inbox/{pivot_id}/read` | Usuario activo | Marca una como leída |
| `PATCH` | `/notifications/inbox/read-all` | Usuario activo | Marca todas como leídas |
| `DELETE` | `/notifications/inbox/{pivot_id}` | Usuario activo | Soft-delete del inbox del usuario |
| `GET` | `/notifications/stream` | Usuario activo | SSE — eventos en tiempo real |
| `POST` | `/notifications/` | `notification:manage` | Crear y enviar notificación |
| `GET` | `/notifications/` | `notification:manage` | Listar todas (admin) |
| `GET` | `/notifications/{id}` | `notification:manage` | Detalle de notificación (admin) |
| `DELETE` | `/notifications/{id}` | `notification:manage` | Hard-delete (admin) |

---

## Flujos Completos

### Flujo A: Notificación Dirigida (ej. "Acceso aprobado")

```
Admin                   FastAPI                  Redis                  Usuario
  │                        │                       │                      │
  │─── POST /notifications ─▶                       │                      │
  │    {is_global: false,   │                       │                      │
  │     target: [user_id]}  │                       │                      │
  │                        │──INSERT notifications──▶ BD                   │
  │                        │──INSERT user_notifications─▶ BD               │
  │                        │──INCR notif:count:{uid}─▶                     │
  │                        │──PUBLISH notif:live:{uid}─▶                   │
  │                        │                       │──SSE event──────────▶│
  │                        │                       │              🔔 +1    │
  │                        │                       │                       │
  │                       ◀── 201 NotificationResponse                     │
  │                                                                         │
  │                                            Usuario abre inbox           │
  │                        ◀─── GET /inbox ─────────────────────────────── │
  │                        │──SELECT user_notifications JOIN notifications──▶ BD
  │                        ──────────── 200 [...notifs] ───────────────────▶│
  │                                                                         │
  │                                         Usuario marca como leída        │
  │                        ◀── PATCH /inbox/{id}/read ──────────────────── │
  │                        │──UPDATE user_notifications SET is_read=true──▶ BD
  │                        │──DECR notif:count:{uid}─────────────────────▶ │
  │                        ──────────── 200 {is_read: true} ──────────────▶│
```

### Flujo B: Broadcast Global (ej. "Mantenimiento del sistema")

```
Admin                   FastAPI                  Redis                 Usuarios (N)
  │                        │                       │                      │
  │─── POST /notifications ─▶                       │                      │
  │    {is_global: true}    │                       │                      │
  │                        │──INSERT notifications──▶ BD (1 sola fila)     │
  │                        │──PUBLISH notif:live:broadcast─▶               │
  │                        │──DEL notif:count:* (todos activos)─▶          │ ←─ SSE ──▶ 🔔
  │                       ◀── 201 NotificationResponse                     │
  │                                                                         │
  │                                         Usuario pide contador           │
  │                        ◀── GET /inbox/unread-count ────────────────── *│
  │                        │ Redis miss → SQL unread_count()                │
  │                        │ (cuenta globals sin interacción + dirigidas)   │
  │                        │──SET notif:count:{uid}─────────────────────▶  │
  │                        ──────────── 200 {unread_count: N} ────────────▶│
  │                                                                         │
  │                                         Usuario descarta global         │
  │                        ◀── DELETE /inbox/{notif_id} ───────────────── │
  │                        │──UPSERT user_notifications                    │
  │                        │  (is_deleted=True, para ese usuario) ──────▶ BD
  │                        │──DECR notif:count:{uid}─────────────────────▶ │
  │                        ──────────── 200 {deleted: true} ──────────────▶│
```

---

## Estrategia Recomendada en Next.js

### Combinar SSE + polling de respaldo

```typescript
// services/notifications.ts

const BASE = '/api/v1/notifications';

export const notificationsApi = {
  // Inbox
  getInbox: (params?: { skip?: number; limit?: number; unread_only?: boolean }) =>
    fetch(`${BASE}/inbox?${new URLSearchParams(params as any)}`),

  // Contador (Redis-first)
  getUnreadCount: () =>
    fetch(`${BASE}/inbox/unread-count`),

  // Acción individual
  markRead: (pivotId: string) =>
    fetch(`${BASE}/inbox/${pivotId}/read`, { method: 'PATCH' }),

  markAllRead: () =>
    fetch(`${BASE}/inbox/read-all`, { method: 'PATCH' }),

  deleteFromInbox: (pivotId: string) =>
    fetch(`${BASE}/inbox/${pivotId}`, { method: 'DELETE' }),

  // Admin
  create: (body: CreateNotificationRequest) =>
    fetch(`${BASE}/`, { method: 'POST', body: JSON.stringify(body) }),

  listAll: (params?: { skip?: number; limit?: number }) =>
    fetch(`${BASE}/?${new URLSearchParams(params as any)}`),

  deleteNotification: (id: string) =>
    fetch(`${BASE}/${id}`, { method: 'DELETE' }),
};
```

### `pivot_id` vs `notification_id` — Guía rápida

```typescript
const notif = inboxItems[0]; // UserNotificationResponse

// ✅ Para marcar como leída o eliminar del inbox:
await markRead(notif.id);           // usa "id" (pivot)
await deleteFromInbox(notif.id);    // usa "id" (pivot)

// ❌ NO uses notification_id para las acciones del inbox:
await markRead(notif.notification_id);  // INCORRECTO
```

> **Regla mnemotécnica:** Las acciones del inbox siempre usan el `id` de la fila del inbox (el pivot), nunca el `notification_id`.

---

## Errores Comunes

| HTTP | Código | Causa | Solución |
|---|---|---|---|
| `401` | Unauthorized | Token inválido o expirado | Re-autenticar |
| `403` | Forbidden | Usuario inactivo o sin permiso | Verificar `is_active` y permisos |
| `404` | DomainError | `pivot_id` o `notification_id` no encontrado | Verificar que el ID es del inbox del usuario actual |
| `422` | Unprocessable | Body mal formado | Revisar tipos de campos |

---

## Valores del Enum `NotificationType`

| Valor | Uso sugerido |
|---|---|
| `SYSTEM` | Mensajes del sistema (activación, mantenimiento) |
| `COURSE_UPDATE` | Cambios en un curso (nueva lección, modificación) |
| `ACHIEVEMENT` | Logros (primer curso completado, certificado emitido) |
| `PROMOTION` | Ofertas o descuentos en cursos |
| `REMINDER` | Recordatorios (continuar un curso) |

Usa el `type` para mostrar íconos o colores distintos en la campanita y el inbox.

---

## Notas de Seguridad

1. **El stream SSE requiere autenticación** — El endpoint `/stream` usa `ActiveUser` igual que el resto.
2. **Cada usuario solo ve su inbox** — La query filtra por `user_id` del JWT; no hay forma de ver las notificaciones de otro usuario.
3. **Soft-delete es por usuario** — Descartar una notificación global no afecta a otros usuarios.
4. **Hard-delete es solo admin** — El `DELETE /notifications/{id}` requiere `notification:manage` y elimina para todos.
