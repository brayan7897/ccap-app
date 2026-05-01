import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const numero = searchParams.get("numero");

	if (!numero || !/^\d{8}$/.test(numero)) {
		return NextResponse.json({ error: "DNI inválido" }, { status: 400 });
	}

	const apiToken = process.env.RENIEC_API_TOKEN;

	try {
		const headers: Record<string, string> = {
			Accept: "application/json",
		};

		if (apiToken) {
			headers["Authorization"] = `Bearer ${apiToken}`;
		}

		const res = await fetch(`https://api.apis.net.pe/v2/dni?numero=${numero}`, {
			headers,
			signal: AbortSignal.timeout(5000),
		});

		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			console.error("[dni-proxy] upstream error:", res.status, body);
			return NextResponse.json(
				{ error: "DNI no encontrado o servicio no disponible" },
				{ status: res.status }
			);
		}

		const data = await res.json();
		return NextResponse.json(data);
	} catch (err) {
		console.error("[dni-proxy] fetch error:", err);
		return NextResponse.json(
			{ error: "Error al consultar el servicio de RENIEC" },
			{ status: 503 }
		);
	}
}
