const model = require('../models');
const db = require('../models/index').sequelize;

module.exports = {
    //contact type
    contactTypeList(req, res) {
        if (req.query.tipe_kontak_id) {
            return model.tipe_kontak
                .findOne({
                    where: {
                        id: req.query.tipe_kontak_id
                    }
                }).then(tipe_kontak => {
                    if (!tipe_kontak) {
                        return res.status(404).json({
                            status: false,
                            msg: 'Data tipe kontak tidak ditemukan'
                        });
                    }
                
                    let tipe_kontak_list = tipe_kontak.dataValues;
                    return res.status(200).json({
                        status: true,
                        data: tipe_kontak_list
                    });

                }).catch((error) => {
                    res.status(500).json({
                        status: false,
                        msg: 'Terjadi kesalahan dalam request',
                        errors: error
                    })
                });
        } else {
            return model.tipe_kontak
            .findAll()
            .then(tipe_kontak => {
                    res.status(200).json({
                        status: true,
                        data:tipe_kontak
                })
            }).catch(error => {
                res.status(500).json({
                    status: false,
                    msg: 'Terjadi kesalahan dalam request',
                    errors:error
                })
            })
        }
    },
    contactTypeCreate(req, res) {
        return db.transaction((t) => {
            return model.tipe_kontak
                .create({
                    "jenis_kontak": req.body.jenis_kontak,
                    "createdAt":new Date()
            })
        }).then(() => {
            res.status(200).json({
                status: true,
                msg:'Data berhasil disimpan'
            })
        }).catch((error) => {
            res.status(500).json({
                status: 500,
                msg: 'Terjadi kesalahan dalam request',
                errors:error
            })
        })
    },
    contactTypeUpdate(req, res) {
        return model.tipe_kontak
            .findOne({
                where: {
                id:req.query.tipe_kontak_id
            }
            }).then(tipe_kontak => {
                if (!tipe_kontak) {
                    return res.status(404).json({
                        status: false,
                        msg: 'Data tidak ditemukan'
                    })
                }
                // console.log(tipe_kontak.dataValues)
                return db.transaction((t) => {
                    return model.tipe_kontak
                    .update({
                        "jenis_kontak": req.body.jenis_kontak || tipe_kontak.jenis_kontak,
                        "updatedAt":new Date()
                    }, {
                        where: {
                            id:req.query.tipe_kontak_id
                        }
                    })
                }).then(() => {
                    res.status(200).json({
                        status: true,
                        msg:'Berhasil mengubah data'
                    })
                }).catch((error) => {
                    res.status(400).json({
                        status:false,
                        msg: 'Gagal mengubah data',
                        errors:error
                    })
                })
            }).catch((error) => {
                res.status(500).json({
                    status: false,
                    msg: 'Terjadi kesalahan dalam request',
                    errors:error
                })
            })
    },
    contactTypeDelete(req, res) {
        return model.tipe_kontak
        .findByPk(req.params.tipe_kontak_id)
        .then(tipe_kontak => {
                if (!tipe_kontak) {
                    return res.status(404).json({
                        status: false,
                        msg:'Data tidak ditemukan'
                    })
                }

                return model.tipe_kontak
                .destroy({
                    where: {
                        id:req.params.tipe_kontak_id
                    }
                }).then(() => {
                    res.status(204).json({
                        status: true,
                        msg:'Data berhasil dihapus'
                    })
                }).catch((error) => {
                        res.status(400).json({
                            status: false,
                            msg:'Gagal dalam menghapus data',
                            errors:error
                        })
                    })
        }).catch((error)=>{
            res.status(500).json({
                status: false,
                msg: 'Data errors',
                errors:error
            })
        })
    },
    
    //data contact
    contactList(req, res) {
        if (req.query.id) {
            return model.kontak
            .findOne({
                include: [{
                    model:model.tipe_kontak,
                    as:'tipe_kontak'
                }],
                where: {
                    id:req.query.id
                }
            }).then(kontak => {
                return res.status(200).json({
                    status: true,
                    data: kontak
                });
            }).catch((error) => {
                res.status(500).json({
                    status: false,
                    msg: 'Data tidak dapat ditemukan',
                    errors: error
                });
            })
        } else {
            return model.kontak
            .findAll({
                include: [{
                    model:model.tipe_kontak,
                    as:'tipe_kontak'
                }],
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(kontak => {
                return res.status(200).json({
                    status: true,
                    data: kontak
                })
            }).catch((error) => {
                res.status(500).json({
                    status: false,
                    msg: 'Data tidak dapat ditemukan'
                })
            });
        }
    },
    contactCreate(req, res) {
        //get tipe kontak
        return model.tipe_kontak
        .findByPk(req.body.id_tipe_kontak)
        .then(tipe_kontak => {
            
            if (!tipe_kontak) {
                return res.status(404).json({
                    status: false,
                    msg: 'Id tipe kontak yang anda masukan salah'
                });
            }    
            
            return db.transaction((t) => {
                return model.kontak
                    .create({
                        "nama_kontak": req.body.nama_kontak,
                        "no_hp": req.body.no_hp,
                        "alamat": req.body.alamat,
                        "email": req.body.email,
                        "id_tipe_kontak": req.body.id_tipe_kontak
                    });
            }).then(() => {
                res.status(201).json({
                    status: true,
                    msg: "Data berhasil disimpan"
                });
            }).catch((error) => {
                res.status(500).json({
                    status: false,
                    msg: 'Terjadi kesalahan dalam request',
                })
            });
        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg: 'Terjadi kesalahan dalam request',
                errors:error
            })
        })
    },
    contactUpdate(req, res) {
        return model.kontak
        .findOne({
            where: {
                id:req.query.id
            }
        }).then(kontak => {
            if (!kontak) {
                return res.status(404).json({
                    status: false,
                    msg:'Data tidak ditemukan'
                })
            }

            if (req.body.id_tipe_kontak != kontak.id_tipe_kontak) {
                    let tipe_kontak = model.tipe_kontak.findByPk(req.body.id_tipe_kontak);
                    tipe_kontak.then(tipe_kontak => {
                        console.log(tipe_kontak)
                        if (!tipe_kontak) {
                            return res.status(404).json({
                                status: false,
                                msg:'tipe kontak yang anda pilih tidak ditemukan'
                            })
                        }
                    }).catch((error) => {
                        res.status(500).json({
                            status: false,
                            msg: 'Data tidak berhasil diubah',
                            errors:error
                        });
                    })

            }
            
            return db.transaction((t) => {
                return model.kontak
                .update({
                    "nama_kontak": req.body.nama_kontak || kontak.nama_kontak,
                    "no_hp": req.body.no_hp || kontak.no_hp,
                    "alamat": req.body.alamat || kontak.alamat,
                    "email": req.body.email || kontak.email,
                    "id_tipe_kontak": req.body.id_tipe_kontak || kontak.id_tipe_kontak
                }, {
                    where:{
                        id:req.query.id
                    }
                });
            }).then(() => {
                    res.status(200).json({
                        status: true,
                        msg: 'Data berhasil diubah'
                    });
            }).catch((error) => {
                    res.status(500).json({
                        status: false,
                        msg: 'Data tidak berhasil diubah',
                        errors:error
                    });
            })

        }).catch((error) => {
            res.status(500).json({
                status: false,
                msg: 'Terjadi kesalahan dalam request',
                errors:error
            });
        })
    },
    contactDelete(req, res) {
        return model.kontak
        .findByPk(req.params.id)
        .then(kontak => {
            if (!kontak) {
                return res.status(404).json({
                    status: false,
                    msg:'Data tidak ditemukan'
                })
            }

            return model.kontak
            .destroy({ where: { id: req.params.id } })
            .then(() => {
                res.status(204).json({
                    status: true,
                    msg:'Data berhasil dihapus'
                })
            }).catch((error)=>{
                res.status(204).json({
                    status: false,
                    msg: 'Data gagal dihapus',
                    errors:error
                })
            })
        }).catch((error) => {
            res.status(204).json({
                status: false,
                msg: 'Terjadi kesalahan dalam request',
                errors:error
            })
        })
    }
}