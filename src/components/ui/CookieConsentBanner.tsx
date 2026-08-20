"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCookieConsentStore } from "@/store/cookie-consent-store";

export function CookieConsentBanner() {
  // Avoids an SSR/client mismatch: the persisted choice only exists in
  // localStorage, so we don't know it until after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasResponded = useCookieConsentStore((s) => s.hasResponded);
  const acceptAll = useCookieConsentStore((s) => s.acceptAll);
  const rejectNonEssential = useCookieConsentStore((s) => s.rejectNonEssential);
  const openPreferences = useCookieConsentStore((s) => s.openPreferences);

  if (!mounted || hasResponded) return <CookiePreferencesDialog />;

  return (
    <>
      <div
        role="dialog"
        aria-label="Preferencias de cookies"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 shadow-lg backdrop-blur supports-backdrop-filter:bg-card/85">
        <div className="container mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center lg:px-8">
          <Cookie className="hidden h-6 w-6 shrink-0 text-primary md:block" />
          <p className="flex-1 text-xs text-muted-foreground leading-snug sm:text-sm">
            Usamos cookies necesarias para el funcionamiento de la plataforma y, si lo
            aceptas, cookies de análisis para mejorar el servicio. Más detalles en la{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Política de Privacidad
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-2 sm:shrink-0">
            <Button size="sm" variant="ghost" onClick={openPreferences}>
              Personalizar
            </Button>
            <Button size="sm" variant="outline" onClick={rejectNonEssential}>
              Rechazar no esenciales
            </Button>
            <Button size="sm" onClick={acceptAll}>
              Aceptar todas
            </Button>
          </div>
        </div>
      </div>
      <CookiePreferencesDialog />
    </>
  );
}

function CookiePreferencesDialog() {
  const isPreferencesOpen = useCookieConsentStore((s) => s.isPreferencesOpen);
  const closePreferences = useCookieConsentStore((s) => s.closePreferences);
  const analyticsEnabled = useCookieConsentStore((s) => s.analyticsEnabled);
  const setAnalyticsEnabled = useCookieConsentStore((s) => s.setAnalyticsEnabled);
  const savePreferences = useCookieConsentStore((s) => s.savePreferences);
  const acceptAll = useCookieConsentStore((s) => s.acceptAll);

  return (
    <Dialog
      open={isPreferencesOpen}
      onOpenChange={(open) => !open && closePreferences()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preferencias de cookies</DialogTitle>
          <DialogDescription>
            Elige qué cookies quieres permitir. Puedes cambiar esta elección cuando
            quieras desde el enlace &quot;Preferencias de cookies&quot; en el pie de
            página.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <input
              type="checkbox"
              checked
              disabled
              aria-label="Cookies necesarias, siempre activas"
              className="mt-1 h-4 w-4 shrink-0 accent-primary opacity-60"
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                Necesarias (siempre activas)
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Mantienen tu sesión iniciada y guardan preferencias básicas como el
                tema claro/oscuro. Sin ellas la plataforma no funciona correctamente.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              aria-label="Cookies de análisis"
              className="mt-1 h-4 w-4 shrink-0 accent-primary"
            />
            <div>
              <p className="text-sm font-medium text-foreground">Análisis (opcional)</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Nos ayudan a entender cómo se usa la plataforma para mejorarla (Google
                Analytics). Solo se activan si las aceptas.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={savePreferences}>
            Guardar preferencias
          </Button>
          <Button onClick={acceptAll}>Aceptar todas</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
