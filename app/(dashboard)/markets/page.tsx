import React from "react";

import MarketsList from "./components/MarketsList";

import { Page } from "@/components/layout/Page";

const MarketsPage: React.FC = () => {
  return (
    <Page className="min-h-screen pt-16 scrollbar-hide" title="Markets">
      <MarketsList />
    </Page>
  );
};

export default MarketsPage;
