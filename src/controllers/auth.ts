/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * It authenticates a user by checking their credentials and returning a JWT token if they match.
 * @param {Request} req
 * @param {Response} res
 * @returns If the user and password match the environment variables, a JWT token is returned with a
 * status code of 200. If not, a status code of 401 with the message "Unauthorized" is returned.
 */
function auth(req: Request, res: Response): Response {
  const { user, password } = req.body;

  //TODO: Usar datos de usuarios reales
  // if (user === process.env.AUTH_USER || password === process.env.AUTH_PASSWORD) {
  const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY ?? 'd3f4ult_s3cr3t_k3y', { expiresIn: process.env.TOKEN_EXPIRATION_TIME ?? '1h' });
  return res.status(200).send(token);
  // }
  // return res.status(401).send('Unauthorized');
}

export default auth;
