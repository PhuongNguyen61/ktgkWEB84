const postMiddleware = {
    createPost: (req, res, next) => {
        try {
            const { content } = req.body
            if (!content) throw new Error('Content is missing!')
            return next()
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    },
    updatePost: (req, res, next) => {
        try {
            const {content} = req.body
            if (!content) throw new Error('Content is missing!')
            return next()
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    }
}


export default postMiddleware