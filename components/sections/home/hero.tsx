import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative bg-blue-50 min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-green-600">Kamo</span>{" "}
            <span className="text-yellow-400">Finance</span>
          </h1>
          <div className="space-y-2 mb-8">
            <p className="text-2xl text-blue-900 font-semibold">Unlock Liquidity</p>
            <p className="text-2xl text-blue-900 font-semibold">Maximize Returns</p>
          </div>
          <Button
            as={Link}
            href="/market"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg text-lg"
          >
            LAUNCH APP
          </Button>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/images/hero.PNG"
            alt="Kamo Hero"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}; 