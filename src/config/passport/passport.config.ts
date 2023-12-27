import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';

import { comparePassword } from '~/utils';

import { UserModel, findUserByUsername, findUserById } from '~/models';

const verify = async (username: string, password: string, done: Function) => {
  try {
    const user: UserModel | null = await findUserByUsername(username);

    if (!user) {
      return done(null, false, { msg: 'Incorrect username.' });
    }

    const isCorrectPassword: boolean = comparePassword(password, user.password_hash, user.salt);

    if (!isCorrectPassword) {
      return done(null, false, { msg: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    done(error);
    console.log(error);
  }
};

const strategy = new LocalStrategy(verify);
passport.use(strategy);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    const user = await findUserById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
export default passport;
