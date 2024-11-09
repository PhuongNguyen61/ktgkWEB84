import { Router } from "express"
import userMiddleware from "../middlewares/user.js"
import postController from "../controllers/post.js"
import postMiddleware from "../middlewares/post.js"

const PostRouter = Router()

PostRouter.post('', userMiddleware.checkAuth, postMiddleware.createPost, postController.createPost)
PostRouter.put('/:id', userMiddleware.checkAuth, postMiddleware.updatePost, postController.updatePost)

export default PostRouter