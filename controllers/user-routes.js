const router = require('express').Router();
const { User } = require('../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const UserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(UserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const UserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!UserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'That password is incorrect. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: UserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;