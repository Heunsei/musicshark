const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')

const PORT = process.env.PORT || process.env.API_PORT

const app = express();
app.use(express.json())
app.use(cors())

// register route
// localhost 5000 ~~~
app.use('/api/auth', authRoutes)

console.log('start our server')

const server = http.createServer(app);


// 몽고db에 접속 할 수 있게 해주는 패키지
// db에 연결해줄거임
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is Listening on ${PORT}`)
        });
    })
    .catch(err => {
        console.log('database connection failed')
        console.error(err);
    })