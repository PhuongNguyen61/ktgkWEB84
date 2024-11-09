import { Router } from "express"
import userController from "../controllers/user.js"
import userMiddleware from "../middlewares/user.js"

const UserRouter = Router()

UserRouter.post('/register', userMiddleware.register, userController.register)
UserRouter.post('/login', userController.login)

export default UserRouter