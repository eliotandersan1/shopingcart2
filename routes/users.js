var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//routing for login Get
router.get('/login', function(req,res,next){

  res.render('login',{title:'Login'});

});

//routing sign up Get
router.get('/signup',function(req,res,next) {
    var messages = req.flash('error');
    res.render('register',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});

router.get('/profile', function(req,res,next){

    res.render('profile');

});
//sign up Post
// router.post('/signup', passport.authenticate('local.signup',{
//         successRedirect: '/',
//         failureRedirect: '/users/signup',
//         failureFlash: true
// })
// );
router.post('/signup',passport.authenticate('local.signup',{
    failureRedirect: '/users/signup',
    failureFlash: true
}), function (req, res, next) {
    if(req.session.oldUrl){
        var oldUrl =req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/users/login');
    }
});



//
//
// router.post('/signup', function (req, res) {
//  db
//      .User
//      .filter('it.email == email',{email:req.body.email})
//      .first(null, null, function (user) {
//          req.flash('error', 'a user with that email already exist');
//          res.redirect('/signup');
//      })
//      .fail(function () {
//          var user = new User()
//           user.email = req.body.email;
//          user.password = req.body.password;
//
//          db.User.add(user);
//          db.saveChanges(function () {
//
//              req.session.user = user;
//              res.redirect('/');
//
//          })
//      });
//
// })

module.exports = router;
