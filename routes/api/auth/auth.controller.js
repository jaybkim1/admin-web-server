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
            return models.user.create({
                email: email,
                password: password
            })
        }
    }

    // respond to the client
    const respond = (user) => {
        res.json({
            id: user.id,
            email: user.email,
            security_level: user.security_level
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // if not using Promise, there will be nested complicated structure
    models.user.findOne({ where: { email: email } })
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
                        security_level: user.security_level
                    }, config.secret.key ,{
                        issuer: 'admin.thejayb.net',
                        expiresIn: '1d', // 10s, 5m, 1h, 1d ...
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
    models.user.findOne({ where: { email: email } })
        .then(authenticate)
        .then(respond)
        .catch(onError)

}

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}

// 직원계정 관리 (list API 만든 후 다 뿌려주고 수정, 삭제, 보안 레벨 변경) (보안 레벨 등록 - 드롭다운으로 선택할 수 있게 구현) - 슈퍼권한, 일반, 연구원
