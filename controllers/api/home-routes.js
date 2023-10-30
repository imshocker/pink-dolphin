const router = require("express").Router();
const { blogPost, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
      const UserData = await User.findAll({
        include: [
          {
            model: blogPost,
            attributes: ["id", "date", "contents",],
          },
        ],
        
      });
      console.log(UserData)
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
        console.log(blogPosts.Comment)
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
      console.log(blogPosts.comments[0].contents)
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

  router.post('/create-comment', withAuth, async (req, res) => {
    try {

      const newComment = await Comment.create({
        id,
        contents,
        date,
        blogPost_id,
      });

      const { contents } = req.body;

      const CommentData = Comment.findAll();
  
      const Comment = CommentData.get({ plain: true });
  
      res.redirect(`/blogPost/${newComment.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });


  // router.post('/create-comment', withAuth, async (req, res) => {
  //   try {
  //     const { contents } = req.body;

  //     const CommentData = Comment.findAll();
  
  //     const Comment = CommentData.get({ plain: true });
  
  //     const newComment = await Comment.create({
  //       id,
  //       contents,
  //       date,
  //       blogPost_id,
  //     });
      
  //     console.log(newComment);

  //     req.session.save(() => {
  //       req.session.loggedIn = true;
  
  //       res.status(200).json(CommentData);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  // });

  router.get("/dashboard", withAuth, async (req, res) => {
    try {
      const blogPostData = await blogPost.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: Comment,
            attributes: ['id', 'date', 'contents', 'user_name']
          }
        ],
      });
  
      const blogPosts = blogPostData.get({ plain: true });
  
      res.render('dashboard', {
        blogPosts,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
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

// console.log(req.session.user_name);
  
  module.exports = router;