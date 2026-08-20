"use client";

import Script from "next/script";
import { useCookieConsentStore } from "@/store/cookie-consent-store";

interface Props {
  measurementId?: string;
}

// Only loads GA4 once the user has opted into analytics cookies via the
// cookie-consent banner/preferences — see CookieConsentBanner.tsx.
export function GoogleAnalytics({ measurementId }: Props) {
  const analyticsEnabled = useCookieConsentStore((s) => s.analyticsEnabled);

  if (!measurementId || !analyticsEnabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
