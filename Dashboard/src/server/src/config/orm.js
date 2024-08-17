const Sequelize = require('sequelize');
const { db } = require('./config');

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: 'postgres',
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
