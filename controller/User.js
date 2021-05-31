const User  = require('../models').User;
const bcrypt= require('bcryptjs');
const jwt   = require('jsonwebtoken');

module.exports={
    LoginSuccess(req,res){
        console.log(req.body);
        // return User
    }
}