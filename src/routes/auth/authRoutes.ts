import { Router } from 'express';
import passport from 'passport';
import { createToken } from '../../services/createToken';

const router = Router();

const base = '/auth'

router.get(`${base}/google`, passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get(`${base}/google/callback`,
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        if (req.user) {
            return res.status(200).send({
                user: req.user,
                token: createToken(req)
            });
        }
        return res.status(401).send('You must log in');
    });

export default router;
