"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { BasicsOfYieldFarming } from "@/app/components/education/sections/BasicsOfYieldFarming";
import { SplitYourInvestment } from "@/app/components/education/sections/SplitYourInvestment";
import { SafeReturns } from "@/app/components/education/sections/SafeReturns";
import { BoostReturns } from "@/app/components/education/sections/BoostReturns";
import { AdvancedTrading } from "@/app/components/education/sections/AdvancedTrading";

const sections = [
  {
    id: 0,
    title: "Basics of Yield Farming",
    description: "Start here to learn how yield farming works with Kamo",
    content: <BasicsOfYieldFarming />,
  },
  {
    id: 1,
    title: "Split Your Investment",
    description: "Learn how Kamo splits your investment into PT and YT",
    content: <SplitYourInvestment />,
  },
  {
    id: 2,
    title: "Safe Returns with PT",
    description: "Use Principal Tokens for guaranteed returns",
    content: <SafeReturns />,
  },
  {
    id: 3,
    title: "Boost Returns with YT",
    description: "Use Yield Tokens to earn more from your investment",
    content: <BoostReturns />,
  },
  {
    id: 4,
    title: "Advanced Trading",
    description: "Learn expert strategies to maximize your returns",
    content: <AdvancedTrading />,
  },
];

const EducationPage = () => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Easy Guide to Making Money with Kamo
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Want to earn more from your crypto? Kamo helps you earn better
            rewards from yield farming. Learn how to use our special tools to
            boost your returns.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              className={cn(
                "px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap",
                activeSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10",
              )}
              onClick={() => setActiveSection(section.id)}
            >
              {section.id}. {section.title}
            </button>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-12 px-4">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  activeSection >= section.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background-secondary text-foreground/50",
                )}
              >
                {section.id}
              </div>
              {index < sections.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-32",
                    activeSection > section.id
                      ? "bg-primary"
                      : "bg-background-secondary",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            {sections[activeSection].title}
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            {sections[activeSection].description}
          </p>
          <div className="prose prose-invert max-w-none">
            {sections[activeSection].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
