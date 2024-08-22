import React from "react";
import { Icon } from "@/components/atoms/";
import { ICON } from "@/interface/types";
import Link from "next/link";

interface ButtonDataProps {
    icon: ICON;
    text: string;
    href: string;
}

export const ButtonData = ({ icon, text, href }: ButtonDataProps) => {
    return (
        <div className="rounded-xl border-2 border-gray-100 bg-white transition-all hover:shadow-sm sm:hover:-translate-y-2">
            <Link href={href}>
                <div className="flex items-center p-2 pr-0">
                    <div className="grid h-[85px] w-[85px] place-items-center rounded-lg bg-blue-100 p-6">
                        <Icon className="text-4xl text-blue-800" icon={icon} />
                    </div>
                    <span className="m-auto truncate text-xl font-medium text-gray-500">
                        {text}
                    </span>
                </div>
            </Link>
        </div>
    );
};
