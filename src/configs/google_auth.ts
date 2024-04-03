import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User';
import MariaDb from '../configs/db_connection';
import { UserPrimaryDetail } from '../models/UserPrimaryDetail';

function setUpGoogleAuth() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/v1/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userRepo = MariaDb.getRepository(User);
                const userDetailRepo = MariaDb.getRepository(UserPrimaryDetail);

                const existingUser = await userRepo.findOneBy({ googleId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                } else {
                    const userDetail = userDetailRepo.create({
                        firstName: profile.name ? profile.name.givenName : '',
                        lastName: profile.name ? profile.name.familyName : '',
                        dni: '',
                        birthday: '',
                    });
                    await userDetailRepo.save(userDetail);

                    const user = userRepo.create({
                        googleId: profile.id,
                        username: `${userDetail.firstName} ${userDetail.lastName}`,
                        email: profile.emails ? profile.emails[0].value : '',
                        userPrimaryDetail: userDetail
                    });
                    await userRepo.save(user);

                    done(null, user);
                }
            } catch (error) {
                done(String(error), false);
            }
        }
    ));

    passport.serializeUser((user: Express.User, done) => {
        done(null, (user as User).userId);
    });

    passport.deserializeUser(async (id: string, done) => {
        const userRepo = MariaDb.getRepository(User);
        const user = await userRepo.findOneBy({ userId: Number(id) });
        done(null, user);
    });
}

export { setUpGoogleAuth }
