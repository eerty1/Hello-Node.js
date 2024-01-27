require('dotenv').config();
const userTable = require("../models").user;
const passport = require("passport");
const crudService = require("../service/CrudService");
const JwtStrategy = require("passport-jwt").Strategy,
    extractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    crudService.findOneByUsername(jwtPayload.username, userTable)
        .then(user => {
            if (!user) return done(null, false);

            return done(null, user);
        })
        .catch(error => {
            return done(error, false);
        });
}));

exports.checkUserRole = (req, res, next) => {
    if (req.user.role === "ADMIN") {
        return next();
    } else {
        res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
};