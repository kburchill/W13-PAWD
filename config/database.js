const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'postgres://kqmwnrfolrprhv:63f6747759dcd2597eab6a4dd6471d46d8103a2373927be5efac7685a87b7d23@ec2-18-214-208-89.compute-1.amazonaws.com:5432/d7pmskmku9fgmhDATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};
