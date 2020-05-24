import express from 'express'
import { json } from 'body-parser'
import { postsRouter } from './routes/posts'
import cors from 'cors'

const app = express()
app.use(cors())
app.set('trust proxy', true) // nginx ingress
app.use(json())

app.use(postsRouter)

// not found errorをセットする
// その時は、'express-async-errors'が必要

export { app }
