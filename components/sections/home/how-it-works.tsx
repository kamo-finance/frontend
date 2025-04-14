import Image from "next/image";

const steps = [
  {
    title: "Yield Tokenization",
    description:
      "Transform any yield-bearing asset by separating its yield and principal components, providing enhanced control.",
    image: "/images/tokenization.PNG",
  },
  {
    title: "Kamo AMM",
    description:
      "A specialized AMM optimized for yield trading, featuring concentrated liquidity, a dual fee structure, and minimal impermanent loss risks.",
    image: "/images/amm.PNG",
  },
  {
    title: "veKAMO",
    description:
      "Lock $KAMO to gain a stake in the protocol and earn various benefits",
    image: "/images/veKAMO.PNG",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
          How Kamo Works
        </h2>
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-12 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
            >
              <div className="w-1/2">
                <div className="relative aspect-square max-w-[400px] mx-auto">
                  <Image
                    fill
                    alt={step.title}
                    className="object-contain"
                    src={step.image}
                  />
                </div>
              </div>
              <div className="w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-blue-900">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
