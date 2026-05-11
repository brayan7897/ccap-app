"use client";

import { LogOut, UserIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useUser, useLogout } from "../hooks/useAuth";
import { HeaderUserAvatar } from "@/components/layout/HeaderUserAvatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
	const { data: user } = useUser();
	const logout = useLogout();

	if (!user) return null;

	const fullName = user.full_name || `${user.first_name} ${user.last_name}`;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-secondary transition-colors border border-transparent hover:border-border focus:outline-none"
					aria-label="Menú de usuario">
					<HeaderUserAvatar
						avatarUrl={user.avatar_url}
						firstName={user.first_name}
						lastName={user.last_name}
					/>
					<span className="hidden lg:block text-sm font-semibold text-foreground max-w-[8rem] truncate">
						{user.first_name}
					</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="flex flex-col gap-0.5">
					<span className="font-semibold text-foreground truncate">
						{fullName}
					</span>
					<span className="text-xs font-normal text-muted-foreground truncate">
						{user.email}
					</span>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href="/dashboard" className="cursor-pointer">
						<LayoutDashboard className="mr-2 h-4 w-4" />
						Mi panel
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild>
					<Link href="/dashboard/perfil" className="cursor-pointer">
						<UserIcon className="mr-2 h-4 w-4" />
						Mi perfil
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={() => void logout()}
					className="text-destructive focus:text-destructive cursor-pointer">
					<LogOut className="mr-2 h-4 w-4" />
					Cerrar sesión
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
