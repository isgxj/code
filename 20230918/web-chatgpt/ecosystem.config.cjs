module.exports = {
  apps: [
    {
      name: 'web-chatgpt',
      port: '3004',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
