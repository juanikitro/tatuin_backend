import { Request, Response } from 'express';
import cacheResponse from '../services/cacheResponse';

async function findAllPersonData(req: Request, res: Response): Promise<Response> {
  try {


    const response = {}
    cacheResponse(JSON.stringify(req.body), response);

    return res.send(response);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export default findAllPersonData;
