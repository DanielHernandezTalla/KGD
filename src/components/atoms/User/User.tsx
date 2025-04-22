"use client";
import Image from "next/image";
import { Button } from "@/components/atoms";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { SelectAlmacen } from "../SelectAlmacen";

const User = ({ user }: any) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <div className={`flex w-full flex-col items-center p-2 pb-0 pr-4 `}>
            <div
                className={`flex flex-col items-center gap-1 transition-transform ${
                    isUserMenuOpen ? "-translate-y-[162px]" : "translate-y-0"
                }`}
            >
                <div className={`flex min-w-[44px] items-center `}>
                    {user?.image && (
                        <div>
                            <Image
                                src={user?.image}
                                alt="user"
                                width={44}
                                height={44}
                                priority={true}
                                className="h-12 w-12 rounded-full"
                            />
                        </div>
                    )}
                </div>
                <p
                    className="max-w-[200px] overflow-hidden truncate text-sm font-bold text-slate-800"
                    title={user?.name || "Usuario"}
                >
                    {user?.name || "Usuario"}
                </p>
                <p
                    className="max-w-[200px] overflow-hidden truncate text-xs text-slate-600"
                    title={user?.email || "Correo"}
                >
                    {user?.email || "Correo"}
                </p>
            </div>

            <div className="relative">
                {isUserMenuOpen && (
                    <div className="absolute px-2 bottom-12 left-1/2 -translate-x-2/4 rounded-xl border-2 border-slate-100 bg-white p-1">
                        <SelectAlmacen />
                        
                        <Button
                            onClick={async () => {
                                await signOut({callbackUrl: '/auth/signin'});
                            }}
                            variant="secondary"
                            size="medium"
                            text="Cerrar sesión"
                            icon="logout"
                            className="truncate"
                        />
                    </div>
                )}
                <Button
                    icon="settings"
                    variant="outline"
                    size="small"
                    className="mt-3"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
            </div>
        </div>
    );
};

export default User;
