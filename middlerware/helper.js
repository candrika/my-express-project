//init library
const model = require('../models/index');
const db = model.sequelize;
const Op = db.Op;
const validate = require('validator');
const { sequelize } = require('../models/index');
const xlxs = require('xlsx');
const path = require('path');
//start code here...
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

const xlsxGen = (data,sheet_name,column_name,file_path) => {
    let wb = new xlxs.utils.book_new();

    const workSheetData = [
        column_name,
        ...data,
    ];

    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlxs.utils.book_append_sheet(wb, workSheet, sheet_name);
    xlsx.writeFile(wb, path(file_path));
}


module.exports = {
    noDocuments,
    getPrimaryId,
    xlsxGen
}