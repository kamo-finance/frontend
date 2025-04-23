import Image from "next/image";

import { Section } from "@/app/components/education/Section";

export const SafeReturns = () => {
  return (
    <div className="space-y-8">
      <Section title="What are Principal Tokens (PT)?">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <p className="text-foreground/80">
                Principal Tokens (PT) are like a savings account for your
                crypto. You buy them at a discount and get your full amount back
                later.
              </p>
              <div className="p-6 bg-primary/10 rounded-lg">
                <h4 className="font-semibold mb-4">Simple Example:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Buy 1 PT haSUI for 0.9 haSUI (10% off)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Wait until maturity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-primary font-bold">
                      Get back 1 full haSUI (11% profit)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative h-[500px] w-full">
              <Image
                fill
                priority
                alt="Principal Token Concept"
                className="object-contain object-center"
                src="/images/PT.png"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-4">Safe Returns</h4>
              <p className="text-foreground/80">
                Know exactly how much you&apos;ll get back at maturity. Your
                returns are locked in.
              </p>
            </div>
            <div className="p-6 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-4">Discount Buy</h4>
              <p className="text-foreground/80">
                Buy PT at a discount today, get full value later. The difference
                is your profit.
              </p>
            </div>
            <div className="p-6 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-4">Flexible Exit</h4>
              <p className="text-foreground/80">
                Can sell anytime before maturity if you need your funds early.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="When to Buy PT?">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <p className="text-foreground/80">
                The fixed yield from buying and holding PT depends on the market
                price. Buy when PT prices are low to get higher returns.
              </p>

              <div className="space-y-4">
                <div className="p-6 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold mb-4">
                    Step 1: Predict Future Yields
                  </h4>
                  <p className="text-foreground/80">
                    Estimate what the average yield will be until maturity.
                  </p>
                </div>
                <div className="p-6 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold mb-4">Step 2: Compare Rates</h4>
                  <p className="text-foreground/80">
                    If PT&apos;s fixed rate is better than your prediction,
                    it&apos;s a good time to buy.
                  </p>
                </div>
              </div>

              <div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
                <h4 className="font-bold text-primary mb-4">Example</h4>
                <p className="text-foreground/80">
                  If you think haSUI will give 5% yield, but PT haSUI offers
                  6.4% fixed rate, that&apos;s a good deal! You&apos;ll earn
                  more than expected.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] w-full">
              <Image
                fill
                priority
                alt="PT Trading Strategy"
                className="object-contain object-center"
                src="/images/kamo5.png"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Selling PT Early">
        <div className="space-y-6">
          <p className="text-foreground/80">
            You don&apos;t have to wait until maturity. You can sell PT anytime
            for profit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-4">Why Sell Early?</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>Need money for other investments</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>PT price increased - good time to take profit</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-4">Market Example</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>PT haSUI = 0.94 haSUI</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>Current yield = 5%</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>Fixed rate = 6.4%</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
            <h4 className="font-bold text-primary mb-4">Pro Tip</h4>
            <p className="text-foreground/80">
              Watch the market! When PT prices drop due to market changes,
              that&apos;s often the best time to buy. You can lock in high rates
              and not worry about market ups and downs.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};
