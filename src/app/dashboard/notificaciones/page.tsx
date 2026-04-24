"use client";

import {
	Bell,
	BookOpen,
	Award,
	Megaphone,
	Clock,
	Shield,
	CheckCheck,
	Trash2,
} from "lucide-react";
import type { NotificationType, UserNotificationResponse } from "@/types";
import {
	useInbox,
	useUnreadCount,
	useMarkAllRead,
	useMarkRead,
	useDeleteNotification,
} from "@/features/notifications/hooks/useNotifications";
import { useUser } from "@/features/auth/hooks/useAuth";
import { InactiveAccountBanner } from "@/components/ui/InactiveAccountBanner";

// ── Icon + color map by backend NotificationType ──────────────────────────────
const TYPE_CONFIG: Record<
	NotificationType,
	{ icon: React.ElementType; color: string; bg: string }
> = {
	SYSTEM: { icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
	COURSE_UPDATE: { icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
	ACHIEVEMENT: {
		icon: Award,
		color: "text-yellow-500",
		bg: "bg-yellow-500/10",
	},
	PROMOTION: {
		icon: Megaphone,
		color: "text-purple-500",
		bg: "bg-purple-500/10",
	},
	REMINDER: { icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
};

function timeAgo(dateStr: string) {
	const diff = Date.now() - new Date(dateStr).getTime();
	const mins = Math.floor(diff / 60000);
	if (mins < 1) return "ahora";
	if (mins < 60) return `hace ${mins} min`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `hace ${hours} h`;
	const days = Math.floor(hours / 24);
	return `hace ${days} día${days !== 1 ? "s" : ""}`;
}

function NotificationRow({
	notification,
}: {
	notification: UserNotificationResponse;
}) {
	const cfg = TYPE_CONFIG[notification.type] ?? TYPE_CONFIG.SYSTEM;
	const Icon = cfg.icon;
	const markRead = useMarkRead();
	const deleteNotif = useDeleteNotification();

	return (
		<div
			className={[
				"flex items-start gap-4 p-4 rounded-2xl border transition-all group",
				notification.is_read
					? "bg-card border-border"
					: "bg-primary/5 border-primary/15",
			].join(" ")}>
			{/* Icon */}
			<div
				className={`w-10 h-10 rounded-xl ${cfg.bg} shrink-0 flex items-center justify-center mt-0.5`}>
				<Icon className={`w-5 h-5 ${cfg.color}`} />
			</div>

			{/* Content */}
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-3">
					<p className="text-sm font-bold leading-snug text-foreground">
						{notification.title}
						{!notification.is_read && (
							<span className="ml-2 inline-block w-2 h-2 rounded-full bg-primary align-middle" />
						)}
					</p>
					<span className="text-xs text-muted-foreground shrink-0">
						{timeAgo(notification.created_at)}
					</span>
				</div>
				<p className="text-sm text-muted-foreground mt-1 leading-relaxed">
					{notification.message}
				</p>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
				{!notification.is_read && (
					<button
						onClick={() => markRead.mutate(notification)}
						disabled={markRead.isPending}
						title="Marcar como leída"
						className="p-1.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50">
						<CheckCheck className="w-4 h-4" />
					</button>
				)}
				<button
					onClick={() => deleteNotif.mutate(notification)}
					disabled={deleteNotif.isPending}
					title="Eliminar"
					className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-colors disabled:opacity-50">
					<Trash2 className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}

export default function NotificacionesPage() {
	const { data: user } = useUser();
	const { data: inbox, isLoading } = useInbox({ limit: 50 });
	const { data: countData } = useUnreadCount();
	const markAllRead = useMarkAllRead();

	const unread = countData?.unread_count ?? 0;
	const notifications = inbox ?? [];

	// Inactive account — API returns 403 on all inbox endpoints
	if (user && !user.is_active) {
		return (
			<div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
				<div>
					<h1 className="text-2xl font-black text-foreground">Notificaciones</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Activa tu cuenta para recibir notificaciones.
					</p>
				</div>
				<InactiveAccountBanner />
			</div>
		);
	}

	return (
		<div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-black text-foreground">
						Notificaciones
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						{unread > 0
							? `Tienes ${unread} notificación${unread !== 1 ? "es" : ""} sin leer.`
							: "Estás al día con todas tus notificaciones."}
					</p>
				</div>
				{unread > 0 && (
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/15">
							<Bell className="w-4 h-4 text-primary" />
							<span className="text-sm font-bold text-primary">{unread}</span>
						</div>
						<button
							onClick={() => markAllRead.mutate()}
							disabled={markAllRead.isPending}
							className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-xl hover:bg-secondary border border-border disabled:opacity-50">
							<CheckCheck className="w-3.5 h-3.5" />
							Marcar todas como leídas
						</button>
					</div>
				)}
			</div>

			{/* Notification list */}
			{isLoading ? (
				<div className="space-y-3">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card">
							<div className="w-10 h-10 rounded-xl bg-muted animate-pulse shrink-0" />
							<div className="flex-1 space-y-2">
								<div className="h-4 bg-muted animate-pulse rounded w-1/2" />
								<div className="h-3 bg-muted animate-pulse rounded w-full" />
								<div className="h-3 bg-muted animate-pulse rounded w-3/4" />
							</div>
						</div>
					))}
				</div>
			) : notifications.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-border">
					<Bell className="w-12 h-12 text-muted-foreground/30 mb-4" />
					<p className="text-lg font-bold text-muted-foreground">
						Sin notificaciones
					</p>
					<p className="text-sm text-muted-foreground/70 mt-1">
						Te avisaremos cuando haya novedades.
					</p>
				</div>
			) : (
				<div className="space-y-3">
					{notifications.map((notif) => (
						<NotificationRow key={notif.id} notification={notif} />
					))}
				</div>
			)}
		</div>
	);
}
