const sequelizeClient = require('../config/orm');
const Sequelize = require('sequelize');
const Users = require('./users.model');

const Integrations = sequelizeClient.define(
    'integrations',
    {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: Users,
                key: 'id',
            },
        },
        github_oauth: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        github_personal_access_token: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        gitlab_oauth: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        gitlab_oauth_access_token: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        gitlab_self_hosted_oauth: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        gitlab_self_hosted_oauth_access_token: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        bitbucket_oauth: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        bitbucket_oauth_access_token: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        stackoverflow_oauth: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        stackoverflow_oauth_access_token: {
            type: Sequelize.STRING(255),
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

module.exports = Integrations;
