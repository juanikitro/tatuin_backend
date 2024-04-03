import MariaDb from '../database/connection';
import { User } from '../models/user/User';

export async function getUserById(userId: number) {
    return await MariaDb.getRepository(User).findOne({
        where: { userId },
        relations: {
            userPrimaryDetail: {
                sellerDetail: true
            },
        },
    });
}
