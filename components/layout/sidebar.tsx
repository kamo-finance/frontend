"use client";

import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import { LayoutDashboardIcon, StoreIcon } from "lucide-react";
import { Button } from "@heroui/button";

import { Favicon } from "../brands/Favicon";

import { routes } from "@/config/routes";

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
          isIconOnly
          as={Link}
          href={routes.app.dashboard}
          radius="full"
          variant={isDashboardPage ? "solid" : "light"}
        >
          <LayoutDashboardIcon
            className={
              isDashboardPage ? "text-foreground-100" : "text-foreground-700"
            }
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          href={routes.app.markets}
          radius="full"
          variant={isMarketsPage ? "solid" : "light"}
        >
          <StoreIcon
            className={
              isMarketsPage ? "text-foreground-100" : "text-foreground-700"
            }
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          href={routes.app.veKAMO}
          radius="full"
          variant={isVeKAMOPage ? "solid" : "light"}
        >
          <Favicon height={24} width={24} />
        </Button>
      </div>
    </div>
  );
};
