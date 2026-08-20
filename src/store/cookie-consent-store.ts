import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CookieConsentState {
  hasResponded: boolean;
  analyticsEnabled: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  setAnalyticsEnabled: (value: boolean) => void;
  savePreferences: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set) => ({
      hasResponded: false,
      analyticsEnabled: false,
      isPreferencesOpen: false,

      acceptAll: () =>
        set({ hasResponded: true, analyticsEnabled: true, isPreferencesOpen: false }),
      rejectNonEssential: () =>
        set({ hasResponded: true, analyticsEnabled: false, isPreferencesOpen: false }),
      setAnalyticsEnabled: (value) => set({ analyticsEnabled: value }),
      savePreferences: () => set({ hasResponded: true, isPreferencesOpen: false }),
      openPreferences: () => set({ isPreferencesOpen: true }),
      closePreferences: () => set({ isPreferencesOpen: false }),
    }),
    {
      name: "ccap-cookie-consent", // localStorage key
      partialize: (s) => ({
        hasResponded: s.hasResponded,
        analyticsEnabled: s.analyticsEnabled,
      }),
    }
  )
);
