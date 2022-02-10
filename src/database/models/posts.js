"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {}
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // static associate(models) {
  //   // define association here
  //   Posts.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
  // }

  Posts.association = (models) => {
    Posts.belongsTo(models.User, { foreignKey: "user_id", as: "User" });
  };

  Posts.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "User",
        referencesKey: "id",
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
