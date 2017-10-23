var express = require('express'),
router = express.Router(),
passport = require('passport');
User = require('./models/user.js');


router.post('/register', function(req, res) {
console.log('hello from /register route', req.body.username);
User.register(new User({ username: req.body.username, nameuser: req.body.nameuser}), req.body.password, function(err, account) {
if (err) {
  console.log(err);
  return res.status(500).json({err: err})
}
passport.authenticate('local')(req, res, function () {
  return res.status(200).json({status: 'Registro Exitoso!'})
});
});
});

router.post('/login', function(req, res, next) {
passport.authenticate('local', function(err, user, info) {
if (err) { return next(err) }
if (!user) {
  return res.status(401).json({err: info})
}
req.logIn(user, function(err) {
  if (err) {
    return res.status(500).json({err: 'Could not log in user'})
  }
  res.status(200).json({status: 'Login exitoso!'})
});
})(req, res, next);
});

router.get('/logout', function(req, res) {
req.logout();
res.status(200).json({status: 'Bye!'})
});

module.exports = router;
