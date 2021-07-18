const model = require('../models/index');
const db = model.sequelize;
const Op = db.Op;
const validate = require('validator');
const { sequelize } = require('../models/index');

const noDocuments = (params,models) => {
    
    let nexval = 0;
    let date = new Date();
    let months = date.getMonth();
    let year = date.getFullYear();
    let prefix = params + months + year;
    
    
}

const getPrimaryId = async (kolom,table) => {
    /* 
        select max(id) as id from schema table 
    */
    // console.log(table);
    await model.penjualan
    .findAll({
        attributes: [
            sequelize.fn('MAX',sequelize.col('id'))
        ]
    }).then((result) => {
        return result;
    }).catch((error) => {
        console.log(error)
    })
}

module.exports = {
    noDocuments,getPrimaryId
}