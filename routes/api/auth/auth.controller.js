const jwt = require('jsonwebtoken')
const models = require('../../../models');


exports.register = (req, res) => {

    const { email, password } = req.body;

    /* 
        클라이언트에서 암호화 된 값을 저장 
    */

    // 이미 회원가입이 됬는지 예외처리
    models.User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        console.log(user)
        if (user) {
            return res.json({ message: 'This email is already registered!' });
        } else {
            // 회원가입
            models.User.create({
                email: email,
                password: password
            }).then(newUser => {
                res.json(newUser);
            }).catch(err => {
                console.error(err);
            });
        }
    }).catch(err => {
        console.error(err);
    });
}

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/

exports.login = (req, res) => {
    const secret = req.app.get('jwt-secret')

    // 인증
    // 토큰생성
    // 리턴 

    models.User.findAll({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user[0].password == req.body.password) {
            res.json({
                result: user,
                token: 'token'
            });
        } else {
            console.log('not-matched!')
        }
    })
    .catch(err => {
        console.error(err);
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