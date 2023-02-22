export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  webURL: process.env.WEB_URL,
  apiURL: process.env.API_URL,
  cache: {
    cacheURL: process.env.CACHE_URL,
  },
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
});
