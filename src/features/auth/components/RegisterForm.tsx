"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
	const { mutate: register_, isPending } = useRegister();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) as any });

	return (
		<form
			onSubmit={handleSubmit((data) => register_(data))}
			className="space-y-4">
			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-1">
					<Label htmlFor="first_name">Nombre</Label>
					<Input
						id="first_name"
						placeholder="Juan"
						{...register("first_name")}
					/>
					{errors.first_name && (
						<p className="text-sm text-destructive">
							{errors.first_name.message}
						</p>
					)}
				</div>
				<div className="space-y-1">
					<Label htmlFor="last_name">Apellido</Label>
					<Input
						id="last_name"
						placeholder="Pérez"
						{...register("last_name")}
					/>
					{errors.last_name && (
						<p className="text-sm text-destructive">
							{errors.last_name.message}
						</p>
					)}
				</div>
			</div>

			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="tu@email.com"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-sm text-destructive">{errors.email.message}</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="password">Contraseña</Label>
				<Input
					id="password"
					type="password"
					placeholder="••••••••"
					{...register("password")}
				/>
				{errors.password && (
					<p className="text-sm text-destructive">{errors.password.message}</p>
				)}
			</div>

			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-1">
					<Label htmlFor="document_type">Tipo doc.</Label>
					<select
						id="document_type"
						{...register("document_type")}
						className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
						<option value="DNI">DNI</option>
						<option value="PASSPORT">Pasaporte</option>
						<option value="RUC">RUC</option>
					</select>
				</div>
				<div className="space-y-1">
					<Label htmlFor="document_number">Número</Label>
					<Input
						id="document_number"
						placeholder="12345678"
						{...register("document_number")}
					/>
					{errors.document_number && (
						<p className="text-sm text-destructive">
							{errors.document_number.message}
						</p>
					)}
				</div>
			</div>

			{/* role_id hidden — in a real app this would be selected or assigned by default */}
			<input type="hidden" {...register("role_id")} value="" />

			<Button type="submit" className="w-full" disabled={isPending}>
				{isPending ? "Creando cuenta..." : "Crear cuenta"}
			</Button>

			<p className="text-center text-sm text-muted-foreground">
				¿Ya tienes cuenta?{" "}
				<Link href="/login" className="underline hover:text-foreground">
					Inicia sesión
				</Link>
			</p>
		</form>
	);
}
