import express from 'express';
import passport from 'passport';
const router = express.Router();

// requiring user controller 
import {
  signin,
  newUserSignup,
  userSignup,
  reset,
  resetPassword,
  userLogout,
  homePage,
  UserLogin} from '../controllers/accountController.js';

// rendering home page
router.get('/home', homePage);

// create new user in database 
router.post('/signup', newUserSignup);

// rendering signup page
router.get('/', userSignup);

// rendering login page 
router.get('/login', UserLogin);

// rendering reset page
router.get('/reset', reset);

// destroy session
router.get('/logout', userLogout);

// reset password
router.post('/reset', resetPassword);

// create new session for user 
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/user/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect('/home'); // Redirect to a dashboard or another route
  }
);

// create new session for user 
router.post('/signin', passport.authenticate('local', { failureRedirect: '/login' }), signin);

export default router;
