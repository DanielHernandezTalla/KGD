"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/atoms/";
import { ICON } from "@/interface/types";

import { STYLES, ACTIVE_STYLES, INACTIVE_STYLES } from "./CompoSettings";

interface NextLinkProps {
    href: string;
    text: string;
    icon?: ICON;
}

export const NextLink = ({ href, text, icon }: NextLinkProps) => {
    const path = usePathname();
    return (
        <Link href={href}>
            <div
                className={`${STYLES} ${
                    `/${path.split("/")[1]}` === href
                        ? ACTIVE_STYLES
                        : INACTIVE_STYLES
                }`}
            >
                {icon && <Icon icon={icon} className="text-xl w-5" />}
                {text}
            </div>
        </Link>
    );
};
