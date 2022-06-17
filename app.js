const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const router = require('./routes/banking.route')
require('dotenv').config()


const app = express()


var corsOptions = {
    origin:"http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/api',router)

app.get('/', (req,res) => {
    res.json({
        message: "Welcome to the Bank"
    })
})

app.set('secretKey','hdjsakfhdjsk')
const userValidation = (req, res,next) => {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), 
    (err,decoded) =>{
        if(err){
            res.json({
                message: err
            })
        }
        next()
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})

const db = require("./models")

db.mongoose.connect(db.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`Successfully connected to the Database`)
})
.catch((error) => {
    console.log(error)
    process.exit()
})
