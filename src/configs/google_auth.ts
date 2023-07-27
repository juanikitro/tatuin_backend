import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User';
import MariaDb from '../configs/db_connection';
import { UserDetail } from '../models/UserDetail';

function setUpGoogleAuth() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/v1/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userRepo = MariaDb.getRepository(User);
                const userDetailRepo = MariaDb.getRepository(UserDetail);

                const existingUser = await userRepo.findOneBy({ googleId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                } else {
                    //TODO: Luego de la creacion del usuario, se deben modificar obligatoriamente por el front los valores vacios
                    const userDetail = userDetailRepo.create({
                        firstName: profile.name ? profile.name.givenName : '',
                        lastName: profile.name ? profile.name.familyName : '',
                        dni: '',
                        birthday: '',
                    });
                    const user = userRepo.create({
                        googleId: profile.id,
                        username: `${userDetail.firstName} ${userDetail.lastName}`,
                        email: profile.emails ? profile.emails[0].value : '',
                        userDetailId: userDetail
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
