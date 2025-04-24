import { Link } from "@heroui/link";

import { Favicon } from "../brands/Favicon";

import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const NavItem = ({
  href,
  children,
  className = "",
  external,
}: NavItemProps) => {
  const externalProps = external
    ? {
        rel: "noopener noreferrer",
        target: "_blank",
        as: "a",
      }
    : {};

  return (
    <Link className={className} href={href} {...(externalProps as any)}>
      {children}
    </Link>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavItem className="flex items-center gap-2" href={routes.home}>
            <Favicon />
            <h2 className="font-semibold text-base text-primary-foreground">
              {siteConfig.name}
            </h2>
          </NavItem>
        </div>
      </div>
    </footer>
  );
};
