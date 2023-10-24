const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blogpost_id: {
            type: DataTypes.INTEGER,
            allowNull: false, // Add allowNull for the foreign key
            references: {
                model: "blogpost",
                key: "id",
            },
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false, // Add allowNull for the foreign key
            references: {
                model: "user",
                key: "username",
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    }
);

module.exports = Comment;