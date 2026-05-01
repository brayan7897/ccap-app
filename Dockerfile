# ──────────────────────────────────────────────────────────────────────────────
# Stage 1 — deps
# Instala únicamente las dependencias de producción + dev (necesarias para build)
# Usamos la imagen Alpine para mantener el tamaño reducido.
# ──────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps

# Instala libc6-compat por compatibilidad con algunos módulos nativos de Node
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copia los manifiestos de dependencias primero para aprovechar la caché de capas
COPY package.json package-lock.json ./

# Instala todas las dependencias (incluyendo devDependencies para el build)
RUN npm ci

# ──────────────────────────────────────────────────────────────────────────────
# Stage 2 — builder
# Construye la aplicación Next.js en modo producción (output standalone)
# ──────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Trae los node_modules del stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copia el resto del código fuente
COPY . .

# Variables de entorno de build-time (públicas / NEXT_PUBLIC_*)
# Sobreescríbelas con --build-arg en tu pipeline de CI/CD si es necesario
ARG NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID=""
ARG NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/51999999999
ARG NEXT_PUBLIC_WHATSAPP_MESSAGE="Hola! Tengo una consulta sobre los cursos de CCAP Global."

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID \
    NEXT_PUBLIC_WHATSAPP_URL=$NEXT_PUBLIC_WHATSAPP_URL \
    NEXT_PUBLIC_WHATSAPP_MESSAGE=$NEXT_PUBLIC_WHATSAPP_MESSAGE

# Deshabilita la telemetría de Next.js durante el build
ENV NEXT_TELEMETRY_DISABLED=1

# Construye la aplicación — genera .next/standalone gracias a output:'standalone'
RUN npm run build

# ──────────────────────────────────────────────────────────────────────────────
# Stage 3 — runner (imagen final de producción)
# Solo contiene el artefacto standalone + archivos estáticos.
# No incluye node_modules completos ni código fuente.
# ──────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crea un usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copia los archivos estáticos públicos
COPY --from=builder /app/public ./public

# Copia la salida standalone de Next.js y los assets estáticos generados
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Puerto por defecto de Next.js
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# El servidor standalone se arranca con node server.js
CMD ["node", "server.js"]
