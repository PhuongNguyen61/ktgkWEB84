import PostModel from "../models/post.js"

const postController =  {
    createPost: async (req, res) => {
        try {
            const {id} = req.user
            const {content} = req.body
            const createPost = await PostModel.create({
                userId: id,
                content,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            res.status(201).send({
                message: 'Successful!',
                data: createPost
            });
        } catch (error) {
            res.status(403).send({
                message: error.message
            });
        }
    },
    updatePost: async (req, res) => {
        try {
            const {id} = req.params
            const updateContent = req.body
            const post = await PostModel.findByIdAndUpdate(id, {
                ...updateContent,
                updatedAt: new Date()
            })
            if (!post) throw new Error('This post is not exist!')
            res.status(201).send({
                message: 'Successful!',
                data: updateContent
            })
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    }
}

export default postController