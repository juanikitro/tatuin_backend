import { Request, Response } from 'express';
import cacheResponse from '../services/cacheResponse';
import MariaDb from '../configs/db_connection';
import { User } from '../models/User';
import { UserDetail } from '../models/UserDetail';

async function getAllUsers(req: Request, res: Response) {
  try {
    const response = await MariaDb.getRepository(User).find();

    cacheResponse(JSON.stringify(req.body), response);

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function createUser(req: Request, res: Response) {
  try {
    let userDetail = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      birthday: req.body.birthday,
    }
    userDetail = await MariaDb.getRepository(UserDetail).save(userDetail);

    let user = {
      username: req.body.username,
      email: req.body.email,
      userDetailId: userDetail
    }
    user = await MariaDb.getRepository(User).save(user);

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export { getAllUsers, createUser };
