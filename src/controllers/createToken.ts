/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * It authenticates a user by checking their credentials and returning a JWT token if they match.
 * @param {Request} req
 * @param {Response} res
 * @returns If credentials are ok, it returns a status code of 200. If not, a status code of 401 with the message "Unauthorized".
 */
function createToken(req: Request, res: Response): Response {
  const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET_KEY ?? 'd3f4ult_s3cr3t_k3y', { expiresIn: process.env.TOKEN_EXPIRATION_TIME ?? '1h' });
  return res.status(200).send(token);
}

export { createToken };
