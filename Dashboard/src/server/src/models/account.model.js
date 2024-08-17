const sequelizeClient = require('../config/orm');
const Sequelize = require('sequelize');
const Users = require('./users.model');

const Account = sequelizeClient.define(
    'account',
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
        current_password: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        new_password: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        confirm_password: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        update_settings: {
            type: Sequelize.BOOLEAN,
            allowNull: true, 
        },
        deactivate_account: {
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

module.exports = Account;
