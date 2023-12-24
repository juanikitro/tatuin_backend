import {
  Application, Request, Response,
} from 'express';
import passport from 'passport';
import 'dotenv/config'

import { getAllUsers, getUser, editUser, deleteUser, createNewSeller } from '../controllers/users';
import { createToken } from '../controllers/createToken';

const endpoints = (app: Application): void => {
  // Users
  app.get('/v1/api/user', async (req: Request, res: Response) => getAllUsers(req, res));
  app.get('/v1/api/user/:userId', async (req: Request, res: Response) => getUser(req, res));
  app.patch('/v1/api/user/:userId', (req: Request, res: Response) => editUser(req, res));
  app.delete('/v1/api/user/:userId', (req: Request, res: Response) => deleteUser(req, res));
  app.post('/v1/api/user/:userId/createNewSeller', (req: Request, res: Response) => createNewSeller(req, res));

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
