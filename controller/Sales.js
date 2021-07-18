const model = require('../models');
const db = require('../models/index').sequelize;
const Op = db.Op;
const helper = require('../middlerware').Helper;

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
        // ?start_date=2021-06-01&start_end=2021-06-30
        if (req.query.start_date != null && req.query.end_date) {
            console.log(req.query.start_date);
            console.log(req.query.end_date);
            return model.penjualan
            .findAll({
                where: {
                    createdAt: {
                       "$between":[req.query.start_date+'T00:00:00.000Z',req.query.end_date+'T23:59:59.007Z']
                    }
                }
            })
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
        } else {
        //     date_filter = {where:TRUE}};
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
        }
        
    },
    SalesItemList(req, res) {
       
        return model.item_penjualan
        .findAll({
            include: [{
                model: model.inventori,
                as:'inventori'
            }],
            where: {
                id_penjualan: req.query.id_penjualan,
                // date_filter
                
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
    },
    InputSalesTransaction(req, res) {
        // console.log(req.body);
        let date = new Date();
        let months = date.getMonth();
        let year = date.getFullYear();
        
        // if()

        let items = JSON.parse(req.body.salesitem);

        return db.transaction((t) => {     
            return model.penjualan
            .create({
                'kode_penjualan':'SO'+months+year+Math.floor((Math.random() * 100) + 1),
                'kode_invoice': null,
                'sub_total':req.body.subtotal,
                'total':req.body.total,
                'diskon':req.body.diskon,
                'pajak':req.body.pajak,
                'createdAt':date,
                'updatedAt':null,
                'total_bayar':req.body.totalbayar,
                'kembalian':req.body.kembalian
            }).then((sales) => {
                
                items.forEach(element => {
                    return model.item_penjualan
                    .create({
                        'id_penjualan':sales.dataValues.id,
                        'produk_id':element.id,
                        'qty_penjualan':element.qty,
                        'harga': element.harga,
                        'createdAt':date
                    }).then(() => {
                        return model.inventori
                        .findOne({
                            where: {
                                id:element.id
                            }
                        }).then(produk => {
                            let qty_akhir = produk.dataValues.stok_tersedia - element.qty;
                            console.log(produk.dataValues.stock_tersedia-element.qty);
                            return model.kartustok
                            .create({
                                'product_id': element.id,
                                'user_id': 1,
                                'tipe_transaksi': 1,
                                'qty_awal': produk.dataValues.stok_tersedia,
                                'qty_transaksi': element.qty,
                                'qty_akhir':produk.dataValues.stock_tersedia-element.qty
                            }).then(() => {
                                return model.inventori
                                .update({
                                    'stock_tersedia':produk.dataValues.stock_tersedia-element.qty
                                    }, {
                                        where: {
                                        id:element.id
                                    }
                                }).then((inventory) => {
                                    console.log(inventory)
                                    return true;
                                }).catch((error) => {
                                    console.log(error);
                                    return false;
                                })
                            }).catch((error)=>{
                                console.log(error);
                                return false;
                            });
                        }).catch((error) => {
                            console.log(error)
                            return false;
                        })
                    }).catch((error) => {
                        return false;
                    })
                });
            })    
        }).then(() => {
            res.status(201).json({
                status: true,
                msg:'Data successfuly saving'
            })
        }).catch((error)=>{
            res.status(500).json({
                status:false,
                msg:error
            })
        })
    }
}