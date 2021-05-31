require('dotenv').config();
const  jwt    = require('jsonwebtoken');
const  bcrypt = require('bcryptjs');
const Users   = require('../models').users;

const  secret = process.env.SECRET;

module.exports={
    CheckToken(req, res, next){
        let token = req.headers['x-token'];

        if(token.split(' ')[0] !== 'bearer'){
            return res.status(400).send({
                status:false,
                message:"Error",
                errors:"Invalid token format"
            });
        }

        Jwt = token.split(' ')[1];

        if(!jwt){
            return res.status(403).send({
                status:false,
                message:"Error",
                errors:"Token not provided"
            });
        }

        jwt.verify(Jwt,secret,(err, decode)=>{
            if(err){
                return res.status(500).send({
                    status:false,
                    message:"Error",
                    errors:err 
                })
            }

            req.UserId = decode.id;

            next();
        })
    },
}