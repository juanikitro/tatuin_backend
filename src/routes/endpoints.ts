import {
  Application
} from 'express';

import userRoutes from './user/userRoutes';
import authRoutes from './auth/authRoutes';

const endpoints = (app: Application): void => {
  app.use('/v1/api', userRoutes)
  app.use('/v1/api', authRoutes)
};

export default endpoints;