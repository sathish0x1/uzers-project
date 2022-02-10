const Router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const postsRouter = require("./posts");
const { authorize } = require("../middlewares/auth");

Router.use("/auth", authRouter);
Router.use("/users", authorize, userRouter);
Router.use("/posts", postsRouter);

module.exports = Router;
