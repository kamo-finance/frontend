declare module "@heroui/button" {
  import { FC, ReactNode } from "react";

  interface ButtonProps {
    as?: any;
    href?: string;
    color?: "primary" | "secondary" | "success" | "warning" | "danger";
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
    className?: string;
  }

  export const Button: FC<ButtonProps>;
}

declare module "@heroui/link" {
  import { FC, ReactNode } from "react";

  interface LinkProps {
    href?: string;
    isExternal?: boolean;
    children: ReactNode;
    className?: string;
  }

  export const Link: FC<LinkProps>;
}

declare module "@heroui/accordion" {
  import { FC, ReactNode } from "react";

  interface AccordionProps {
    variant?: "bordered" | "light" | "shadow";
    className?: string;
    children: ReactNode;
  }

  interface AccordionItemProps {
    title: string;
    className?: string;
    children: ReactNode;
  }

  export const Accordion: FC<AccordionProps>;
  export const AccordionItem: FC<AccordionItemProps>;
}

declare module "@heroui/snippet" {
  import { FC, ReactNode } from "react";

  interface SnippetProps {
    children: ReactNode;
    className?: string;
    hideCopyButton?: boolean;
    hideSymbol?: boolean;
    variant?: "bordered" | "flat";
  }

  export const Snippet: FC<SnippetProps>;
}

declare module "@heroui/code" {
  import { FC, ReactNode } from "react";

  interface CodeProps {
    children: ReactNode;
    color?: "primary" | "secondary" | "success" | "warning" | "danger";
  }

  export const Code: FC<CodeProps>;
}

declare module "@heroui/theme" {
  export const button: (...args: any[]) => string;
}
