import { Request, Response } from 'express';
import cacheResponse from '../services/cacheResponse';
import MariaDb from '../configs/db_connection';
import { User } from '../models/User';
import { SellerDetail } from '../models/SellerDetail';
import { getUserById } from '../services/getUserById';

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

async function getUser(req: Request, res: Response) {
  try {
    const response = await getUserById(Number(req.params.userId));

    if (response) {
      cacheResponse(JSON.stringify(req.body), response);

      return res.status(200).send(response);
    }

    return res.status(404).send(`User ${req.params.userId} not found`);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const userToDelete = await getUserById(Number(req.params.userId));

    if (userToDelete) {
      await MariaDb.getRepository(User).delete(userToDelete)
      cacheResponse(JSON.stringify(req.body), userToDelete);

      return res.status(202).send(userToDelete);
    }

    return res.status(404).send(`User ${req.params.userId} not found`);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function editUser(req: Request, res: Response) {
  try {
    let userToModify = await getUserById(Number(req.params.userId));

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

    return res.status(404).send(`User ${req.params.userId} not found`);
  } catch (error) {
    console.error(error)
    return res.status(500).send(error);
  }
}

async function createNewSeller(req: Request, res: Response) {
  try {
    const newSeller = await getUserById(Number(req.params.userId));

    if (!(req.body.legalName && req.body.phoneNumber && req.body.address && req.body.geo && req.body.media && req.body.status)) {
      return res.status(404).send(`The endpoint requires more params`);
    }

    if (newSeller && newSeller?.userDetailId.seller === true) {
      return res.status(404).send(`User ${req.params.userId} already is seller`);
    }

    if (newSeller) {
      if (newSeller.userDetailId) {
        const sellerDetailRepo = MariaDb.getRepository(SellerDetail);
        const sellerDetail = sellerDetailRepo.create({
          userDetailId: newSeller.userDetailId,
          legalName: req.body.legalName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          geo: req.body.geo,
          media: req.body.media,
          status: req.body.status,
        })
        await sellerDetailRepo.save(sellerDetail)

        newSeller.userDetailId.seller = true;
        newSeller.userDetailId.sellerDetailId = sellerDetail;

        const response = await MariaDb.getRepository(User).save(newSeller);

        cacheResponse(JSON.stringify(req.body), response);

        return res.status(200).send(response);
      }

      return res.status(404).send(`userDetailId ${newSeller.userDetailId} from user ${req.params.userId} not found`);
    }

    return res.status(404).send(`User ${req.params.userId} not found`);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export { getAllUsers, getUser, editUser, deleteUser, createNewSeller };
