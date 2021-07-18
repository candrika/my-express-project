const model = require('../models');
const db = require('../models/index').sequelize;
// const op = 

module.exports = {
    inventoryList(req, res) {
        
        if (req.query.id) {
            return model.inventori
            .findOne({
                where: {
                    id: req.query.id
                }
            }).then(inventori => {
                let barang =  inventori.dataValues;
                return res.status(200).send({
                    status:true,
                    data: inventori
                })
            }).catch((error) => {
                res.status(500).json({
                    status: false,
                    msg: 'Data tidak dapat ditemukan',
                    errors:error
                })
            })  
        } else {    
            const page = req.query.page !=null ? req.query.page:0;
            const size = req.query.size !=null ? req.query.size:10;
            
            return model.inventori
            .findAndCountAll({
                limit: size,
                offset:page*size
            })
            .then(inventori =>
                    res.status(200).json({
                        status: true,
                        rows: inventori.lenght,
                        data: inventori
                    })
            ).catch(error => res.status(400).json({
                status: false,
                msg: 'data not founded',
                'errors': error
            }))
        }
    },
    inventoriCreate(req, res) {
        
        return db.transaction((t) => {
            return model.inventori
            .create({
                "nama_barang":req.body.nama_barang,
                "no_barcode":req.body.no_barcode,
                "no_sku":req.body.no_sku,
                "stock_tersedia":req.body.stock_tersedia,
                "di_beli":req.body.di_beli,
                "di_jual":req.body.di_jual,
                "harga_beli":req.body.harga_beli,
                "harga_jual":req.body.harga_jual,
            })
        })
        .then(() => {
            res.status(201).json({
                status:true,
                msg:'Data successfuly saving'
           })
        })
        .catch(error => {
            res.status(500).json({
                status:false,
                msg:error
            })
        })
    },
    inventoriUpdate(req, res) {
        return model.inventori
        .findOne({
            where: {
                id: req.query.id
            }
        }).then(inventori => {
            if (!inventori) {
                return res.status(400).json({
                    status: false,
                    msg: `Data dengan id ${req.query.id} tidak ditemukan`,
                    
                })
            }

            return db.transaction((t) => {
                return model.inventori
                .update({
                    "nama_barang":req.body.nama_barang || inventori.nama_barang,
                    "no_barcode":req.body.no_barcode || inventori.no_barcode,
                    "no_sku":req.body.no_sku || inventori.no_sku,
                    "stock_tersedia":req.body.stock_tersedia || inventori.stock_tersedia,
                    "di_beli":req.body.di_beli || inventori.di_beli,
                    "di_jual":req.body.di_jual || inventori.di_jual,
                    "harga_beli":req.body.harga_beli ||inventori.harga_beli,
                    "harga_jual":req.body.harga_jual || inventori.harga_jual, 
                },{
                    where: { id: req.query.id }
                }).then(() => {
                    res.status(200).json({
                        status: true,
                        msg:'Berhasil mengubah data'
                    })
                })
                .catch((error) => {
                    res.status(400).json({
                        status: false,
                        msg:'Gagal mengubah data'
                    })
                })
            })
        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg: 'Data errors',
                errors:error
            })
        })   
    },
    inventoriDelete(req, res) {
        
        return model.inventori
        .findByPk(req.params.id)
        .then(inventori => {
            if (!inventori) {
                return res.status(400).json({
                    status: false,
                    msg:'Data dengan id '+res.query.id+'tidak ditemukan'
                })
            }

            return model.inventori.destroy({
                where: {
                    id:req.params.id
                }
            }).then(() => {
                        res.status(204).json({
                            status: true,
                            msg:'Data berhasil di hapus'
                        })
            }).catch((error) => {
                res.status(500).json({
                    status: 'false',
                    msg: 'Gagal dalam menghapus data',
                    errors: error
                })
            })
        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg: 'Data errors',
                errors:error
            })
        })
    },
    InventoriKartuStok(req, res) {
        return model.kartustok
        .findAll({
                include: [{
                    model:model.inventori,
                    as:'inventori'
                
                }],
                order: [
                    ['createdAt','DESC']
                ]
        })
        .then(kartustok => {
            res.status(200).json({
                status: true,
                data:kartustok
            })
        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg: 'Data tidak ditemukan',
                errors:error
            })
        })
    }
}