import express from 'express'
import joi from 'joi'
import fs from 'fs'
const app = express()
const PORT = 8080
import routes from './routes/index.js'

// const database = './database/db.json'
// const data = JSON.parse(fs.readFileSync(database))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
})