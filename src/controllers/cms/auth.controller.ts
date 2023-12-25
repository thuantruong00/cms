import { NextFunction, Request, Response } from 'express';

import { passport } from '~/config';
import { UserModel } from '~/models';

export const SignInViewHandler = async (req: Request, res: Response) => {
  return res.render('');
};

export const SignInHandler = async (req: Request, res: Response) => {
  passport.authenticate('local', (error: any, user: UserModel, info: any) => {
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
      return res.redirect('/cms');
    });
  })(req, res);
};

export const SignOutHandler = (req: Request, res: Response, next: NextFunction) => {
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
        res.redirect('/');
      });
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500);
    res.render('error');
  }
};

export const getCurrentUser = (req: Request, res: Response) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If authenticated, send user details
    return res.json({ user: req.user });
  } else {
    // If not authenticated, send an appropriate response
    return res.status(401).json({ message: 'Not authenticated' });
  }
};
