module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js",
      "javascripts/chairman.js",
      "javascripts/hacking.js"
    ],
    "app.css": [
      "stylesheets/app.css",
      "stylesheets/index.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
