"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// ─── Module-level singleton ───────────────────────────────────────────────────
// Creating the client outside the component (as a module singleton) lets
// non-React code (e.g. the Axios interceptor in lib/api.ts) call
// getQueryClient() to invalidate cache when a session is force-terminated.
// Safe for Next.js App Router: each browser session shares one instance, and
// SSR does NOT share this singleton across requests (each server worker has its own module).
let _queryClient: QueryClient | null = null;

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000, // 1 minute
				retry: 1,
			},
		},
	});
}

/** Returns the active QueryClient, or null if called before the provider mounts. */
export function getQueryClient(): QueryClient | null {
	return _queryClient;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
	// Lazily initialise the singleton once on the client
	if (!_queryClient) {
		_queryClient = makeQueryClient();
	}

	return (
		<QueryClientProvider client={_queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
