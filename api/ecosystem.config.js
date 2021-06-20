module.exports = {
  apps: [
    {
      name: 'Braingym API',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: 'src/',
      args: 'start',
      env: {
        "NODE_ENV": "production",
      }
    }
  ]
}