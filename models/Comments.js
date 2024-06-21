// import model, datatypes and Sequlize connection
const { Model, DataTypes, DATEONLY } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

// initialize the Comments model with its attributes
Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },

    // pass the Sequelize instance
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',

    }
);

module.exports = Comments;