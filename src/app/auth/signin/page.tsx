"use client";
import { Logo } from "@/components/atoms/Logo";
import Image from "next/image";
import { signIn } from "next-auth/react";
import logoGoogle from "@/images/logogoogle.png";

export default function SignIn() {
    return (
        <>
            <div className="flex min-h-screen">
                <div className="flex h-screen w-full flex-col justify-between lg:w-1/2">
                    <div className="p-4">
                        <Logo width={104} heigth={53} />
                    </div>

                    <div className="flex flex-col items-center gap-10 px-3 sm:mb-10">
                        <div className="text-center">
                            <h1 className="font-regular text-5xl sm:text-6xl">
                                Iniciar sesión
                            </h1>
                            <p className="mt-3 text-gray-400">
                                Bienvenido al sistema de CIMA
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                signIn("google", {
                                    callbackUrl: "/",
                                })
                            }
                            className="flex items-center gap-8 rounded-xl border-2 border-gray-200 px-8 py-3 transition-transform hover:-translate-y-1 sm:px-10 sm:py-4"
                        >
                            <Image
                                src={logoGoogle}
                                alt="Logo Google"
                                width={50}
                                height={51}
                                priority={true}
                                className="w-auto h-auto"
                            />
                            <p className="sm:text-1xl text-xl font-semibold text-gray-400">
                                Ingresa con Google
                            </p>
                        </button>
                    </div>

                    <footer className="flex h-20 items-center justify-center border-t-2 border-gray-200">
                        <p>© CIMA {new Date().getFullYear()}</p>
                    </footer>
                </div>

                <div className="bg-login h-screen lg:w-1/2"></div>
            </div>
        </>
    );
}

// SignIn.auth = false;
