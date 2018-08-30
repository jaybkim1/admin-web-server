
const db = require('../../../models');

/* 
    GET /api/item
*/

exports.all = (req, res) => {
    db.Item.findAll({}).then(function (result) {
        res.json(result);
    })
    .catch(err => {
        console.error({
            error: err
        });
    });
}


/*
    POST /api/item
*/

exports.new = (req, res) => {
    db.Item.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }).then(function (result) {
        res.json(result);
    })
    .catch(err => {
        console.error(err);
    });
}

exports.update = (req, res) => {
    db.Item.update({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.json(result);
    })
    .catch(err => {
        console.error(err);
    });
}

exports.delete = (req, res) => {
    db.Item.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.json(result);
    })
    .catch(err => {
        console.error(err);
    });
}
