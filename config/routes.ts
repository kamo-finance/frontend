const isProd = process.env.NODE_ENV === 'production';

export const routes = {
  home: isProd ? 'https://kamo.finance' : '/',
  docs: isProd ? 'https://docs.kamo.finance' : '/docs',
  app: {
    market: isProd ? 'https://app.kamo.finance/market' : '/market',
    dashboard: isProd ? 'https://app.kamo.finance/dashboard' : '/dashboard',
    veKAMO: isProd ? 'https://app.kamo.finance/veKAMO' : '/veKAMO',
  },
  social: {
    twitter: 'https://twitter.com/KamoFinance',
  },
}; 