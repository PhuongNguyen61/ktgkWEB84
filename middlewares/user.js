import { globalCacheApiKey } from "../data.js"

const userMiddleware = {
    register: (req, res, next) => {
        try {
            const { userName, email, password } = req.body
            if (!userName) throw new Error('UserName is missing!')
            if (!email) throw new Error('Email is missing!')
            if (!password) throw new Error('Password is missing!')
            return next()
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    },
    checkAuth: (req, res, next) => {
        try {
            const { apiKey } = req.query
            if (!apiKey) throw new Error("UNAUTHORIZED!")
            const [_, id, __, email, ___, randomString] = String(apiKey).split("$")
            if (globalCacheApiKey[`${id}/${email}`] !== randomString) throw new Error("UNAUTHORIZED!")
            req.user = {
                id,
                email,
            }
            return next()
        } catch (error) {
            res.status(401).send({
                message: error.message,
            })
        }
    }
}

export default userMiddleware
