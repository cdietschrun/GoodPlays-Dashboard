// var express = require('express');
// var express = require('express');
// var passport = require('passport');
// var LocalStrategy = require('passport-local');
// var router = express.Router();

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   // This one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//   if (username === 'a' && password === 'c') {
//     return cb(null, { id: 1, username: 'a' });
//   }
//   return cb(null, false, { message: 'Incorrect email or password.' });
// }));

// router.post('/login/password', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureMessage: true
//   }));

// module.exports = router;