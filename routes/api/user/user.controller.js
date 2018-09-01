const models = require('../../../models')

exports.list = (req, res) => {
    console.log(' ')
    console.log(req.decoded)

    // refuse if not an admin
    if (req.decoded.security_level != '2') {
        return res.status(403).json({
            result: 'you are not an admin'
        })
    }

    // respond the token 
    const respond = (users) => {
        res.json({
            users
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    models.user.findAll({})
        .then(respond)
        .catch(onError)
}

exports.update = (req, res) => {
    const { email, password, security_level } = req.body;

    // refuse if not an admin
    if (req.decoded.security_level != '2') {
        return res.status(403).json({
            result: 'you are not an admin'
        })
    }

    const update = (user) => {
        if (!user) 
            return res.json({ result: 'DoesNotExist_Account' });
        
        models.user.update({
            password: password,
            security_level: security_level
        }, {
            where: {
                email: email
            }
        })
    }

    // respond the token 
    const respond = (user) => {
        res.json({
            result: 'isUpdated'
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            error: error.message
        })
    }

    // find the user
    models.user.findOne({ where: { email: email } })
        .then(update)
        .then(respond)
        .catch(onError)
}

exports.delete = (req, res) => {
    const { email } = req.body;

    // refuse if not an admin
    if (req.decoded.security_level != '2') {
        return res.status(403).json({
            result: 'you are not an admin'
        })
    }

    const destroy = (user) => {
        if (!user)
            return res.json({ result: 'DoesNotExist_Account' });

        models.user.destroy({
            where: {
                email: email
            }
        })
    }

    // respond the token 
    const respond = (user) => {
        res.json({
            result: 'isDeleted'
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            error: error.message
        })
    }

    // find the user
    models.user.findOne({ where: { email: email } })
        .then(destroy)
        .then(respond)
        .catch(onError)
}

exports.assignAdmin = (req, res) => {

    const email = req.params.email;

    // refuse if not an admin
    if (req.decoded.security_level != '2') {
        return res.status(403).json({
            result: 'you are not an admin'
        })
    }

    // respond the token 
    const assign = (user) => {
        models.user.update({
            security_level: '2'
        }, {
                where: {
                    email: email
                }
            })
    }

    // respond the token 
    const respond = (user) => {
        res.json({
            result: 'success'
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    models.user.findOne({ where: { email: email } })
        .then(assign)
        .then(respond)
        .catch(onError)

}