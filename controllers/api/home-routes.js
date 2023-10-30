const router = require("express").Router();
const { blogPost, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
      // const UserData = await User.findAll({
      //   include: [
      //     {
      //       model: blogPost,
      //       attributes: ["id", "date", "contents",],
      //     },
      //   ],
      // })
      
      const blogPostData = await blogPost.findAll({
        include: [
          {
            model: Comment,
            attributes: ["id", "date", "contents", "blogPost_id", "user_name"],
          },
        ],
      });
  
      const blogPosts = blogPostData.map((blogPost) =>
        blogPost.get({ plain: true })
      );
        console.log(blogPosts)
      res.render("homepage", {
        blogPosts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get("/blogPost/:id", withAuth, async (req, res) => {
    try {
      const blogPostData = await blogPost.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: ["id", "date", "contents", "user_name"],
          },
        ],
      });
  
      const blogPosts = blogPostData.get({ plain: true });
      console.log("Checking blogPosts")
      console.log(blogPosts)
      console.log(blogPosts.comments[0].description)
      res.render("blogPost", { blogPosts, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
 // Gets ALL comments 
  router.get("/Comment", withAuth, async (req, res) => {
    try {
      const CommentData = await Comment.findAll();
  
      const Comment = CommentData.get({ plain: true });
  
      res.render("comment", { Comment, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  
  router.post('/create-blogpost', withAuth, async (req, res) => {
    try {
      const { title, contents } = req.body;
  
      const newBlogPost = await blogPost.create({
        id,
        title,
        contents,
        date,
      });
  
      res.redirect(`/blogPost/${newBlogPost.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
    } else {
      res.render("login");
    }
  });
  
  module.exports = router;