import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import students from './routes/students.js'
import users from './routes/users.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/students', students)
app.use('/users', users)

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch(error => console.log(error.message))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')))
	app.get('/*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	})
}
