'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-50 h-16 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/kamo-logo.PNG"
            alt="Kamo Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {/* Show navigation links on all pages except home */}
          {!isHomePage && (
            <>
              <Link 
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/dashboard' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/market"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/market' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Markets
              </Link>
              <Link 
                href="/veKAMO"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/veKAMO' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                veKamo
              </Link>
            </>
          )}

          {/* Show Docs link on all pages */}
          <Link 
            href="/docs"
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Docs
          </Link>

          {/* Social Links */}
          <a 
            href="https://twitter.com/KamoFinance" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/x-logo.jpg"
              alt="Twitter"
              width={24}
              height={24}
              className="object-contain"
            />
          </a>

          {/* Dashboard button for non-dashboard pages */}
          {!isHomePage && pathname !== '/dashboard' && (
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Go to Dashboard
            </Link>
          )}

          {/* Launch App button only on home page */}
          {isHomePage ? (
            <Link
              href="/dashboard"
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              LAUNCH APP
            </Link>
          ) : (
            <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Disconnect Wallet
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}; 