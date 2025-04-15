import { Favicon } from "./Favicon";

import { siteConfig } from "@/config/site";

export const Logo = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Favicon />
      <div className="flex flex-col items-start justify-center gap-0">
        <h1 className="text-lg font-semibold text-primary">
          {siteConfig.name}
        </h1>
      </div>
    </div>
  );
};
