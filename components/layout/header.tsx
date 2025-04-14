"use client";

import { Link } from "@heroui/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { routes } from "@/config/routes";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";

export const Header = () => {
  const isHomePage = usePathname() === routes.home;

  return (
    <header className="fixed top-0 w-full z-50 bg-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link className="flex items-center gap-2" href={routes.home}>
            <div className="relative w-8 h-8">
              <Image
                fill
                alt="Kamo Logo"
                className="object-contain"
                src="/images/kamo-logo.PNG"
              />
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              className="text-green-600 font-medium hover:text-green-700 transition-colors"
              href={routes.docs}
            >
              Docs
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <a
              className="flex items-center hover:opacity-80 transition-opacity"
              href={routes.social.twitter}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="relative w-6 h-6">
                <Image
                  fill
                  alt="X (Twitter)"
                  className="object-contain"
                  src="/images/x-logo.jpg"
                />
              </div>
            </a>
            {isHomePage && (
              <Link
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                href={routes.app.markets}
              >
                LAUNCH APP
              </Link>
            )}
            {/* Button redirect to dashboard, markets, veKAMO, etc */}
            {!isHomePage && (
              <div className="flex items-center gap-2">
                <Link
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  href={routes.app.dashboard}
                >
                  Dashboard
                </Link>
                <Link
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  href={routes.app.markets}
                >
                  Markets
                </Link>
                <Link
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  href={routes.app.veKAMO}
                >
                  veKAMO
                </Link>
              </div>
            )}
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};
