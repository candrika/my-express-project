require('dotenv');
const express = require('express');
const router = express.Router();
const ContollerInventori = require('../controller').inventori;
const ContollerKontak = require('../controller').kontak;
const ControllerKasir = require('../controller').penjualan;

/* const passport         = require('passport');
const GoogleStrategy   = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.CLIENTID;
const GOOGLE_SECRET_ID = process.env.CLIENTSECRETID;

const User  = require('../models').User;
const jwt   = require('jsonwebtoken');

// const bcrypt= require('bcryptjs');

var userProfile;
// passport.initialize();

passport.serializeUser((user,cb, done)=>{
    done(null, user.googleId || user.id);
})

passport.deserializeUser((user,cb, done)=>{
    done(null,user);
})

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_SECRET_ID,
    callbackURL:'http://localhost:3000/auth/google/callback' 
},
(accessToken, refreshToken, profile, done)=>{
    // console.log(profile);
   
    let email = profile._json.email;
    var datetime = new Date();
        
    let year  = datetime.getFullYear();
    let month = datetime.getMonth();
    let date  = datetime.getDate();

    if(month < 9){
        month = "0"+month;
    }
        
    return User
    .findOne({
        where:{user_name:email}
    }).then(user=>{
        if(!user){
            // return user.create({
            //     id:1,
            //     user_name:'ekacandrika@gmail.com',
            //     password:'password',
            //     // createdAt:`${year}-${month}-${date}`,
            //     // updatedAt:`${year}-${month}-${date}`,
            // }).then((user)=>{
                done(null,'hello word');
            // })
            
            }else{
                done(null,user);
            }
    }).catch((error)=>{
           done(null, error);
    })
    
}
));

router.get('/success',(req, res)=>{
    console.log(req.body)
    res.status(200).send({
        status:true,
        message:'Login berhasil'
    });
}); */

router.get('/',(req,res)=>{
    res.render('welcome');
});

/* router.get('/auth/google',
    passport.authenticate('google',{scope:['profile','email']})
);

router.get('/auth/google/callback',
    passport.authenticate('google',async(req, res)=>{
        return req.user;
    })
);

router.get('/error',(req, res)=>{
    console.log(req)
    res.status(400).send({
        status:false,
        message:'Login gagal',
        // errorr:err
    });
}) */

//endpoint untuk inventori
router.get('/inventori', ContollerInventori.inventoryList);
router.post('/inventori', ContollerInventori.inventoriCreate);
router.put('/inventori', ContollerInventori.inventoriUpdate);
router.delete('/inventori/:id', ContollerInventori.inventoriDelete);

//endpoint untuk tipe kontak
router.get('/kontak/tipe', ContollerKontak.contactTypeList);
router.post('/kontak/tipe', ContollerKontak.contactTypeCreate);
router.put('/kontak/tipe', ContollerKontak.contactTypeUpdate);
router.delete('/kontak/tipe/:tipe_kontak_id', ContollerKontak.contactTypeDelete);

//endpoint untuk kontak
router.get('/kontak', ContollerKontak.contactList);
router.post('/kontak', ContollerKontak.contactCreate);
router.put('/kontak', ContollerKontak.contactUpdate);
router.delete('/kontak/:id', ContollerKontak.contactDelete);

//endpoint untuk kartu stok
router.get('/kartu/stok', ContollerInventori.InventoriKartuStok);

//endpoint untuk penjualan/kasir
router.get('/kasir/produk', ControllerKasir.ProductSaleLists);
router.get('/kasir/data', ControllerKasir.SalesLists);
router.get('/kasir/item/data', ControllerKasir.SalesItemList);
module.exports = router;