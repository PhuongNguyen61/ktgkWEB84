import bcrypt from 'bcrypt'
import crypto from 'crypto'
import UserModel from "../models/user.js"
import { globalCacheApiKey } from '../data.js'

const userController =  {
    register: async (req, res) => {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10)
            const user = await UserModel.create({
                ...req.body,
                password: hashedPassword
            })
            res.status(201).send({
                message: 'Successful!',
                data: user
            })
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await UserModel.findOne({email})
            if (!user) throw new Error('Email or password is invalid!')
            const comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) throw new Error('Email or password is invalid!')
            const randomString = crypto.randomUUID()
            const apiKey = `mern-$${user.id}$-$${user.email}$-$${randomString}$`
            globalCacheApiKey[`${user._id}/${user.email}`] = randomString
            console.log(user.id)
            console.log(user._id)
            console.log(globalCacheApiKey)
            res.status(200).send({
                message: 'Successful!',
                data: apiKey
            })
        } catch (error) {
            res.status(401).send({
                message: error.message
            })
        }
    }
}

export default userController