const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class blogPost extends Model {}

blogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false, // Add allowNull for the foreign key
        references: {
            model: "user",
            key: "id",
        },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
  }
);

module.exports = blogPost;