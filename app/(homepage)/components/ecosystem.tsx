import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const MotionSection = motion.section as any;
const MotionHeading = motion.h2 as any;
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface EcosystemPartner {
  name: string;
  logo: string;
  description: string;
}

interface FeatureProps {
  emoji: string;
  title: string;
  description: string;
  rotationDirection?: number;
  animationDirection?: "left" | "right";
}

const Feature = ({
  emoji,
  title,
  description,
  rotationDirection = 5,
  animationDirection = "left",
}: FeatureProps) => {
  const xInitial = animationDirection === "left" ? -50 : 50;

  return (
    <MotionDiv
      className="text-center md:text-left"
      initial={{ opacity: 0, x: xInitial }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <MotionDiv
        className="inline-block p-3"
        whileHover={{ scale: 1.1, rotate: rotationDirection }}
      >
        <span className="text-2xl">{emoji}</span>
      </MotionDiv>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </MotionDiv>
  );
};

const CarouselButton = ({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: "prev" | "next";
}) => (
  <MotionButton
    className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-green-600 flex items-center justify-center text-white"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        d={direction === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  </MotionButton>
);

export const Ecosystem = () => {
  const ecosystem: EcosystemPartner[] = [
    {
      name: "Kamo",
      logo: "/favicon.ico",
      description: "Kamo is a yield farming platform on Sui.",
    },
    {
      name: "Haedal",
      logo: "/images/haedal-logo.jpg",
      description: "Haedal is a yield farming platform on Sui.",
    },
    {
      name: "Sui",
      logo: "/images/sui-logo.PNG",
      description: "Sui is a blockchain platform.",
    },
    {
      name: "Mysten Labs",
      logo: "/images/mysten.png",
      description: "Mysten Labs is the company behind Sui.",
    },
    {
      name: "Cetus",
      logo: "/images/cetus.png",
      description: "Cetus is leading DEX on Sui.",
    },
  ];

  const features: FeatureProps[] = [
    {
      emoji: "🎯",
      title: "STABLE RETURNS MADE SIMPLE",
      description:
        "Earn predictable yields in volatile markets with instant withdrawals.",
      rotationDirection: 5,
      animationDirection: "left",
    },
    {
      emoji: "🎮",
      title: "FLEXIBLE YIELD STRATEGIES",
      description:
        "Customize your yield approach with multiple investment options.",
      rotationDirection: -5,
      animationDirection: "right",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsToShow = 3;
  const totalItems = ecosystem.length;

  const handleSlide = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);

    const offset = direction === "next" ? 1 : -1;

    setStartIndex((prev) => (prev + offset + totalItems) % totalItems);

    setTimeout(() => setIsAnimating(false), 500);
  };

  const visiblePartners = [...Array(itemsToShow)].map((_, index) => {
    const partnerIndex = (startIndex + index) % totalItems;

    return ecosystem[partnerIndex];
  });

  return (
    <>
      <MotionSection
        className="py-20"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <MotionHeading
          className="text-4xl font-bold text-center text-primary mb-16"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Kamo Ecosystem
        </MotionHeading>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <Feature {...features[0]} />

            <MotionDiv
              className="relative h-[250px] md:h-[400px] mx-auto w-full max-w-[400px]"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <Image
                fill
                priority
                alt="Kamo Features"
                className="object-contain"
                src="/images/kamo-haedal.png"
              />
            </MotionDiv>

            <Feature {...features[1]} />
          </div>
        </div>
      </MotionSection>

      <MotionSection
        className="py-20"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-2 md:gap-8">
            <CarouselButton
              direction="prev"
              onClick={() => handleSlide("prev")}
            />

            <AnimatePresence mode="wait">
              <div className="flex gap-5 md:gap-8">
                {visiblePartners.map((item, index) => (
                  <MotionDiv
                    key={`${item.name}-${index}`}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative w-12 md:w-20 h-12 md:h-20"
                    exit={{ opacity: 0, x: -20 }}
                    initial={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Image
                      fill
                      alt={item.name}
                      className="object-contain rounded-2xl"
                      src={item.logo}
                    />
                  </MotionDiv>
                ))}
              </div>
            </AnimatePresence>

            <CarouselButton
              direction="next"
              onClick={() => handleSlide("next")}
            />
          </div>
        </div>
      </MotionSection>
    </>
  );
};
