module.exports = {
  apps: [
    {
      name: 'Braingym Web',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        "NODE_ENV": "production",
      }
    }
  ]
}