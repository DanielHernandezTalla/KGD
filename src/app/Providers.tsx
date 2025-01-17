"use client";
import { ToastProvider } from "@/hooks/toast";
import { AuthProvider } from "@/hooks/AuthContext";
import { SessionProvider } from "next-auth/react";
import { PermisosProvider } from "@/hooks/PermisosContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            <SessionProvider>
                <AuthProvider>
                    <PermisosProvider>
                        {children}
                    </PermisosProvider>
                </AuthProvider>
            </SessionProvider>
        </ToastProvider>
    );
}
