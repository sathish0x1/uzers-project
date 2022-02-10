const jwt = require("jsonwebtoken");
const config = require("../config/index");
const { User } = require("../database/models/");

const authorize = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"] || "";
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    if (!token) {
      throw new Error("Access token is not valid");
    }
    const data = jwt.verify(token, config.jwt.ACCESS_TOKEN);
    if (!data) {
      throw new Error("you dont have access");
    }
    const user = await User.findOne({
      where: {
        id: data.id,
      },
    });
    if (!user) throw new Error("you dont have access");
    req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ error: "you dont have access" });
  }
};

module.exports = {
  authorize,
};
