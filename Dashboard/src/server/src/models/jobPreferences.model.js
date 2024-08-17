const sequelizeClient = require('../config/orm');
const Sequelize = require('sequelize');
const Users = require('./users.model');

const JobPreferences = sequelizeClient.define(
    'job_preferences',
    {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: Users,
                key: 'id',
            },
        },
        desired_positions: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            allowNull: true,
        },
        target_industry: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            allowNull: true,
        },
        open_to_remote_work: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        employment_type: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        compensation_expectations: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        tech_stack_dislikes: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            allowNull: true,
        },
        ideal_company_scale: {
            type: Sequelize.STRING(50),
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

module.exports = JobPreferences;
