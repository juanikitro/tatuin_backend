import {
  Application, Request, Response,
} from 'express';
import passport from 'passport';
import 'dotenv/config'

import { getAllUsers, editUser } from '../controllers/users';
import { createToken } from '../controllers/createToken';


const endpoints = (app: Application): void => {
  // Users
  app.get('/v1/api/users', async (req: Request, res: Response) => getAllUsers(req, res));
  app.patch('/v1/api/user/:userId', (req: Request, res: Response) => editUser(req, res));

  // Auth
  app.get('/v1/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/v1/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      if (req.user) {
        return res.status(200).send({
          user: req.user,
          token: createToken(req)
        });
      }
      return res.status(401).send('You must log in');
    });
};

export default endpoints;
