const { DB_LOCAL_PASSWORD, DB_IP } = process.env

module.exports = {
  development: {
    username: "root",
    password: DB_LOCAL_PASSWORD,
    database: "velog_clone",
    host: DB_IP,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
}
