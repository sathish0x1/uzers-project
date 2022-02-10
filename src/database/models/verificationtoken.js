"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VerificationToken extends Model {}
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // static associate(models) {
  //   // define association here
  // }
  VerificationToken.associate = (models) => {
    VerificationToken.belongsTo(models.VerificationToken, {
      as: "verificationtoken",
      foreignKey: "userId",
      foreignKeyConstraint: true,
    });
  };
  VerificationToken.init(
    {
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VerificationToken",
    }
  );
  return VerificationToken;
};
