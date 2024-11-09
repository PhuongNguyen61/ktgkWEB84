import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
await mongoose.connect(process.env.MONGGO_URL).then(() => {
    console.log('Connected database!')
})
import RootRouter from './routes/index.js'

const app = express()
app.use(express.json())

app.get('', (req, res) => {
    res.send({
        message: 'Connected!',
    })
})

app.use('', RootRouter)

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running!')
})