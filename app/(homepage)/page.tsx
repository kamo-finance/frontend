"use client";

import { useState } from "react";
import React from "react";

import { Hero } from "@/app/(homepage)/components/hero";
import { HowItWorks } from "@/app/(homepage)/components/how-it-works";
import { WhyChoose } from "@/app/(homepage)/components/why-choose";
import { Ecosystem } from "@/app/(homepage)/components/ecosystem";
const faqs = [
  {
    question: "What is Kamo?",
    answer:
      "Kamo is a DeFi protocol that enables users to maximize their yield through innovative tokenization and trading strategies.",
  },
  {
    question: "What is veKAMO?",
    answer:
      "veKAMO is our governance token that allows holders to participate in protocol decisions and earn additional rewards.",
  },
  {
    question: "What are the expected returns?",
    answer:
      "You can earn up to 15% APY through our staking strategies, with additional benefits for veKAMO holders.",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    "Kamo is a DeFi protocol that enables users to maximize their yield through innovative tokenization and trading strategies.",
    "veKAMO is our governance token that allows holders to participate in protocol decisions and earn additional rewards.",
    "You can earn up to 15% APY through our staking strategies, with additional benefits for veKAMO holders.",
  ];

  return (
    <main className="flex flex-col min-h-screen md:mt-0 mt-12 overflow-hidden">
      <Hero />
      <WhyChoose />
      <HowItWorks />

      {/* Ecosystem Section */}
      <Ecosystem />

      {/* FAQs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">
            FAQs
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <details className="group border-b border-foreground">
                  <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-medium text-primary">
                    <span>{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center text-primary">
                      <svg
                        className="h-6 w-6 rotate-0 transform transition-transform duration-200 ease-in-out group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-4 text-foreground">{faq.answer}</div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
