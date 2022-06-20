module.exports = {
  apps : [{
    name   : "app-fork",
    script : "dist/index.js",
    autorestar: true,
    instances: 'max',
    port: 8081
  }]
}
