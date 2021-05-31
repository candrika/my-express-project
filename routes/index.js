require('dotenv');
const express = require('express');
const router  = express.Router();
const jwt   = require('jsonwebtoken');

const passport         = require('passport');
const GoogleStrategy   = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.CLIENTID;
const GOOGLE_SECRET_ID = process.env.CLIENTSECRETID;

const UserController   = require('../controller/User');
// const User  = require('../models').User;
// const bcrypt= require('bcryptjs');
// const jwt   = require('jsonwebtoken');

var userProfile;

passport.initialize();

passport.serializeUser((user,cb)=>{
    cb(null,user);
})

passport.deserializeUser((user,cb)=>{
    cb(null,user);
})

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_SECRET_ID,
    callbackURL:'http://localhost:3000/auth/google/callback' 
},
(accessToken, refreshToken, profile, done)=>{
    // console.log(accessToken);
    // console.log(refreshToken);
    console.log(profile)
}
));

router.post('/success',UserController.LoginSuccess);

router.get('/',(req,res)=>{
    res.render('welcome');
});

router.get('/auth/google',
    passport.authenticate('google',{scope:['profile','email']})
);

router.get('/auth/google/callback',
    passport.authenticate('google'),
    (req,res)=>{
       console.log(req.body)
    }
);

router.get('/error',(req,res)=>{
    console.log(req.body);
})

module.exports = router;