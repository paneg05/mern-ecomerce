import dotenv from 'dotenv'
dotenv.config()

import colors from 'colors'
import  express  from 'express'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRouts from './routs/authRouts.js'


const port = process.env.PORT || 8080

//database config
connectDB()

// rest object
const server = express()

//middlewares
server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))


//routs
server.use('/api/v1/auth', authRouts)

// rest api

server.get('/',(req,res)=>{
    res.send({
        message:'Welcome'
    })
})

server.listen(port,()=>{
    console.log(`\n servidor rodando em: http://localhost:${port} em ${process.env.DEV_MODE} mode`.bgCyan.white)
})