const isProd = process.env.NODE_ENV === "production";

export const routes = {
  home: isProd ? "/" : "/",
  docs: "https://kamo-finance.gitbook.io/kamo-finance-docs",
  app: {
    markets: isProd ? "/markets" : "/markets",
    dashboard: isProd ? "/dashboard" : "/dashboard",
    veKAMO: isProd ? "/veKAMO" : "/veKAMO",
  },
  social: {
    twitter: "https://twitter.com/KamoFinance",
  },
  education: "/education",
};
