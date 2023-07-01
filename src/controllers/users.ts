import { Request, Response } from 'express';
import cacheResponse from '../services/cacheResponse';
import MariaDb from '../configs/db_connection';
import { User } from "../entity/User";


async function findAllPersonData(req: Request, res: Response): Promise<Response> {
  try {
    const users = await MariaDb.getRepository(User).find()

    const response = {}
    cacheResponse(JSON.stringify(req.body), response);

    return res.send(response);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export default findAllPersonData;
