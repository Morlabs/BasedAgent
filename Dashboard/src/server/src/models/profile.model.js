const sequelizeClient = require('../config/orm');
const Sequelize = require('sequelize');
const Users = require('./users.model');

const Profile = sequelizeClient.define(
    'profile',
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
        first_name: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        last_name: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        gender_identity: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        date_of_birth: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        current_location: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        primary_email: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        linkedin_url: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        portfolio_website: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        twitter_handle: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        profile_discoverability: {
            type: Sequelize.BOOLEAN,
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

module.exports = Profile;
