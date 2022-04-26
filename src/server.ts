//DEPENDENCIES
import express from 'express'
import cors from 'cors'
import todos from './controllers/todos_router'

//APPLICATION
const app = express()

//MIDDLEWARE/CONFIG
app.use(cors())
app.use(express.json())

//ROUTES

app.use('/todos', todos)

app.use('*', (req, res) => {
    res.status(404).send("Sorry! The page requested was not found.")
})

export default app