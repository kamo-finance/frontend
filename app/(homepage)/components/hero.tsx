import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  springUpHover,
  buttonTap,
  floatAnimation,
} from "@/utils/animations";

const MotionDiv = motion.div as any;

type Market = {
  name: string;
  apy: string;
  type: string;
  icon: string;
};

type StatCardProps = {
  icon: string;
  title: string;
  value: string;
  change: string;
  bgColor: string;
  iconColor: string;
};

type MarketCardProps = {
  market: Market;
};

const StatCard = ({
  icon,
  title,
  value,
  change,
  bgColor,
  iconColor,
}: StatCardProps) => (
  <MotionDiv
    className="backdrop-blur rounded-2xl p-6 shadow-sm bg-foreground-50"
    variants={springUpHover}
  >
    <div className="flex items-center gap-3 mb-2">
      <div
        className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}
      >
        <span className={`${iconColor} text-xl`}>{icon}</span>
      </div>
      <h4 className="text-foreground font-medium">{title}</h4>
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <div className="flex items-center text-sm text-green-600 mt-1">
      <span>↑</span>
      <span className="ml-1">{change}</span>
    </div>
  </MotionDiv>
);

const MarketCard = ({ market }: MarketCardProps) => (
  <div className="flex flex-col md:flex-row  items-center justify-between bg-foreground-100/75 backdrop-blur border-3 border-foreground rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-foreground-200 flex items-center justify-center">
        <span className="text-2xl">{market.icon}</span>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">{market.name}</h3>
        <p className="text-sm text-foreground-500">{market.type}</p>
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-bold text-forground">{market.apy}</span>
      <span className="text-sm font-medium">APY</span>
    </div>
  </div>
);

export const Hero = () => {
  const topMarkets: Market[] = [
    {
      name: "kUSDC",
      apy: "8.07%",
      type: "fixed yield",
      icon: "💵",
    },
    {
      name: "kUSDC",
      apy: "8.66%",
      type: "fixed yield",
      icon: "💶",
    },
    {
      name: "kUSDC",
      apy: "24.04%",
      type: "fixed yield",
      icon: "💷",
    },
  ];

  const stats = [
    {
      icon: "💰",
      title: "Total Value Locked",
      value: "$3.05B",
      change: "2.4% (24h)",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: "📊",
      title: "Trading Volume",
      value: "$45.8B",
      change: "5.7% (24h)",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background decorative elements */}
      <MotionDiv
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <MotionDiv
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        transition={{
          duration: 8,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-0 md:px-4">
        <MotionDiv
          animate="animate"
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="initial"
          variants={staggerContainer}
        >
          {/* Left Content */}
          <div className="space-y-8">
            <MotionDiv variants={fadeInDown}>
              <div className="relative inline-block">
                <div className="relative">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
                    <span className="text-primary">Kamo</span>
                    <span className="text-yellow-500">Finance</span>
                  </h1>
                  <p className="text-2xl text-foreground/50 mt-2">
                    Unlock Liquidity, Maximize Returns
                  </p>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv
              className="prose prose-lg text-foreground"
              variants={fadeInLeft}
            >
              <p>
                Experience the future of DeFi with our innovative yield farming
                platform. Earn predictable yields and optimize your returns with
                advanced strategies.
              </p>
            </MotionDiv>

            <MotionDiv className="flex gap-4" variants={fadeInUp}>
              {[
                {
                  href: "/markets",
                  color: "primary",
                  text: "Launch App",
                  variant: undefined,
                },
                {
                  href: "/education",
                  color: "secondary",
                  text: "Learn More",
                  variant: "bordered",
                },
              ].map((btn, index) => (
                <MotionDiv key={index} variants={springUpHover} {...buttonTap}>
                  <Button
                    as={Link}
                    className="fo"
                    color={btn.color as any}
                    href={btn.href}
                    variant={btn.variant as any}
                  >
                    {btn.text}
                  </Button>
                </MotionDiv>
              ))}
            </MotionDiv>

            {/* Stats */}
            <MotionDiv
              className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8"
              variants={fadeInUp}
            >
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </MotionDiv>
          </div>

          {/* Right Content - Hero Image */}
          <MotionDiv
            variants={fadeInRight}
            {...floatAnimation}
            className="relative h-[200px] md:h-[600px]"
          >
            <Image
              fill
              priority
              alt="Kamo Hero"
              className="object-contain"
              src="/images/hero.PNG"
            />
          </MotionDiv>
        </MotionDiv>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topMarkets.map((market, index) => (
              <MarketCard key={index} market={market} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
