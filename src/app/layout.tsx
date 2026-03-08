import type { Metadata } from "next";
import { DM_Sans, Libre_Baskerville, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
	variable: "--font-libre-baskerville",
	weight: ["400", "700"],
	subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "CCAP | Plataforma de E-Learning",
	description: "Aprende sin límites con nuestra plataforma educativa.",
};

// Inline script injected before React hydrates — prevents flash of wrong theme
const themeScript = `
(function() {
  try {
    var s = JSON.parse(localStorage.getItem('ccap-ui') || '{}');
    if (s.state && s.state.darkMode) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				{/* Anti-flash script: runs synchronously before paint */}
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body
				className={`${dmSans.variable} ${libreBaskerville.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
				<QueryProvider>
					<ThemeProvider>
						{children}
						<Toaster
							position="top-right"
							richColors
							closeButton
							toastOptions={{ duration: 4000 }}
						/>
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
