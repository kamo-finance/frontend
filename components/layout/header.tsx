"use client";

import { Link } from "@heroui/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";

import { routes } from "@/config/routes";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { Logo } from "../brands/Logo";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";

export const Header = () => {
  const isHomePage = usePathname() === routes.home;

  return (
    <Navbar maxWidth="full" className="fixed top-0 w-full z-50 px-16">
      <NavbarBrand>
        <Link className="flex items-center gap-2" href={routes.home}>
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              href={routes.docs}
            >
              Docs
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <Link
              href={routes.social.twitter}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaXTwitter className="text-black" />
            </Link>
          </div>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <ConnectWalletButton />
      </NavbarContent>
    </Navbar>
  );
};
