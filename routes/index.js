import { Router } from "express"
import UserRouter from "./user.js"
import PostRouter from "./post.js"

const RootRouter = Router()

RootRouter.use('/users', UserRouter)
RootRouter.use('/posts', PostRouter)

export default RootRouter