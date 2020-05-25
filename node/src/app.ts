import express from 'express'
import { json } from 'body-parser'
import { postsRouter } from './routes/posts'

const app = express()
app.set('trust proxy', true) // nginx ingress
app.use(json())

app.use(postsRouter)

// not found errorをセットする
// その時は、'express-async-errors'が必要

export { app }
