"use client";

import { useEffect, useRef } from "react";
import { useGoogleLogin } from "../hooks/useAuth";

declare global {
	interface Window {
		google: {
			accounts: {
				id: {
					initialize: (config: {
						client_id: string;
						callback: (response: { credential: string }) => void;
					}) => void;
					renderButton: (
						parent: HTMLElement,
						options: {
							theme?: string;
							size?: string;
							text?: string;
							width?: number;
						},
					) => void;
				};
			};
		};
		onGoogleLibraryLoad?: () => void;
	}
}

export function GoogleLoginButton() {
	const { mutate: googleLogin } = useGoogleLogin();
	const loginRef = useRef(googleLogin);
	loginRef.current = googleLogin;

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
		if (!clientId) {
			console.error(
				"[GoogleLoginButton] NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set.",
			);
			return;
		}

		const init = () => {
			window.google.accounts.id.initialize({
				client_id: clientId,
				callback: (response: { credential: string }) => {
					loginRef.current(response.credential);
				},
			});

			if (containerRef.current) {
				window.google.accounts.id.renderButton(containerRef.current, {
					theme: "outline",
					size: "large",
					text: "signin_with",
					width: containerRef.current.offsetWidth || 160,
				});
			}
		};

		if (typeof window !== "undefined" && window.google) {
			init();
		} else {
			window.onGoogleLibraryLoad = init;
		}

		return () => {
			window.onGoogleLibraryLoad = undefined;
		};
	}, []);

	return <div ref={containerRef} className="w-full" />;
}
