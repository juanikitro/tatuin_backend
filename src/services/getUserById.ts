import MariaDb from '../configs/db_connection';
import { User } from '../models/User';

export async function getUserById(userId: number) {
    return await MariaDb.getRepository(User).findOne({
        where: { userId },
        relations: {
            userDetailId: {
                sellerDetailId: true
            },
        },
    });
}
