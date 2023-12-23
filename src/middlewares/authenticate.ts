const LocalStrategy = require('passport-local');
const passport = require('passport');

import { user } from '~/services/database';

passport.use(
  new LocalStrategy(async function verify(username: string, password: string, cb: string) {
    const result = await user.getUserByUsername(username);
  })
);
