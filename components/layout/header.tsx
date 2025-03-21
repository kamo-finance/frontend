import { Link } from "@heroui/link";
import Image from "next/image";
import { routes } from "@/config/routes";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={routes.home} className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/images/kamo-logo.PNG"
                alt="Kamo Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link href={routes.docs} className="text-green-600 font-medium hover:text-green-700 transition-colors">
              Docs
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <a
              href={routes.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="relative w-6 h-6">
                <Image
                  src="/images/x-logo.jpg"
                  alt="X (Twitter)"
                  fill
                  className="object-contain"
                />
              </div>
            </a>
            <Link
              href={routes.app.market}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              LAUNCH APP
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}; 