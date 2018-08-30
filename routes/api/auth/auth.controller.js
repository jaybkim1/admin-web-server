const jwt = require('jsonwebtoken')
const models = require('../../../models');


exports.register = (req, res) => {

    const { email, password } = req.body;

    /* 
       Client side - encrypt password using bCrypt 
    */

    const create = (user) => {
        // Check if email exists
        if (user) {
            return res.json({ result: 'Duplicate_Account' });
        } else {
            // Register an account
            return models.User.create({
                email: email,
                password: password
            })
        }
    }

    // Respond to the client
    const respond = (newUser) => {
        res.json(newUser)
    }

    // Run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // 실행
    models.User.findOne({ where: { email: email } })
    .then(create)
    .then(respond)
    .catch(onError)
}

exports.login = (req, res) => {
    
    const { email, password } = req.body;
    const secret = req.app.get('jwt-secret')

    // 인증
    // 토큰생성
    // 리턴 

    models.User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        // check if user exists
        if (user) {
            // check the password
            if(user.validate(password)){
                //create a promise that generates jwt asynchronously
                const result = async (req, res) => {
                    await jwt.sign({
                        id: user.id,
                        email: user.email,
                        password: user.password
                    },
                    secret, {
                        expiresIn: '7d',
                        issuer: 'jaybdev.net',
                        subject: 'userInfo'
                    }, (err, token) => {
                        if (err) reject(err)
                        resolve(token)
                    })
                }

                console.log(' ')
                console.log(' ')
                console.log(' ')

                // const p = new Promise((resolve, reject) => {
                //     jwt.sign({
                //         id: user.id,
                //         email: user.email,
                //         password: user.password
                //     }, 
                //     secret, {
                //         expiresIn: '7d',
                //         issuer: 'jaybdev.net',
                //         subject: 'userInfo'
                //     }, (err, token) => {
                //         if (err) reject(err)
                //         resolve(token) 
                //     })
                // })
                // console.log("p > > > "+p)
                // return p;

                // return res.json({
                //     id: user.id,
                //     email: user.email,
                //     token: result() // 비동기방식으로 돌려야 하나?
                // });
            } else {
                return res.json({ result: 'NotMatched' });
            }
        } else {
            return res.json({ result: 'DoesNotExist_Account' });
        }
    })
    .catch(err => {
        console.error({
            error: err
        });
    });

    // check the user info & generate the jwt
    // const check = (user) => {
    //     if(!user) {
    //         // user does not exist
    //         throw new Error('login failed')
    //     } else {
    //         // user exists, check the password
    //         if(user.verify(password)) {
    //             // create a promise that generates jwt asynchronously
    //             const p = new Promise((resolve, reject) => {
    //                 jwt.sign(
    //                     {
    //                         _id: user._id,
    //                         username: user.username,
    //                         admin: user.admin
    //                     }, 
    //                     secret, 
    //                     {
    //                         expiresIn: '7d',
    //                         issuer: 'velopert.com',
    //                         subject: 'userInfo'
    //                     }, (err, token) => {
    //                         if (err) reject(err)
    //                         resolve(token) 
    //                     })
    //             })
    //             return p
    //         } else {
    //             throw new Error('login failed')
    //         }
    //     }
    // }

    // // respond the token 
    // const respond = (token) => {
    //     res.json({
    //         message: 'logged in successfully',
    //         token
    //     })
    // }

    // // error occured
    // const onError = (error) => {
    //     res.status(403).json({
    //         message: error.message
    //     })
    // }

    // // find the user
    // db.user.findOneByUsername(username)
    // .then(check)
    // .then(respond)
    // .catch(onError)

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