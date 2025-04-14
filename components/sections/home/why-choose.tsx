import Image from "next/image";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

const benefits = [
  "Maximize your profits",
  "Earn up to 10% APY through our staking strategy",
  "The first yield market on $SUI",
  "Developer first ecosystem",
  "TypeScript SDK",
  "Open-source smart contract interface",
];

export const WhyChoose = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
          Why Choose Kamo
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              {benefits.slice(0, 3).map((benefit, index) => (
                <p key={index} className="text-lg text-blue-900">
                  {benefit}
                </p>
              ))}
            </div>
            <div className="space-y-4 text-gray-600">
              {benefits.slice(3).map((benefit, index) => (
                <p key={index} className="text-lg">
                  {benefit}
                </p>
              ))}
            </div>
            <Button
              as={Link}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg text-lg mt-8 inline-block"
              href="/market"
            >
              LAUNCH APP
            </Button>
          </div>
          <div className="relative h-[400px]">
            <Image
              fill
              priority
              alt="Why Choose Kamo"
              className="object-contain"
              src="/images/hero.PNG"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
