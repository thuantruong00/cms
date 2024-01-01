const passport = require('passport');
const LocalStrategy = require('passport-local');

const { comparePassword } = require('~/utils/password.util.js');

const { findUserByUsername, findUserById } = require('~/models/User.model.ts');

const verify = async (username, password, done) => {
  try {
    const user = await findUserByUsername(username);

    if (!user) {
      return done(null, false, { code: 1, msg: 'Incorrect username.' });
    }

    const isCorrectPassword = comparePassword(password, user.password_hash, user.salt);

    if (!isCorrectPassword) {
      return done(null, false, { code: 2, msg: 'Incorrect password.' });
    }

    const user_credentials = {
      id: user.id,
      username: user.username,
      role: user.type
    };

    return done(null, user_credentials);
  } catch (error) {
    done(error);
    console.error(error);
  }
};

const strategy = new LocalStrategy(verify);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await findUserById(userId);

    const user_credentials = {
      id: user.id,
      username: user.username,
      role: user.type
    };

    done(null, user_credentials);
  } catch (err) {
    done(err);
  }
});

// default export
module.exports = passport;
