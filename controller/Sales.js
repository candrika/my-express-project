const model = require('../models');
const db = model.sequelize;
const Op = db.Op;

module.exports = {
    ProductSaleLists(req, res) {
        return model.inventori
        .findAll({
            where: {
                di_jual:1
            }
        }).then(salesProduct => {
            res.status(200).json({
                status: true,
                data: salesProduct
            });
        }).catch((error) => {
            res.status(404).json({
                status: false,
                msg: 'Data tidak ditemukan',
                errors:error
            })
        })
    },
    SalesLists(req, res) {
        return model.penjualan
        .findAll()
        .then(penjualan => {
            res.status(200).json({
                status: true,
                data:penjualan
            
            })
        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg: 'Data tidak ditemukan',
                errors: error
            })
        })
    },
    SalesItemList(req, res) {
        return model.item_penjualan
        .findAll({
            include: [{
                model: model.inventori,
                as:'inventori'
            }],
            where: {
                id_penjualan:req.query.id_penjualan
            }
        }).then(item_penjualan => {
            if (!item_penjualan) {
                return res.status(404).json({
                    status: false,
                    msg:'Id penjualan yang anda inputkan salah'
                })
            }

            return res.status(200).json({
                status: true,
                msg: 'Data berhasil ditemukan',
                data: item_penjualan
            });
        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg:'Terjadi kesalahan saat melakukan request'
            })
        })
    }
}