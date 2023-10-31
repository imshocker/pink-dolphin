const router = require("express").Router();
const { blogPost, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogPostData = await blogPost.findAll({
      include: [
        {
          model: Comment,
          attributes: ["id", "date", "contents", "blogPost_id",],
        },
        {
          model: User,
          attributes: ["username"]
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
        {
          model: User,
          attributes: ["username"]
        },
      ],
    });

    const blogPosts = blogPostData.get({ plain: true });
    console.log("Checking blogPosts")
    console.log(blogPosts)
    res.render("blogPost", { blogPosts, loggedIn: req.session.loggedIn });
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
    const { contents } = req.body;
    const { blogpost, user } = req.session;

    const newComment = await Comment.create({
      contents,
      date: new Date(),
      blogpost_id: blogpost,
      user_name: user,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(newComment);
    });


    const blogPosts = blogPostData.get({ plain: true });
    res.render("blogPost", { blogPosts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.session.userId, {
      include: [
        {
          model: blogPost,
          attributes: ["id", "title", "date", "contents", "user_id"],
        },
        {
          model: User,
          attributes: ["username"]
        },
      ],
    });

    if (User) {
      const userBlogPosts = User.BlogPosts;

      res.render('dashboard', { blogPosts: userBlogPosts });
    } else {
      // Handle if the current user is not found
      res.status(404).send('User not found');
    }
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    req.session.username = User.username;
    res.redirect("/");
  } else {
    res.render("login");
  }
});

module.exports = router;