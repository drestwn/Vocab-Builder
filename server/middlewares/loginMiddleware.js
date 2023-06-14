
const { verifyToken } = require("../helpers/jwt")
const { User, Log } = require("../models/index")

async function loggedAuth(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { name: "INVALID_TOKEN" }
        }
        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: "unauthorized" }
        }

        req.idRole = { id: user.id, nickname: user.nickname, email: user.email }

        next()
    } catch (err) {
        next(err)
    }
}

async function adminAuth(req, res, next) {
    try {
        // const { access_token } = req.headers
        // const payload = verifyToken(access_token)
        // const user = await User.findByPk(payload.id)
        const { id, role } = req.idRole
        const detailPost = await Post.findByPk(req.params.id)

        if (role.toLowerCase() !== 'admin') {
            if (detailPost.authorId === id) {
                return next()
            } else {
                throw {
                    name: "NOT_ENOUGH_ACCESS"
                }
            }
        }
        next()
    } catch (err) {
        next(err)
    }
}

async function loginCustomer(req, res, next) {
    console.log('tes')
    try {
        const { access_token } = req.headers
        console.log(req.headers, 'ini headers 52')
        if (!access_token) {
            throw { name: "INVALID_TOKEN" }
        }
        const payload = verifyToken(access_token)
        // console.log(payload, 'line 57')
        const user = await Customer.findOne({
            where: { email: payload.email }
        })
        // console.log(user, 'line 61')

        if (!user) {
            throw { name: "unauthorized" }
        }
        // console.log('66')

        req.idRole = { id: user.id, email: user.email, role: user.role }
        // console.log(idRole, 'line 68middleware')

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { loggedAuth, adminAuth, loginCustomer }