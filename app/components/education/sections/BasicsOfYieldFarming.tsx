import Image from "next/image";

import { Section } from "@/app/components/education/Section";

export const BasicsOfYieldFarming = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Section title="What is Yield Farming?">
            <p className="text-foreground/80">
              Yield farming is like earning interest on your crypto. When you
              put your crypto into a yield farming pool, you earn rewards over
              time. These rewards are shown as APY (Annual Percentage Yield) -
              just like interest rates in a bank.
            </p>
          </Section>
          <Section title="How Kamo Makes it Better">
            <p className="text-foreground/80">
              Kamo splits your investment into two parts to give you more
              control:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>
                  Principal Token (PT) - This is your main investment. It&apos;s
                  like a savings account that gives you back your original
                  amount.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>
                  Yield Token (YT) - This represents your future rewards.
                  It&apos;s like having a claim on all the interest you&apos;ll
                  earn.
                </span>
              </li>
            </ul>
          </Section>
        </div>
        <div className="relative h-[400px] w-full">
          <Image
            fill
            priority
            alt="Kamo Mascot"
            className="object-contain object-center"
            src="/images/kamo.png"
          />
        </div>
      </div>
    </div>
  );
};
