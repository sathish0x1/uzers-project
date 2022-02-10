"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // static associate(models) {
  //   // define association here
  //   User.hasMany(models.Posts, { foreignKey: "user_id", as: "posts" });
  // }
  User.associate = (models) => {
    User.hasMany(models.Posts, { foreignKey: "user_id", as: "posts" });
    User.hasOne(models.VerificationToken, {
      foreignKey: "userId",
      as: "verificationtoken",
      foreignKeyConstraint: true,
    });
  };

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female", "others"],
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      isVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
