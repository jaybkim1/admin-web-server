
const models = require('../../../models');

exports.list = (req, res) => {
    models.item.findAll({}).then(function (result) {
        res.json(result);
    })
    .catch(err => {
        console.error(err);
    });
}

exports.new = (req, res) => {
    models.item.create({
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
    models.item.update({
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
    models.item.destroy({
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
