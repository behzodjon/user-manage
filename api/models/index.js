//importing modules
const { Sequelize, DataTypes } = require('sequelize');

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
// const sequelize = new Sequelize(`postgres://postgres:root@localhost:5432/auth_db`, {dialect: "postgres"})
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
  { dialect: 'postgres' }
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require('./user')(sequelize, DataTypes);

//exporting the module
module.exports = db;
