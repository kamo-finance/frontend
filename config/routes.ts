const isProd = process.env.NODE_ENV === 'production';

export const routes = {
  home: isProd ? '/' : '/',
  docs: isProd ? '/docs' : '/docs',
  app: {
    market: isProd ? '/market' : '/market',
    dashboard: isProd ? '/dashboard' : '/dashboard',
    veKAMO: isProd ? '/veKAMO' : '/veKAMO',
  },
  social: {
    twitter: 'https://twitter.com/KamoFinance',
  },
}; 