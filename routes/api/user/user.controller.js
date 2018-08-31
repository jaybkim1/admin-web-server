const models = require('../../../models')

/* 
    GET /api/user/list
*/

// 관리자 계정으로 모든 유저 리스팅
exports.list = (req, res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            result: 'you are not an admin'
        })
    }

    models.User.find({}, '-password').exec()
    .then(
        users=> {
            res.json({users})
        }
    )
}


/*
    POST /api/user/assign-admin/:username
*/

// 관리자 계정으로 특정 유저 관리자권한 부여
exports.assignAdmin = (req, res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    models.User.findOneByUsername(req.params.username)
    .then(
        user => {
            if(!user) throw new Error('user not found')
            user.assignAdmin()
        }
    ).then(
        res.json({
            success: true
        })
    ).catch(
        (err) => { res.status(404).json({message: err.message})}
    )
}