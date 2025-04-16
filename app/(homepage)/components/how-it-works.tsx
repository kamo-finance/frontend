import Image from "next/image";
import { motion } from "framer-motion";

import { fadeInLeft, fadeInRight, scaleIn } from "@/utils/animations";

const MotionDiv = motion.div as any;

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
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <MotionDiv
            className="text-center"
            initial="initial"
            variants={scaleIn}
            viewport={{ once: true, amount: 0.3 }}
            whileInView="animate"
          >
            <h2 className="text-4xl font-bold text-secondary mb-16">
              How Kamo Works
            </h2>
          </MotionDiv>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <MotionDiv
                key={index}
                className={`flex items-center gap-12 ${
                  index % 2 === 1 ? "flex-row-reverse" : ""
                }`}
                initial="initial"
                viewport={{ once: true, amount: 0.3 }}
                whileInView="animate"
              >
                <MotionDiv
                  className="w-1/2"
                  variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                >
                  <div className="relative aspect-square max-w-[400px] mx-auto">
                    <Image
                      fill
                      alt={step.title}
                      className="object-contain rounded-3xl"
                      src={step.image}
                    />
                  </div>
                </MotionDiv>

                <MotionDiv
                  className="w-1/2 space-y-4"
                  variants={index % 2 === 0 ? fadeInRight : fadeInLeft}
                >
                  <h3 className="text-2xl font-bold text-secondary">
                    {step.title}
                  </h3>
                  <p className="text-lg text-foreground">{step.description}</p>
                </MotionDiv>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
