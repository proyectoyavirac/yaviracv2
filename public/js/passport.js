'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var local = {
    name: name,
    password: password
};

module.exports = function () {
    passport.use('local', new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
        function (name, password, done) {
            User.authenticate(name, password, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'Usuario Incorrecto' });
                }
                if (!user.checkPassword(password)) {
                    return done(null, false, { message: 'Contraseña Incorrecta' });
                }

                return done(null, user);
            });
        }
    ));
};


var UserDetail = new Schema({
    username: String,
    password: String
}, { collection: 'userInfo' });

var UserDetails = mongoose.model('userInfo', UserDetail);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


passport.use(new LocalStrategy(
    function (username, password, done) {

        process.nextTick(function () {
            UserDetails.findOne({ 'username': username },
                function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    if (user.password != password) { return done(null, false); }
                    return done(null, user);
                });
        });
    }
));



app.get('/auth', function (req, res, next) {
    res.sendfile('views/login.html');
});


app.get('/loginFailure', function (req, res, next) {
    res.send('Failure to authenticate');
});

app.get('/loginSuccess', function (req, res, next) {
    res.send('Successfully authenticated');
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure'
    }));


var loginRequired = ['$q', '$location', '$auth', function ($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
        deferred.resolve();
    } else {
        $location.path('/login');
    }
    return deferred.promise;
}];