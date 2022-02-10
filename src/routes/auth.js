const Router = require("express").Router();
const { User } = require("../database/models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebToken");
const config = require("../config/index");
const {
  isValidEmail,
  isValidMobile,
  isvalidPassword,
} = require("../utils/validation");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwttokens");

//signup
Router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, mobile } = req.body;
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("email is already taken");
    }
    const existingMobileNumber = await User.findOne({
      where: {
        mobile: mobile.toString(),
      },
    });
    if (existingMobileNumber) {
      throw new Error("mobile number is already taken");
    }
    if (!firstName) {
      throw new Error("Invalid first name");
    }
    if (!lastName) {
      throw new Error("Invalid last name");
    }
    if (!isValidEmail(email)) {
      throw new Error("Invalid email");
    }
    if (!isvalidPassword(password)) {
      throw new Error(
        "password must have atlease 8 characters consists of atleast one lowercase letter, one uppercase letter, one number and a special character"
      );
    }
    if (!isValidMobile(mobile)) {
      throw new Error("Invalid mobile number");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobile: mobile.toString(),
      gender,
    });
    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: "signup successfully",
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          gender: user.gender,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        },
        accessToken,
        refreshToken: user.refreshToken,
      },
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

//login
Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("Invalid credentails");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentails");
    }
    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).send({
      message: "login Successfully",
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          gender: user.gender,
        },
        accessToken,
        refreshToken: user.refreshToken,
      },
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = Router;
