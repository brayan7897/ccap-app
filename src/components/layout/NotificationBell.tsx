"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	Bell,
	CheckCheck,
	BookOpen,
	Award,
	Megaphone,
	Clock,
	Shield,
	X,
	ArrowRight,
} from "lucide-react";
import {
	useUnreadCount,
	useInbox,
	useMarkAllRead,
	useMarkRead,
} from "@/features/notifications/hooks/useNotifications";
import { useUser } from "@/features/auth/hooks/useAuth";
import type { NotificationType, UserNotificationResponse } from "@/types";

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

function NotificationItem({
	notif,
	onMarkRead,
	onClose,
}: {
	notif: UserNotificationResponse;
	onMarkRead: (notif: UserNotificationResponse) => void;
	onClose: () => void;
}) {
	const cfg = TYPE_CONFIG[notif.type] ?? TYPE_CONFIG.SYSTEM;
	const Icon = cfg.icon;

	const handleClick = () => {
		if (!notif.is_read) onMarkRead(notif);
		onClose();
	};

	const content = (
		<div
			className={[
				"flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer",
				!notif.is_read ? "bg-primary/5" : "",
			].join(" ")}
			onClick={handleClick}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => e.key === "Enter" && handleClick()}>
			<div
				className={`w-8 h-8 rounded-lg ${cfg.bg} shrink-0 flex items-center justify-center mt-0.5`}>
				<Icon className={`w-4 h-4 ${cfg.color}`} />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<p className="text-sm font-semibold text-foreground leading-snug line-clamp-1">
						{notif.title}
						{!notif.is_read && (
							<span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary align-middle" />
						)}
					</p>
					<span className="text-[11px] text-muted-foreground shrink-0 mt-0.5">
						{timeAgo(notif.created_at)}
					</span>
				</div>
				<p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
					{notif.message}
				</p>
			</div>
		</div>
	);

	if (notif.action_url) {
		return (
			<Link href={notif.action_url} onClick={handleClick} tabIndex={-1}>
				{content}
			</Link>
		);
	}
	return content;
}

export function NotificationBell() {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const { data: user } = useUser();

	// Data hooks (queries are already disabled when user is inactive)
	const { data: countData, refetch: refetchCount } = useUnreadCount();
	const {
		data: inbox,
		isLoading,
		refetch: refetchInbox,
	} = useInbox({ limit: 5 });
	const markAllRead = useMarkAllRead();
	const markRead = useMarkRead();

	// Don't render the bell at all for inactive accounts
	if (user && !user.is_active) return null;

	const unread = countData?.unread_count ?? 0;
	const notifications = inbox ?? [];

	// Refetch fresh data every time the panel is opened
	useEffect(() => {
		if (open) {
			refetchCount();
			refetchInbox();
		}
	}, [open, refetchCount, refetchInbox]);

	// Close on outside click
	useEffect(() => {
		function handler(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		if (open) document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);

	const handleMarkRead = useCallback(
		(notif: UserNotificationResponse) => markRead.mutate(notif),
		[markRead],
	);

	const handleSeeAll = () => {
		setOpen(false);
		router.push("/dashboard/notificaciones");
	};

	return (
		<div ref={ref} className="relative">
			{/* Bell button */}
			<button
				onClick={() => setOpen((v) => !v)}
				aria-label="Notificaciones"
				className="relative p-2.5 text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-colors border border-transparent hover:border-border">
				<Bell className="w-5 h-5" />
				{unread > 0 && (
					<span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground leading-none px-0.5">
						{unread > 99 ? "99+" : unread}
					</span>
				)}
			</button>

			{/* Dropdown panel */}
			{open && (
				<div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-border bg-background shadow-xl shadow-black/10 z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
					{/* Header */}
					<div className="flex items-center justify-between px-4 py-3 border-b border-border">
						<div className="flex items-center gap-2">
							<Bell className="w-4 h-4 text-foreground" />
							<span className="text-sm font-bold text-foreground">
								Notificaciones
							</span>
							{unread > 0 && (
								<span className="inline-flex items-center justify-center h-5 min-w-5 rounded-full bg-primary/10 text-[11px] font-bold text-primary px-1">
									{unread}
								</span>
							)}
						</div>
						<div className="flex items-center gap-1">
							{unread > 0 && (
								<button
									onClick={() => markAllRead.mutate()}
									disabled={markAllRead.isPending}
									title="Marcar todas como leídas"
									className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors disabled:opacity-50">
									<CheckCheck className="w-4 h-4" />
								</button>
							)}
							<button
								onClick={() => setOpen(false)}
								className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Notification list */}
					<div className="max-h-80 overflow-y-auto divide-y divide-border/50">
						{isLoading ? (
							<div className="space-y-1 p-2">
								{[1, 2, 3].map((i) => (
									<div key={i} className="flex items-start gap-3 px-2 py-3">
										<div className="w-8 h-8 rounded-lg bg-muted animate-pulse shrink-0" />
										<div className="flex-1 space-y-1.5">
											<div className="h-3 bg-muted animate-pulse rounded w-3/4" />
											<div className="h-3 bg-muted animate-pulse rounded w-full" />
										</div>
									</div>
								))}
							</div>
						) : notifications.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-12 text-center px-4">
								<Bell className="w-8 h-8 text-muted-foreground/30 mb-3" />
								<p className="text-sm font-semibold text-muted-foreground">
									Sin notificaciones
								</p>
								<p className="text-xs text-muted-foreground/70 mt-1">
									Te avisaremos cuando haya novedades.
								</p>
							</div>
						) : (
							notifications.map((notif) => (
								<NotificationItem
									key={notif.id}
									notif={notif}
									onMarkRead={handleMarkRead}
									onClose={() => setOpen(false)}
								/>
							))
						)}
					</div>

					{/* Footer — Ver más */}
					{notifications.length > 0 && (
						<div className="border-t border-border">
							<button
								onClick={handleSeeAll}
								className="flex items-center justify-center gap-1.5 w-full py-3 text-sm font-semibold text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors">
								Ver todas las notificaciones
								<ArrowRight className="w-3.5 h-3.5" />
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
