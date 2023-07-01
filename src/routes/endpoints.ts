import {
  Application, Request, Response,
} from 'express';
import 'dotenv/config'
import auth from '../controllers/auth';
import users from '../controllers/users';


const endpoints = (app: Application): void => {
  // Auth
  app.post('/v1/auth', (req: Request, res: Response) => auth(req, res));

  // Other endpoints
  app.get('/v1/api/users', async (req: Request, res: Response) => users(req, res));
};

export default endpoints;
