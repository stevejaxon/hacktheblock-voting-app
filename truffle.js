module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/hacking.js",
      "javascripts/app.js",
      "javascripts/chairman.js"
    ],
    "app.css": [
      "stylesheets/skeleton.css",
      "stylesheets/index.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
