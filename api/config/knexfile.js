// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: "mysql://root:root@localhost:3306/brain_gym",
    migrations: {
      directory: '../migrations'
    }
  },
  production: {
    client: 'mysql',
    connection: "mysql://root:braingym$tp@localhost:3306/brain_gym",
    migrations: {
      directory: '../migrations'
    }
  }
}
