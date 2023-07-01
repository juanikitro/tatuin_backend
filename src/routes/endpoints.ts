import {
  Application, Request, Response,
} from 'express';
import dotenv from 'dotenv';
import auth from '../controllers/auth';
import findAllPersonData from '../controllers/u';

dotenv.config();

const endpoints = (app: Application): void => {
  // Auth
  app.post('/v1/auth', (req: Request, res: Response) => auth(req, res));

  // Other endpoints
  // app.get('/v1/api/person', async (req: Request, res: Response) => findAllPersonData(req, res));
};

export default endpoints;
