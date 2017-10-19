var User = require('./models/user.js');
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/register', function (req, res) {
    User.register(new User({ username: req.body.username, email: req.body.email }),
        req.body.password, function (err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    status: 'Registro Exitoso!'
                });
            });
        });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Adios!'
    });
});

router.get('/status', function (req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'No se pudo iniciar sesión'
                });
            }
            res.status(200).json({
                status: 'Login exitoso!'
            });
        });
    })(req, res, next);
});

module.exports = router;
