const jwt = require('jsonwebtoken')
const models = require('../../../models');
const config = require('../../../config')

exports.register = (req, res) => {

    /* 
       Client side - encrypt password using bCrypt 
    */
    const { email, password } = req.body;

    const create = (user) => {
        // check if email exists
        if (user) {
            return res.json({ result: 'Duplicate_Account' });
        } else {
            // register an account
            return models.User.create({
                email: email,
                password: password
            })
        }
    }

    // respond to the client
    const respond = (newUser) => {
        res.json(newUser)
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // if not using Promise, there will be nested complicated structure
    models.User.findOne({ where: { email: email } })
    .then(create)
    .then(respond)
    .catch(onError)
}

exports.login = (req, res) => {

    const { email, password } = req.body;

    // check the user info & generate the jwt
    const authenticate = (user) => {
        // check if user exists
        if (user) {
            // check the password
            if (user.validate(password)) {
                // create a promise that generates jwt asynchronously
                const token = new Promise((resolve, reject) => {
                    jwt.sign({
                        id: user.id,
                        email: user.email,
                        admin: true
                    }, config.secret.key ,{
                        expiresIn: '1h', // 60, 2 days, 10h, 7d
                        issuer: 'thejayb.net',
                        subject: 'userInfo'
                    }, (err, token) => {
                        if (err) reject(err)
                        resolve(token)
                    })
                })
                return token
            } else {
                return res.json({ result: 'NotMatched' });
            }
        } else {
            return res.json({ result: 'DoesNotExist_Account' });
        }
    }

    // respond the token 
    const respond = (token) => {
        res.json({
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    models.User.findOne({ where: { email: email } })
        .then(authenticate)
        .then(respond)
        .catch(onError)

}

exports.test = (req, res) => {
    const { token } = req.body;

    // verify token with secret
    jwt.verify(token, config.secret.key, function (err, decoded) {
        console.log(decoded);
        res.json(decoded)
    });
}

/*
    GET /api/auth/check
*/

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}