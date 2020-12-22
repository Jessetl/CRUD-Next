const withSass = require("@zeit/next-sass");
const withImages = require("next-images");

module.exports = withSass(
  withImages({
    serverRuntimeConfig: {
      API_URL: process.env.API_URL,
    },
    publicRuntimeConfig: {
      API_URL: process.env.API_URL,
    },
  })
);
