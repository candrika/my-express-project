require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt   = require('jsonwebtoken');
const model = require('../models');
const db = require('../models/index').sequelize;

module.exports={
    LoginUser(req,res){
        return model.user
        .findOne({
            where:{
                user_name: req.body.email,
                // password: bcrypt.hashSync(req.body.password, 8),
                deleted:0
            }
        }).then(user => {
            // console.log(user.dataValues)
            if (!user) {
                return res.status(404).json({
                    status: false,
                    msg:'Pengguna tidak ditemukan'
                })
            }

            if (user.length == 0) {
                return res.status(404).json({
                    status: false,
                    msg:'Pengguna tidak ditemukan atau belum terdaftar!'
                })
            }

            let passwordValid = bcrypt.compareSync(req.body.password, user.dataValues.password);
            // console.log(passwordValid);
            if (!passwordValid) {
                return res.status(400).json({
                    status: false,
                    password: req.body.password,
                    accessToken: null,
                    msg: 'Password yang anda masuk salah!',
                })
            }

            var token = 'Bearer ' + jwt.sign({
                id: user.id
            }, process.env.SECRET, {
                expiresIn: 86400
            });

            res.status(200).json({
                status: true,
                password: req.body.password,
                accessToken: token,
                msg:'Login berhasil',
            })

        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg: 'Terjadi kelasahan saat melakukan request',
                errors:error
            })
        })
    },
    RegistrationUser(req, res) {
        return db.transaction((t) => {
            return model.user
            .create({
                user_name: req.body.user_name,
                realname: req.body.body,
                password: bcrypt.hashSync(req.body.password, 8),
                createdAt: new Date(),
                deleted:0
            })
        }).then(() => {
            res.status(201).json({
                status: true,
                msg:'Data successfuly saving'
            })    
        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg:error
            })
        })
    },
    getUser(req, res) {
        console.log(req.UserId)
        return model.user
        .findOne({
            where: {
                id: req.UserId
            }
        }).then(user => {
            res.status(200).json({
                status: true,
                data:user
            })
        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg:error,
                data:null
            })
        });
    },
    
}