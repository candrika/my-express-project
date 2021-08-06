const model = require('../models');
const db = model.sequelize;
const Op = require('../models/index').Sequelize;

module.exports = {

    // queryHelper:function(model,submodel,kolom_order,tipe_order){
    //     return model
    //     .findAll({
    //             include: [
    //                 {
    //                     model: submodel,
    //                     as: 'sub_model'
    //                 }
    //             ],
    //             order: [
    //                 [kolom_order, tipe_order]
    //             ]
    //         });
    // },
    CoaList(req, res){
        return model.akun
        .findAll({
            where: {
                id_header:0
            },
            include: [
                // {
                //     model: model.akun,
                //     as: 'akun_anak',
                //     // where: {
                //     //     id_header:1      
                //     // }
                // },
                {
                    model: model.tipe_akun,
                    as: 'tipe_akun'
                }
            ],
            order: [
                ['header_akun','ASC']
            ]
        }).then(akun_induk=>{
            // console.log(akun_induk);
            const data_akun = [];

            akun_induk.forEach((data, i) => {
                const akun_induk = data.dataValues;
                console.log(akun_induk);
                
               
            })
            
            // console.log(data_akun);
            
        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg:'Terjadi kesalahan saat melakukan request',
                errors:error
            })
        })
    },
    AddCoa(req, res) {
        /* 
        
        */
    },
    MarginSetting(req, res) {
        /* 
        
        */
    },
    MarginConfigGet(req, res) {
        /* 
        
        */
    },
    ResetData(req, res) {
        /* 
        
        */
    }
}