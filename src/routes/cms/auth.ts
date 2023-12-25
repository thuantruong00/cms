import { Router } from 'express';

import { SignInHandler, SignOutHandler, SignInViewHandler } from '~/controllers/cms/auth.controller';
import { isAuthenticated } from '~/middlewares';

const authRouter = Router();

authRouter.get('/sign-in', SignInViewHandler);

authRouter.post('/sign-in', SignInHandler);

authRouter.get('/sign-out', SignOutHandler);

export default authRouter;

// import { passport } from '~/config';

// authRouter.post(
//   'sign-in',
//   passport.authenticate('local', {
//     successRedirect: '/cms',
//     failureRedirect: '/sign-in',
//     failureFlash: true
//   }),
//   () => {}
// );
