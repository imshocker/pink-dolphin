const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the user to the login page

    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // If the user is logged in, execute the route function that will allow them to post and comment.
      // We call next() if the user is authenticated
      next();
    }
  };
  
  module.exports = withAuth;