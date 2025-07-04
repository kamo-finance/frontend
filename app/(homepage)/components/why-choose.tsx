import Image from "next/image";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;

// Animation variants
const animations = {
  fadeDown: {
    initial: { y: -60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },

  fadeUp: {
    initial: { y: 60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },

  spring: {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  },

  checkmark: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },

  container: {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  },

  box: {
    initial: { y: 60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  },
};

// Feature data
const features = [
  {
    title: "For Yield Farmers",
    image: "/images/sleep-farmer.png",
    benefits: [
      "Stable and predictable yields",
      "No lock-up periods",
      "Instant withdrawals",
    ],
  },
  {
    title: "For KAMO Holders",
    image: "/images/holders.png",
    benefits: [
      "Governance rights",
      "Revenue sharing",
      "Boosted yield through veKAMO",
    ],
  },
  {
    title: "For Developers",
    image: "/images/cooking.png",
    benefits: [
      "TypeScript SDK",
      "Open-source contracts",
      "Developer-first ecosystem",
    ],
  },
];

const FeatureBox = ({ title, image, benefits }: any) => (
  <MotionDiv
    className="bg-foreground-100 rounded-3xl p-8 shadow-md border-3 border-foreground hover:shadow-lg transition-all"
    variants={animations.box}
    whileHover="hover"
  >
    <div className="flex items-center gap-6 mb-8">
      <MotionDiv
        className="w-20 md:w-[120px] h-20 md:h-[120px] flex-shrink-0"
        variants={animations.spring}
        whileHover="hover"
      >
        <Image
          priority
          alt={title}
          className="object-contain w-full h-full"
          height={120}
          src={image}
          width={120}
        />
      </MotionDiv>
      <h3 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    <MotionDiv className="space-y-5" variants={animations.container}>
      {benefits.map((benefit: any, index: number) => (
        <MotionDiv
          key={index}
          className="flex items-start gap-4"
          variants={animations.checkmark}
        >
          <span className="text-green-500 text-lg">✓</span>
          <p className="text-gray-600 text-lg">{benefit}</p>
        </MotionDiv>
      ))}
    </MotionDiv>
  </MotionDiv>
);

export const WhyChoose = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-0 md:px-4">
        <MotionDiv
          className="text-center"
          initial="initial"
          variants={animations.fadeDown}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="animate"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-green-600">Kamo</span>
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Join our ecosystem and unlock the full potential of DeFi
          </p>
        </MotionDiv>

        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="initial"
          variants={animations.container}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="animate"
        >
          {features.map((feature, index) => (
            <FeatureBox key={index} {...feature} />
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};
