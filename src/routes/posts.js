const Router = require("express").Router();
const { User, Posts } = require("../database/models/");
const url = require("url");

//list of Posts
Router.get("/", async (req, res) => {
  try {
    const posts = await Posts.findAll({});

    res.json({ message: "lists of all posts", data: posts });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = Router;

//get the api route to get data

Router.get("/api-data", async (req, res) => {
  try {
  } catch (error) {
    res.json({ error: error.message });
  }
});
