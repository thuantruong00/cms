const passport = require('~/config/passport/passport.config.js');

const SignInViewHandler = async (req, res) => {
  return res.render('pages/cms/login', { layout: 'layouts/center-layout', active_page: { title: 'Sign In' } });
};

const SignInHandler = async (req, res) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.log('Error during sign in: ', error);
      return res.status(500).json({ msg: 'Internal Server Error.' });
    }
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials.' });
    }
    req.login(user, (loginError) => {
      if (loginError) {
        console.error('Error during login: ', loginError);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // If login is successful, send a response with user details
      return res.status(200).json({ success: true, msg: 'Welcome!' });
    });
  })(req, res);
};

const SignOutHandler = (req, res, next) => {
  try {
    req.logout((logoutError) => {
      if (logoutError) {
        return next(logoutError);
      }
      req.session.destroy((destroyErr) => {
        if (destroyErr) {
          console.error('Error destroying session:', destroyErr);
          return res.status(500).render('error');
        }
        res.redirect('/cms/sign-in');
      });
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500);
    res.render('error');
  }
};

const getCurrentUser = (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If authenticated, send user details
    return res.json({ user: req.user });
  } else {
    // If not authenticated, send an appropriate response
    return res.status(401).json({ message: 'Not authenticated' });
  }
};

module.exports = { getCurrentUser, SignInHandler, SignInViewHandler, SignOutHandler };
