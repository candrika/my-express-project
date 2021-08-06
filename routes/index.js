require('dotenv');
const express = require('express');
const router = express.Router();
const ContollerInventori = require('../controller').inventori;
const ContollerKontak = require('../controller').kontak;
const ControllerKasir = require('../controller').penjualan;
const ControllerUser = require('../controller').user;
const ControllerSetup = require('../controller').setup;
const helper = require('../middlerware');

router.get('/',(req,res)=>{
    res.render('welcome');
});


//endpoint untuk user
router.post('/user/login', ControllerUser.LoginUser);
router.post('/user/register', ControllerUser.RegistrationUser);
router.post('/user', [helper.TokenAuth],ControllerUser.getUser);

//endpoint untuk inventori
router.get('/inventori',  [helper.TokenAuth],ContollerInventori.inventoryList);
router.post('/inventori',  [helper.TokenAuth],ContollerInventori.inventoriCreate);
router.put('/inventori',  [helper.TokenAuth],ContollerInventori.inventoriUpdate);
router.delete('/inventori/:id',  [helper.TokenAuth],ContollerInventori.inventoriDelete);

//endpoint untuk tipe kontak
router.get('/kontak/tipe',  [helper.TokenAuth],ContollerKontak.contactTypeList);
router.post('/kontak/tipe',  [helper.TokenAuth],ContollerKontak.contactTypeCreate);
router.put('/kontak/tipe',  [helper.TokenAuth],ContollerKontak.contactTypeUpdate);
router.delete('/kontak/tipe/:tipe_kontak_id', ContollerKontak.contactTypeDelete);

//endpoint untuk kontak
router.get('/kontak',  [helper.TokenAuth],ContollerKontak.contactList);
router.post('/kontak',  [helper.TokenAuth],ContollerKontak.contactCreate);
router.put('/kontak',  [helper.TokenAuth],ContollerKontak.contactUpdate);
router.delete('/kontak/:id',  [helper.TokenAuth],ContollerKontak.contactDelete);

//endpoint untuk kartu stok
router.get('/kartu/stok', [helper.TokenAuth], ContollerInventori.InventoriKartuStok);

//endpoint untuk penjualan/kasir
router.get('/kasir/produk',  [helper.TokenAuth], ControllerKasir.ProductSaleLists);
router.get('/kasir/data',  [helper.TokenAuth], ControllerKasir.SalesLists);
router.get('/kasir/item/data',  [helper.TokenAuth], ControllerKasir.SalesItemList);
router.post('/kasir/transaksi',  [helper.TokenAuth], ControllerKasir.InputSalesTransaction);

//endpoint untuk setup sistem
router.get('/akun',[helper.TokenAuth],ControllerSetup.CoaList);
module.exports = router;