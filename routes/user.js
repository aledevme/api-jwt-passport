const app = require('express')
const User = require('../models/user')
const router = app.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const middleware = require('../middlewares/jwt')
const passport = require('../auth/auth');


router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
        });
    }
);

router.post(
'/login',
async (req, res, next) => {
    passport.authenticate(
    'login',
    async (err, user, info) => {
        try {
        if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
        }

        req.login(
            user,
            { session: false },
            async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, '1234567$.');

            return res.json({ token });
            }
        );
        } catch (error) {
        return next(error);
        }
    }
    )(req, res, next);
}
);

module.exports = router