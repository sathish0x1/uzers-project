const Router = require("express").Router();
const { User, Posts } = require("../database/models/");

//get the particular user using access token o
Router.get("/me", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: Posts,
          as: "posts",
          attributes: [
            "title",
            "body",
            "description",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });
    res.json({
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          gender: user.gender,
          posts: user.posts,
        },
      },
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//user can post the posts
Router.post("/posts", async (req, res) => {
  try {
    const { title, body, description, user_id = req.user.id } = req.body;

    const post = await Posts.create({
      title,
      body,
      description,
      user_id,
    });

    const user = await User.findOne({
      where: {
        id: post.user_id,
      },
    });

    if (user.email !== req.user.email) {
      throw new Error("You don't have access to posts the data");
    }
    res.json({
      message: "post successfully",
      data: {
        post: {
          id: post.id,
          title: post.title,
          body: post.body,
          description: post.description,
        },
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          gender: user.gender,
          mobile: user.mobile,
        },
      },
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//get the  all posts with user
Router.get("/posts", async (req, res) => {
  try {
    const user = await User.findAll({
      include: [
        {
          model: Posts,
          as: "posts",
          attributes: [
            "title",
            "body",
            "description",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });
    const data = user.map((ele) => {
      return {
        id: user.id,
        firstName: ele.firstName,
        lastName: ele.lastName,
        email: ele.email,
        gender: ele.gender,
        posts: ele.posts,
      };
    });

    res.json({ user: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update the posts with id
Router.put("/posts/:id", async (req, res) => {
  try {
    const { title, body, description } = req.body;
    const post = await Posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      throw new Error(` ${post} Not found`);
    }
    if (post.user_id !== req.user.id) {
      throw new Error("you don't have access to update the post");
    }
    (post.title = title), (post.body = body), (post.description = description);
    const updatePost = await post.save();
    const userId = updatePost.user_id;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (user.id !== req.user.id) {
      throw new Error(`you dont have access to updates the posts`);
    }

    res.json({
      message: "update successfully",
      data: {
        posts: { posts: updatePost },
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          gender: user.gender,
          mobile: user.mobile,
        },
      },
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//delete the post with id
Router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      throw new Error("post is not found");
    }
    if (post.user_id !== req.user.id) {
      throw new Error("you don't have access to delete the post");
    }
    const user = await User.findOne({
      where: {
        id: post.user_id,
      },
    });
    const deletePost = await post.destroy();
    res.json({
      message: "post deleted successfully",
      data: {
        post,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          gender: user.gender,
        },
      },
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//get the particular user by id with all  user posts
Router.get("/posts/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Posts,
          as: "posts",
          attributes: [
            "title",
            "body",
            "description",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    res.send({
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          gender: user.gender,
          posts: user.posts,
        },
      },
    });
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = Router;
