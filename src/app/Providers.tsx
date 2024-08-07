"use client";
import { ToastProvider } from "@/hooks/toast";
import { AuthProvider } from "@/hooks/AuthContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            <SessionProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </SessionProvider>
        </ToastProvider>
    );
}
