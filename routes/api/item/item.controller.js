
const db = require('../../../models');

/* 
    GET /api/item
*/

exports.all = (req, res) => {
    console.log('Hello List')
    db.Item.findAll({}).then(function (result) {
        res.json(result);
    });
}


/*
    POST /api/item
*/

exports.new = (req, res) => {
    db.item.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }).then(function (result) {
        res.json(result);
    });
}

exports.update = (req, res) => {
    db.item.update({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.json(result);
    });
}

exports.delete = (req, res) => {
    db.item.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.json(result);
    });
}
