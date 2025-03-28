"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { constants, network } from "@/utils";
import { SuiClientProvider } from "@mysten/dapp-kit";
import { ToastProvider } from "@heroui/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={network.networkConfig} defaultNetwork={constants.sui.DEFAULT_NETWORK}>
        <HeroUIProvider navigate={router.push}>
          <NextThemesProvider forcedTheme="light" {...themeProps}>
            <ToastProvider />
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
