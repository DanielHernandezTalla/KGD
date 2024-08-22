"use client";
import { useState } from "react";
import { Button, Logo, User } from "@/components/atoms";
import { Nav } from "@/components/molecules";
import { useSession } from "next-auth/react";
import Link from "next/link";

const NavBar: React.FC = () => {
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <>
            <div className="absolute top-0 z-40 col-span-2 flex w-full items-center justify-between border-b-2 border-slate-200 bg-white px-5 md:hidden">
                <div className="-translate-x-3 pt-2.5 pb-1.5 pl-0">
                    <Link href="/">
                        <Logo width={104} heigth={45} />
                    </Link>
                </div>
                <Button
                    onClick={() => setIsNavBarOpen(!isNavBarOpen)}
                    icon="menu"
                    size="small"
                    variant="primary"
                    align="center"
                />
            </div>
            <div
                className={`z-10 flex h-screen min-w-[235px] flex-col items-center gap-5 border-r-2 border-slate-200 bg-white p-3 pt-[88px] md:pt-3 ${
                    isNavBarOpen ? "" : "-translate-x-full"
                } absolute overflow-auto transition-transform md:static md:translate-x-0`}
            >
                <div className="mt-3 hidden md:flex">
                    <Logo width={128} heigth={79} />
                </div>
                <Nav />
                {/* <User user={session?.user} /> */}
            </div>
        </>
    );
};

export default NavBar;
