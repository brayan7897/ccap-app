"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import {
	Loader2,
	Save,
	Lock,
	IdCard,
	ShieldCheck,
	CircleUser,
	Camera,
	UserRound,
	Pencil,
	KeyRound,
	Eye,
	EyeOff,
	CheckCircle2,
	XCircle,
	AlertCircle,
} from "lucide-react";
import {
	useUser,
	useUpdateProfile,
	useUpdateDocument,
	useChangePassword,
} from "@/features/auth/hooks/useAuth";
import { EmailChangeCard } from "@/features/auth/components/EmailChangeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { CourseAccess } from "@/types";

// ── Schemas ───────────────────────────────────────────────────────────────────
const profileSchema = z.object({
	first_name: z
		.string()
		.trim()
		.min(2, "El nombre es muy corto")
		.max(60, "El nombre es muy largo")
		.regex(/^[a-zA-ZÀ-ÿ\s'\-]+$/, "Solo puede contener letras"),
	last_name: z
		.string()
		.trim()
		.min(2, "El apellido es muy corto")
		.max(60, "El apellido es muy largo")
		.regex(/^[a-zA-ZÀ-ÿ\s'\-]+$/, "Solo puede contener letras"),
	phone_number: z
		.string()
		.trim()
		.refine(
			(val) => {
				if (!val) return true;
				const clean = val.replace(/[\s\-]/g, "");
				return /^(?:\+51)?9\d{8}$/.test(clean);
			},
			{
				message: "Debe ser un celular de Perú válido (Ej. +51 987654321 o 987654321)",
			},
		)
		.optional()
		.nullable(),
	avatar_url: z
		.string()
		.trim()
		.max(500, "URL demasiado larga")
		.refine((val) => val === "" || /^https:\/\/.+/.test(val), {
			message: "Debe comenzar con https://",
		})
		.optional()
		.nullable(),
	bio: z
		.string()
		.trim()
		.max(500, "La biografía es muy larga")
		.optional()
		.nullable(),
	professional_career: z
		.string()
		.trim()
		.max(100, "La carrera es muy larga")
		.optional()
		.nullable(),
});

const DOC_RULES: Record<
	string,
	{ placeholder: string; hint: string; regex: RegExp; error: string }
> = {
	DNI: {
		placeholder: "Ej. 12345678",
		hint: "8 dígitos numéricos",
		regex: /^\d{8}$/,
		error: "El DNI debe tener exactamente 8 dígitos numéricos",
	},
	CE: {
		placeholder: "Ej. 000123456",
		hint: "9 dígitos numéricos",
		regex: /^\d{9}$/,
		error: "El carné de extranjería debe tener exactamente 9 dígitos numéricos",
	},
	PASAPORTE: {
		placeholder: "Ej. AB123456",
		hint: "6 a 12 caracteres alfanuméricos (letras y números)",
		regex: /^[A-Za-z0-9]{6,12}$/,
		error: "El pasaporte debe tener entre 6 y 12 caracteres alfanuméricos",
	},
	RUC: {
		placeholder: "Ej. 20123456789",
		hint: "11 dígitos, empieza con 10, 15, 16, 17 o 20",
		regex: /^(10|15|16|17|20)\d{9}$/,
		error: "El RUC debe tener 11 dígitos numéricos y empezar con 10, 15, 16, 17 o 20",
	},
};

const documentSchema = z
	.object({
		document_type: z.enum(["DNI", "CE", "PASAPORTE", "RUC"], {
			error: "Selecciona un tipo de documento",
		}),
		document_number: z.string().trim().min(1, "Ingresa el número de documento"),
	})
	.superRefine(({ document_type, document_number }, ctx) => {
		if (!document_number) return;
		const rule = DOC_RULES[document_type];
		if (rule && !rule.regex.test(document_number)) {
			ctx.addIssue({
				code: "custom",
				path: ["document_number"],
				message: rule.error,
			});
		}
	});

const passwordSchema = z
	.object({
		current_password: z.string().min(1, "Ingresa tu contraseña actual"),
		new_password: z
			.string()
			.min(8, "Mínimo 8 caracteres")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Debe tener mayúsculas, minúsculas y un número",
			),
		confirm_password: z.string().min(1, "Confirma tu nueva contraseña"),
	})
	.refine((d) => d.new_password === d.confirm_password, {
		message: "Las contraseñas no coinciden",
		path: ["confirm_password"],
	});

type ProfileFormValues = z.infer<typeof profileSchema>;
type DocumentFormValues = z.infer<typeof documentSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

// ── Validation helpers ────────────────────────────────────────────────────────
type FieldState = "idle" | "error" | "success";

function getInputClass(state: FieldState, extra = "") {
	const base = `transition-colors ${extra}`;
	if (state === "error")
		return `${base} border-destructive focus-visible:ring-destructive/30 bg-destructive/5`;
	if (state === "success")
		return `${base} border-emerald-500 focus-visible:ring-emerald-500/30 bg-emerald-500/5`;
	return base;
}

function FieldMsg({ state, error }: { state: FieldState; error?: string }) {
	if (state === "error" && error)
		return (
			<p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1">
				<XCircle className="h-3 w-3 shrink-0" />
				{error}
			</p>
		);
	return null;
}

function StatusIcon({ state }: { state: FieldState }) {
	if (state === "error")
		return (
			<XCircle className="h-4 w-4 text-destructive absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
		);
	if (state === "success")
		return (
			<CheckCircle2 className="h-4 w-4 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
		);
	return null;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const ACCESS_LABELS: Record<
	CourseAccess,
	{
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
	}
> = {
	NONE: { label: "Sin acceso", variant: "secondary" },
	PENDING: { label: "Pendiente", variant: "outline" },
	APPROVED: { label: "Aprobado", variant: "default" },
	REJECTED: { label: "Rechazado", variant: "destructive" },
};

const DOC_LABELS: Record<string, string> = {
	DNI: "DNI",
	CE: "Carné de Extranjería",
	PASAPORTE: "Pasaporte",
	RUC: "RUC",
};

// ── Sub-components ────────────────────────────────────────────────────────────
function ReadOnlyField({
	label,
	icon,
	value,
	mono = false,
}: {
	label: string;
	icon?: React.ReactNode;
	value?: React.ReactNode;
	mono?: boolean;
}) {
	return (
		<div className="space-y-1.5">
			<Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
				{icon ?? <Lock className="w-3 h-3" />}
				{label}
			</Label>
			<div
				className={`h-11 rounded-xl bg-muted/30 border border-dashed border-border/60 px-4 flex items-center text-sm text-muted-foreground ${mono ? "font-mono tracking-wider" : ""}`}>
				{value ?? <span className="italic opacity-40">Sin datos</span>}
			</div>
		</div>
	);
}

function AvatarPreview({ url, name }: { url: string; name: string }) {
	const [broken, setBroken] = useState(false);
	const isValid = /^https:\/\/.+/.test(url) && !broken;
	const initials = name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((w) => w[0].toUpperCase())
		.join("");

	useEffect(() => {
		setBroken(false);
	}, [url]);

	return (
		<div className="relative w-24 h-24 rounded-full ring-4 ring-primary/20 overflow-hidden bg-muted flex items-center justify-center shrink-0">
			{isValid ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={url}
					alt="Foto de perfil"
					className="w-full h-full object-cover"
					onError={() => setBroken(true)}
				/>
			) : (
				<span className="text-2xl font-black text-ring select-none">
					{initials || (
						<UserRound className="w-10 h-10 text-muted-foreground" />
					)}
				</span>
			)}
			<div className="absolute bottom-0 right-0 bg-ring text-white dark:text-background rounded-full p-1 shadow">
				<Camera className="w-3.5 h-3.5" />
			</div>
		</div>
	);
}

// ── Page ─────────────────────────────────────────────────────────────────────
function PasswordInput({
	id,
	placeholder,
	disabled,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string }) {
	const [show, setShow] = useState(false);
	return (
		<div className="relative">
			<Input
				id={id}
				type={show ? "text" : "password"}
				placeholder={placeholder}
				disabled={disabled}
				className="h-11 rounded-xl bg-background/50 focus:bg-background transition-colors pr-10 disabled:opacity-60 disabled:cursor-not-allowed"
				{...props}
			/>
			<button
				type="button"
				tabIndex={-1}
				disabled={disabled}
				onClick={() => setShow((s) => !s)}
				className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40">
				{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
			</button>
		</div>
	);
}

export default function ProfilePage() {
	const { data: user, isLoading } = useUser();
	const updateProfile = useUpdateProfile();
	const updateDocument = useUpdateDocument();
	const changePassword = useChangePassword();

	const [isEditing, setIsEditing] = useState(false);
	const [isEditingDoc, setIsEditingDoc] = useState(false);
	const hasDocument = !!user?.document_number?.trim();

	// ── Profile form ──────────────────────────────────────────────────────────
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, dirtyFields: profileDirtyFields },
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			phone_number: "",
			avatar_url: "",
			bio: "",
			professional_career: "",
		},
		mode: "onChange",
	});

	const profileFieldState = (name: keyof ProfileFormValues): FieldState => {
		if (!profileDirtyFields[name] || !isEditing) return "idle";
		return errors[name] ? "error" : "success";
	};

	const { onChange: onPhoneChange, ...phoneRegister } =
		register("phone_number");

	const watchedAvatar = useWatch({ control, name: "avatar_url" }) ?? "";
	const watchedFirstName = useWatch({ control, name: "first_name" }) ?? "";
	const watchedLastName = useWatch({ control, name: "last_name" }) ?? "";
	const previewName = `${watchedFirstName} ${watchedLastName}`.trim();

	useEffect(() => {
		if (user) {
			reset({
				first_name: user.first_name || "",
				last_name: user.last_name || "",
				phone_number: user.phone_number || "",
				avatar_url: user.avatar_url || "",
				bio: user.bio || "",
				professional_career: user.professional_career || "",
			});
		}
	}, [user, reset]);

	const onSubmit = (data: ProfileFormValues) => {
		updateProfile.mutate(
			{
				first_name: data.first_name,
				last_name: data.last_name,
				phone_number: data.phone_number || undefined,
				avatar_url: data.avatar_url || undefined,
				bio: data.bio || undefined,
				professional_career: data.professional_career || undefined,
			},
			{
				onSuccess: () => {
					setIsEditing(false);
				},
			},
		);
	};

	const handleEditToggle = () => {
		if (isEditing) {
			handleSubmit(onSubmit)();
		} else {
			setIsEditing(true);
		}
	};

	const handleCancelEdit = () => {
		if (user) {
			reset({
				first_name: user.first_name || "",
				last_name: user.last_name || "",
				phone_number: user.phone_number || "",
				avatar_url: user.avatar_url || "",
				bio: user.bio || "",
				professional_career: user.professional_career || "",
			});
		}
		setIsEditing(false);
	};

	// ── Document form ─────────────────────────────────────────────────────────
	const {
		register: regDoc,
		handleSubmit: handleSubmitDoc,
		setValue: setDocValue,
		watch: watchDoc,
		formState: { errors: errorsDoc, dirtyFields: docDirtyFields },
	} = useForm<DocumentFormValues>({
		resolver: zodResolver(documentSchema),
		defaultValues: { document_type: "DNI", document_number: "" },
		mode: "onChange",
	});

	const docFieldState = (name: keyof DocumentFormValues): FieldState => {
		if (!docDirtyFields[name]) return "idle";
		return errorsDoc[name] ? "error" : "success";
	};

	const { onChange: onDocChange, ...docRegister } = regDoc("document_number");

	const watchedDocType = watchDoc("document_type");

	const onSubmitDocument = (data: DocumentFormValues) => {
		updateDocument.mutate(data, {
			onSuccess: () => {
				setIsEditingDoc(false);
			},
			onError: () => {},
		});
	};

	// ── Password form ─────────────────────────────────────────────────────────
	const {
		register: regPwd,
		handleSubmit: handleSubmitPwd,
		reset: resetPwd,
		formState: { errors: errorsPwd, dirtyFields: pwdDirtyFields },
	} = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			current_password: "",
			new_password: "",
			confirm_password: "",
		},
		mode: "onChange",
	});

	const pwdFieldState = (name: keyof PasswordFormValues): FieldState => {
		if (!pwdDirtyFields[name]) return "idle";
		return errorsPwd[name] ? "error" : "success";
	};

	const onSubmitPassword = (data: PasswordFormValues) => {
		changePassword.mutate(
			{
				current_password: data.current_password,
				new_password: data.new_password,
			},
			{
				onSuccess: () => {
					resetPwd();
				},
			},
		);
	};

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<Loader2 className="w-8 h-8 animate-spin text-ring" />
			</div>
		);
	}

	const access = (user?.course_access ?? "NONE") as CourseAccess;
	const accessInfo = ACCESS_LABELS[access];

	const missingDoc = !user?.document_number?.trim();
	const missingPhone = !user?.phone_number?.trim();
	let missingText = "tu número de documento (DNI/CE/Pasaporte) y un número de teléfono de contacto";
	if (missingDoc && !missingPhone) missingText = "tu número de documento (DNI/CE/Pasaporte)";
	if (!missingDoc && missingPhone) missingText = "un número de teléfono de contacto";

	const showProfileWarning = user?.is_active && user?.course_access === "NONE" && (missingDoc || missingPhone);

	return (
		<div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* ── Aviso de perfil incompleto ────────────────────────────── */}
			{showProfileWarning && (
				<div className="flex items-start gap-3 rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5 shadow-sm">
					<AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
					<div>
						<p className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
							Completa tu perfil para solicitar acceso
						</p>
						<p className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-1 leading-relaxed">
							Para poder matricularte en los cursos, primero necesitamos {missingText}. Asegúrate de completar los datos faltantes y guardar los cambios.
						</p>
					</div>
				</div>
			)}

			{/* ── Header: avatar + name + badges ───────────────────────────── */}
			<div className="bg-card border border-border shadow-md rounded-3xl p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
				<AvatarPreview
					url={watchedAvatar}
					name={previewName || user?.full_name || ""}
				/>

				<div className="flex flex-col items-center sm:items-start gap-2 min-w-0">
					<h1 className="text-2xl font-black text-foreground truncate">
						{previewName || user?.full_name || "—"}
					</h1>
					<p className="text-sm text-muted-foreground">{user?.email}</p>
					<div className="flex flex-wrap gap-2 mt-1">
						<Badge variant="outline" className="capitalize gap-1">
							<CircleUser className="w-3 h-3" />
							{user?.role_name || "—"}
						</Badge>
						<Badge variant={accessInfo.variant}>{accessInfo.label}</Badge>
						<Badge variant={user?.is_active ? "default" : "destructive"}>
							{user?.is_active ? "Cuenta activa" : "Cuenta inactiva"}
						</Badge>
					</div>
				</div>
			</div>

			{/* ── Datos personales (editables) ──────────────────────────────── */}
			<div className="bg-card border border-border shadow-md rounded-3xl p-6 lg:p-8 relative overflow-hidden">
				<div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

				<div className="flex items-center justify-between mb-6 relative z-10">
					<h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
						Datos personales
					</h2>
					{isEditing && (
						<button
							type="button"
							onClick={handleCancelEdit}
							className="text-xs text-muted-foreground hover:text-foreground underline transition-colors">
							Cancelar
						</button>
					)}
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-5 relative z-10">
					{/* Foto de perfil */}
					<div className="space-y-1.5">
						<Label
							htmlFor="avatar_url"
							className="text-xs font-semibold uppercase tracking-wide">
							URL de foto de perfil
						</Label>
						<div className="relative">
							<Input
								id="avatar_url"
								type="url"
								placeholder="https://ejemplo.com/foto.jpg"
								disabled={!isEditing}
								{...register("avatar_url")}
								className={getInputClass(
									profileFieldState("avatar_url"),
									"h-11 rounded-xl bg-background/50 font-mono text-sm pr-8 disabled:opacity-60 disabled:cursor-not-allowed",
								)}
							/>
							<StatusIcon state={profileFieldState("avatar_url")} />
						</div>
						{profileFieldState("avatar_url") === "error" ? (
							<FieldMsg state="error" error={errors.avatar_url?.message} />
						) : (
							isEditing && (
								<p className="text-xs text-muted-foreground">
									Pega la URL de tu foto (debe comenzar con https://). La vista
									previa se actualiza en tiempo real arriba.
								</p>
							)
						)}
					</div>

					{/* Nombres */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div className="space-y-1.5">
							<Label
								htmlFor="first_name"
								className="text-xs font-semibold uppercase tracking-wide">
								Nombre(s)
							</Label>
							<div className="relative">
								<Input
									id="first_name"
									type="text"
									placeholder="Tus nombres"
									disabled={!isEditing}
									{...register("first_name")}
									className={getInputClass(
										profileFieldState("first_name"),
										"h-11 rounded-xl bg-background/50 pr-8 disabled:opacity-60 disabled:cursor-not-allowed",
									)}
								/>
								<StatusIcon state={profileFieldState("first_name")} />
							</div>
							<FieldMsg
								state={profileFieldState("first_name")}
								error={errors.first_name?.message}
							/>
						</div>
						<div className="space-y-1.5">
							<Label
								htmlFor="last_name"
								className="text-xs font-semibold uppercase tracking-wide">
								Apellido(s)
							</Label>
							<div className="relative">
								<Input
									id="last_name"
									type="text"
									placeholder="Tus apellidos"
									disabled={!isEditing}
									{...register("last_name")}
									className={getInputClass(
										profileFieldState("last_name"),
										"h-11 rounded-xl bg-background/50 pr-8 disabled:opacity-60 disabled:cursor-not-allowed",
									)}
								/>
								<StatusIcon state={profileFieldState("last_name")} />
							</div>
							<FieldMsg
								state={profileFieldState("last_name")}
								error={errors.last_name?.message}
							/>
						</div>
					</div>

					{/* Teléfono */}
					<div className="space-y-1.5">
						<Label
							htmlFor="phone_number"
							className="text-xs font-semibold uppercase tracking-wide">
							Número de teléfono
						</Label>
						<div className="relative">
							<Input
								id="phone_number"
								type="tel"
								placeholder="+51 999 999 999"
								disabled={!isEditing}
								{...phoneRegister}
								onChange={(e) => {
									e.target.value = e.target.value.replace(
										/[^\d\s\-\+\(\)]/g,
										"",
									);
									onPhoneChange(e);
								}}
								className={getInputClass(
									profileFieldState("phone_number"),
									"h-11 rounded-xl bg-background/50 pr-8 disabled:opacity-60 disabled:cursor-not-allowed",
								)}
							/>
							<StatusIcon state={profileFieldState("phone_number")} />
						</div>
						<FieldMsg
							state={profileFieldState("phone_number")}
							error={errors.phone_number?.message}
						/>
					</div>

					{/* Profesión / Carrera */}
					<div className="space-y-1.5">
						<Label
							htmlFor="professional_career"
							className="text-xs font-semibold uppercase tracking-wide">
							Profesión o Carrera
						</Label>
						<div className="relative">
							<Input
								id="professional_career"
								type="text"
								placeholder="Ej. Ingeniería de Sistemas, Contabilidad..."
								disabled={!isEditing}
								{...register("professional_career")}
								className={getInputClass(
									profileFieldState("professional_career"),
									"h-11 rounded-xl bg-background/50 pr-8 disabled:opacity-60 disabled:cursor-not-allowed",
								)}
							/>
							<StatusIcon state={profileFieldState("professional_career")} />
						</div>
						<FieldMsg
							state={profileFieldState("professional_career")}
							error={errors.professional_career?.message}
						/>
					</div>

					{/* Biografía */}
					<div className="space-y-1.5">
						<Label
							htmlFor="bio"
							className="text-xs font-semibold uppercase tracking-wide">
							Biografía / Resumen profesional
						</Label>
						<Textarea
							id="bio"
							placeholder="Cuéntanos un poco sobre tu experiencia profesional..."
							disabled={!isEditing}
							{...register("bio")}
							className="min-h-35 rounded-2xl resize-y bg-background/50 focus:bg-background transition-colors p-4 disabled:opacity-60 disabled:cursor-not-allowed"
						/>
						{errors.bio && (
							<p className="text-xs text-destructive font-medium">
								{errors.bio.message}
							</p>
						)}
					</div>

					{/* Rol (solo lectura) */}
					<ReadOnlyField
						label="Rol"
						icon={<ShieldCheck className="w-3 h-3" />}
						value={
							user?.role_name ? (
								<span className="capitalize">{user.role_name}</span>
							) : undefined
						}
					/>

					<div className="pt-2 flex justify-end">
						<Button
							type="button"
							onClick={handleEditToggle}
							disabled={updateProfile.isPending}
							className="h-11 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
							{updateProfile.isPending ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Guardando...
								</>
							) : isEditing ? (
								<>
									<Save className="w-4 h-4 mr-2" />
									Guardar cambios
								</>
							) : (
								<>
									<Pencil className="w-4 h-4 mr-2" />
									Modificar
								</>
							)}
						</Button>
					</div>
				</form>
			</div>

			{/* ── Documento de identidad ───────────────────────────────────── */}
			<div className="bg-card border border-border shadow-md rounded-3xl p-6 lg:p-8 relative overflow-hidden">
				<div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

				<div className="flex items-center justify-between mb-2 relative z-10">
					<h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
						<IdCard className="w-3.5 h-3.5" />
						Documento de identidad
					</h2>
					{!hasDocument && !isEditingDoc && (
						<button
							type="button"
							onClick={() => setIsEditingDoc(true)}
							className="text-xs text-ring hover:underline transition-colors font-medium">
							Registrar documento
						</button>
					)}
					{!hasDocument && isEditingDoc && (
						<button
							type="button"
							onClick={() => setIsEditingDoc(false)}
							className="text-xs text-muted-foreground hover:text-foreground underline transition-colors">
							Cancelar
						</button>
					)}
				</div>
				<p className="text-xs text-muted-foreground mb-5 relative z-10">
					{hasDocument
						? "Tu documento de identidad está verificado y registrado en tu cuenta. Por razones de seguridad, contacta a soporte técnico si necesitas actualizarlo."
						: "Debes registrar tu documento para solicitar acceso al catálogo de cursos. Esta acción solo puede realizarse una vez."}
				</p>

				{hasDocument ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
						<ReadOnlyField
							label="Tipo de documento"
							icon={<IdCard className="w-3 h-3" />}
							value={
								DOC_LABELS[user?.document_type ?? ""] ?? user?.document_type
							}
						/>
						<ReadOnlyField
							label="Número de documento"
							icon={<IdCard className="w-3 h-3" />}
							value={user?.document_number}
							mono
						/>
					</div>
				) : isEditingDoc ? (
					<form
						onSubmit={handleSubmitDoc(onSubmitDocument)}
						className="space-y-5 relative z-10">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<div className="space-y-1.5">
								<Label
									htmlFor="doc_type"
									className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
									<IdCard className="w-3 h-3" />
									Tipo de documento
								</Label>
								<Select
									value={watchedDocType}
									onValueChange={(val) =>
										setDocValue(
											"document_type",
											val as DocumentFormValues["document_type"],
											{ shouldValidate: true },
										)
									}>
									<SelectTrigger
										id="doc_type"
										className="h-11 rounded-xl bg-background/50 focus:bg-background transition-colors">
										<SelectValue placeholder="Selecciona tipo" />
									</SelectTrigger>
									<SelectContent>
										{Object.entries(DOC_LABELS).map(([key, label]) => (
											<SelectItem key={key} value={key}>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{errorsDoc.document_type && (
									<p className="text-xs text-destructive font-medium">
										{errorsDoc.document_type.message}
									</p>
								)}
							</div>
							<div className="space-y-1.5">
								<Label
									htmlFor="doc_number"
									className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
									<IdCard className="w-3 h-3" />
									Número de documento
								</Label>
								<div className="relative">
									<Input
										id="doc_number"
										type="text"
										placeholder={
											DOC_RULES[watchedDocType]?.placeholder ??
											"Número de documento"
										}
										{...docRegister}
										onChange={(e) => {
											if (watchedDocType === "DNI" || watchedDocType === "CE" || watchedDocType === "RUC") {
												e.target.value = e.target.value.replace(/\D/g, "");
											} else if (watchedDocType === "PASAPORTE") {
												e.target.value = e.target.value
													.toUpperCase()
													.replace(/[^A-Z0-9]/g, "");
											}
											onDocChange(e);
										}}
										className={getInputClass(
											docFieldState("document_number"),
											"h-11 rounded-xl bg-background/50 font-mono pr-8",
										)}
									/>
									<StatusIcon state={docFieldState("document_number")} />
								</div>
								{docFieldState("document_number") === "error" ? (
									<FieldMsg
										state="error"
										error={errorsDoc.document_number?.message}
									/>
								) : (
									<p className="text-xs text-muted-foreground mt-1">
										{DOC_RULES[watchedDocType]?.hint}
									</p>
								)}
							</div>
						</div>
						<div className="pt-2 flex justify-end">
							<Button
								type="submit"
								disabled={updateDocument.isPending}
								className="h-11 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
								{updateDocument.isPending ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Guardando...
									</>
								) : (
									<>
										<Save className="w-4 h-4 mr-2" />
										Registrar documento
									</>
								)}
							</Button>
						</div>
					</form>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
						<ReadOnlyField
							label="Tipo de documento"
							icon={<IdCard className="w-3 h-3" />}
						/>
						<ReadOnlyField
							label="Número de documento"
							icon={<IdCard className="w-3 h-3" />}
							mono
						/>
					</div>
				)}
			</div>

			{/* ── Cambiar contraseña ────────────────────────────────────────── */}
			<div className="bg-card border border-border shadow-md rounded-3xl p-6 lg:p-8 relative overflow-hidden">
				<div className="absolute top-0 left-0 -ml-16 -mt-16 w-48 h-48 bg-destructive/5 rounded-full blur-[60px] pointer-events-none" />

				<div className="flex items-center gap-2 mb-1 relative z-10">
					<KeyRound className="w-4 h-4 text-muted-foreground" />
					<h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
						Cambiar contraseña
					</h2>
				</div>
				<p className="text-xs text-muted-foreground mb-6 relative z-10">
					Para proteger tu cuenta, debes ingresar tu contraseña actual antes de
					establecer una nueva.
				</p>

				<form
					onSubmit={handleSubmitPwd(onSubmitPassword)}
					className="space-y-5 relative z-10">
					{/* Contraseña actual */}
					<div className="space-y-1.5">
						<Label
							htmlFor="current_password"
							className="text-xs font-semibold uppercase tracking-wide">
							Contraseña actual
						</Label>
						<PasswordInput
							id="current_password"
							placeholder="Tu contraseña actual"
							className={getInputClass(pwdFieldState("current_password"), "")}
							{...regPwd("current_password")}
						/>
						<FieldMsg
							state={pwdFieldState("current_password")}
							error={errorsPwd.current_password?.message}
						/>
					</div>

					{/* Nueva contraseña */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div className="space-y-1.5">
							<Label
								htmlFor="new_password"
								className="text-xs font-semibold uppercase tracking-wide">
								Nueva contraseña
							</Label>
							<PasswordInput
								id="new_password"
								placeholder="Mín. 8 caracteres, mayúscula y número"
								className={getInputClass(pwdFieldState("new_password"), "")}
								{...regPwd("new_password")}
							/>
							{pwdFieldState("new_password") === "error" && (
								<FieldMsg
									state="error"
									error={errorsPwd.new_password?.message}
								/>
							)}
							{pwdFieldState("new_password") === "success" && (
								<p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
									<CheckCircle2 className="h-3 w-3 shrink-0" />
									Contraseña segura
								</p>
							)}
						</div>
						<div className="space-y-1.5">
							<Label
								htmlFor="confirm_password"
								className="text-xs font-semibold uppercase tracking-wide">
								Confirmar contraseña
							</Label>
							<PasswordInput
								id="confirm_password"
								placeholder="Repite la nueva contraseña"
								className={getInputClass(pwdFieldState("confirm_password"), "")}
								{...regPwd("confirm_password")}
							/>
							<FieldMsg
								state={pwdFieldState("confirm_password")}
								error={errorsPwd.confirm_password?.message}
							/>
						</div>
					</div>

					<div className="pt-2 flex justify-end">
						<Button
							type="submit"
							variant="destructive"
							disabled={changePassword.isPending}
							className="h-11 px-8 rounded-xl font-bold">
							{changePassword.isPending ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Actualizando...
								</>
							) : (
								<>
									<KeyRound className="w-4 h-4 mr-2" />
									Actualizar contraseña
								</>
							)}
						</Button>
					</div>
				</form>
			</div>

			{/* ── Cambiar correo ────────────────────────────────────────────── */}
			<EmailChangeCard user={user} />
		</div>
	);
}
