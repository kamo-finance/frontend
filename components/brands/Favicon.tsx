
import { ImageProps } from "@heroui/react";
import Image from "next/image";

interface FaviconProps extends ImageProps {
    size?: number;
}
export const Favicon: React.FC<FaviconProps> = ({
    size = 20,
}: FaviconProps) => (
    <Image
        alt="favicon"
        src="/Favicon.svg"
        width={size}
        height={size}
        className="object-contain"
    />
);