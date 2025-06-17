"use client";

import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import { LayoutDashboardIcon, StoreIcon } from "lucide-react";
import { Button, Tooltip } from "@heroui/react";

import { Favicon } from "../brands/Favicon";

import { routes } from "@/config/routes";

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ReactNode;
  currentPath: string;
}

const NavItem = ({ path, label, icon, currentPath }: NavItemProps) => {
  const isActive = currentPath === path;

  return (
    <Tooltip content={label} placement="left">
      <Button
        isIconOnly
        as={Link}
        href={path}
        radius="full"
        variant={isActive ? "solid" : "light"}
      >
        <div
          className={isActive ? "text-foreground-100" : "text-foreground-700"}
        >
          {icon}
        </div>
      </Button>
    </Tooltip>
  );
};

export const Sidebar = () => {
  const currentPath = usePathname();

  if (currentPath === routes.home) {
    return null;
  }

  const navItems = [
    {
      path: routes.app.dashboard,
      label: "Dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      path: routes.app.markets,
      label: "Markets",
      icon: <StoreIcon />,
    },
    {
      path: routes.app.veKAMO,
      label: "veKAMO",
      icon: <Favicon height={24} width={24} />,
    },
  ];

  return (
    <div className="fixed md:top-1/2 md:left-4 md:-translate-y-1/2 max-md:bottom-4 max-md:left-1/2 max-md:-translate-x-1/2 md:w-16 h-auto z-50">
      <div className="w-fit gap-1 p-2 flex flex-row md:flex-col rounded-full border-3 bg-foreground-100 shadow-2xl shadow-default-300 border-default items-center">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            currentPath={currentPath}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
};
