"use client";

import { Link } from "@heroui/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";

import { routes } from "@/config/routes";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { Logo } from "../brands/Logo";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { LayoutDashboardIcon, StoreIcon } from "lucide-react";
import { Favicon } from "../brands/Favicon";
import { Button } from "@heroui/button";

export const Sidebar = () => {
    const isHomePage = usePathname() === routes.home;
    const isDashboardPage = usePathname() === routes.app.dashboard;
    const isMarketsPage = usePathname() === routes.app.markets;
    const isVeKAMOPage = usePathname() === routes.app.veKAMO;

    if (isHomePage) {
        return null;
    }

    return (
        <div className="fixed top-1/2 left-0 mx-4 transform -translate-y-1/2 w-16 h-auto">
            <div className="w-fit gap-1 p-2 flex flex-col rounded-full border-3 bg-foreground-100 shadow-2xl shadow-default-300 border-default items-center">
                <Button
                    as={Link}
                    radius="full"
                    href={routes.app.dashboard}
                    isIconOnly
                    variant={isDashboardPage ? "solid" : "light"}
                >
                    <LayoutDashboardIcon
                        className={
                            isDashboardPage ? "text-foreground-100" : "text-foreground-700"
                        }
                    />
                </Button>
                <Button
                    as={Link}
                    radius="full"
                    href={routes.app.markets}
                    variant={isMarketsPage ? "solid" : "light"}
                    isIconOnly
                >
                    <StoreIcon
                        className={
                            isMarketsPage ? "text-foreground-100" : "text-foreground-700"
                        }
                    />
                </Button>
                <Button
                    as={Link}
                    radius="full"
                    href={routes.app.veKAMO}
                    variant={isVeKAMOPage ? "solid" : "light"}
                    isIconOnly
                >
                    <Favicon
                        width={24}
                        height={24}
                    />
                </Button>
            </div>
        </div>
    );
};
