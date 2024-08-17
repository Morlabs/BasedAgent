const sequelizeClient = require('../config/orm');
const Sequelize = require('sequelize');

const Reviewers = sequelizeClient.define(
  'reviewers',
  {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    github: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    skills: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    availability: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    discord_handle: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    github_username: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    github_url: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    top_languages: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
    total_contributions: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    public_repositories: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Reviewers;
