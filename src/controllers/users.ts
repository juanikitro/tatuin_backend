import { Request, Response } from 'express';
import cacheResponse from '../services/cacheResponse';
import MariaDb from '../configs/db_connection';
import { User } from '../models/User';

async function getAllUsers(req: Request, res: Response) {
  try {
    const response = await MariaDb.getRepository(User).find({
      relations: {
        userDetailId: true,
      },
    });

    cacheResponse(JSON.stringify(req.body), response);

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function editUser(req: Request, res: Response) {
  try {
    let userToModify = await MariaDb.getRepository(User).findOne({
      where: {
        userId: Number(req.params.userId)
      },
      relations: {
        userDetailId: true,
      },
    },)

    if (userToModify && req.body) {
      userToModify.username = req.body.username ?? userToModify.username;
      userToModify.email = req.body.email ?? userToModify.email;

      if (userToModify.userDetailId) {
        userToModify.userDetailId.firstName = req.body.firstName ?? userToModify.userDetailId.firstName;
        userToModify.userDetailId.lastName = req.body.lastName ?? userToModify.userDetailId.lastName;
        userToModify.userDetailId.dni = req.body.dni ?? userToModify.userDetailId.dni;
        userToModify.userDetailId.birthday = req.body.birthday ?? userToModify.userDetailId.birthday;
      }

      userToModify = await MariaDb.getRepository(User).save(userToModify);

      return res.status(200).send(userToModify);
    }

    return res.status(404).send('User not found');
  } catch (error) {
    console.error(error)
    return res.status(500).send(error);
  }
}

export { getAllUsers, editUser };
