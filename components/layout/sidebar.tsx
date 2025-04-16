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
        <div className={isActive ? "text-foreground-100" : "text-foreground-700"}>
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
      icon: <LayoutDashboardIcon />
    },
    {
      path: routes.app.markets,
      label: "Markets",
      icon: <StoreIcon />
    },
    {
      path: routes.app.veKAMO,
      label: "veKAMO",
      icon: <Favicon height={24} width={24} />
    }
  ];

  return (
    <div className="fixed top-1/2 left-0 mx-4 transform -translate-y-1/2 w-16 h-auto">
      <div className="w-fit gap-1 p-2 flex flex-col rounded-full border-3 bg-foreground-100 shadow-2xl shadow-default-300 border-default items-center">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
            currentPath={currentPath}
          />
        ))}
      </div>
    </div>
  );
};