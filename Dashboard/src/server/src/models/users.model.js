const sequelizeClient = require('../config/orm');
const Sequelize = require('sequelize');

const Users = sequelizeClient.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      onUpdate: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Users;
