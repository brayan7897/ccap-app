"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Loader2, UserCircle, Save } from "lucide-react";
import { useUser, useUpdateProfile } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
	first_name: z.string().min(2, "El nombre es muy corto"),
	last_name: z.string().min(2, "El apellido es muy corto"),
	phone_number: z.string().optional().nullable(),
	bio: z.string().max(500, "La biografía es muy larga").optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
	const { data: user, isLoading } = useUser();
	const updateProfile = useUpdateProfile();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			phone_number: "",
			bio: "",
		},
	});

	useEffect(() => {
		if (user) {
			reset({
				first_name: user.first_name || "",
				last_name: user.last_name || "",
				phone_number: user.phone_number || "",
				bio: user.bio || "",
			});
		}
	}, [user, reset]);

	const onSubmit = (data: ProfileFormValues) => {
		updateProfile.mutate({
			first_name: data.first_name,
			last_name: data.last_name,
			phone_number: data.phone_number || undefined,
			bio: data.bio || undefined,
		});
	};

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<Loader2 className="w-8 h-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div>
				<h1 className="text-3xl font-black text-foreground flex items-center gap-3">
					<UserCircle className="w-8 h-8 text-primary" />
					Mi Perfil
				</h1>
				<p className="text-muted-foreground mt-2">
					Visualiza y actualiza tu información personal y de contacto.
				</p>
			</div>

			<div className="bg-card border border-border shadow-md rounded-3xl p-6 lg:p-10 relative overflow-hidden">
				{/* Background glow */}
				<div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label htmlFor="first_name" className="font-semibold">Nombre(s)</Label>
							<Input
								id="first_name"
								placeholder="Tus nombres"
								{...register("first_name")}
								className="h-12 rounded-xl bg-background/50 focus:bg-background transition-colors"
							/>
							{errors.first_name && (
								<p className="text-xs text-destructive font-medium">{errors.first_name.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="last_name" className="font-semibold">Apellido(s)</Label>
							<Input
								id="last_name"
								placeholder="Tus apellidos"
								{...register("last_name")}
								className="h-12 rounded-xl bg-background/50 focus:bg-background transition-colors"
							/>
							{errors.last_name && (
								<p className="text-xs text-destructive font-medium">{errors.last_name.message}</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label htmlFor="email" className="font-semibold text-muted-foreground">Correo Electrónico (No editable)</Label>
							<Input
								id="email"
								value={user?.email || ""}
								disabled
								className="h-12 rounded-xl bg-muted/50 border-dashed text-muted-foreground"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="phone_number" className="font-semibold">Número de Teléfono</Label>
							<Input
								id="phone_number"
								placeholder="+51 999 999 999"
								{...register("phone_number")}
								className="h-12 rounded-xl bg-background/50 focus:bg-background transition-colors"
							/>
							{errors.phone_number && (
								<p className="text-xs text-destructive font-medium">{errors.phone_number.message}</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="bio" className="font-semibold">Biografía / Resumen Profesional</Label>
						<Textarea
							id="bio"
							placeholder="Cuéntanos un poco sobre tu experiencia profesional..."
							{...register("bio")}
							className="min-h-[140px] rounded-2xl resize-y bg-background/50 focus:bg-background transition-colors p-4"
						/>
						{errors.bio && (
							<p className="text-xs text-destructive font-medium">{errors.bio.message}</p>
						)}
					</div>

					<div className="pt-6 border-t border-border flex justify-end">
						<Button
							type="submit"
							disabled={updateProfile.isPending}
							className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
						>
							{updateProfile.isPending ? (
								<>
									<Loader2 className="w-5 h-5 mr-2 animate-spin" />
									Guardando...
								</>
							) : (
								<>
									<Save className="w-5 h-5 mr-2" />
									Guardar Cambios
								</>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
