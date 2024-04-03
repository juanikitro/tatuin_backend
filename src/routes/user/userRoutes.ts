import { Router } from 'express';
import { getAllUsers, getUser, editUser, deleteUser, createNewSeller } from '../../controllers/users';

const router = Router();

const base = '/user'

router.get(`${base}`, getAllUsers);
router.get(`${base}/:userId`, getUser);
router.patch(`${base}/:userId`, editUser);
router.delete(`${base}/:userId`, deleteUser);
router.post(`${base}/:userId/createNewSeller`, createNewSeller);

export default router;
