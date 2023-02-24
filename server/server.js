require('dotenv').config()

const cors = require('cors')

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const MAX_AGE = 1000 * 20

const PORT = process.env.PORT || 3500

mongoose.Promise = global.Promise
try {
    mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlPArser: true,
        useUnifiedTopology: true
    })
    console.log('connected to MongoDB')
} catch (err) {
    console.log("error connecting to MongoDB")
    console.log(err)
}


const mongoDBstore = new MongoDBStore({
    uri: process.env.DATABASE_URI,
    collection: 'Sessions',
})

app.use(
    session({
        secret: 'alslds3kfj',
        name:  'session-id',
        store: mongoDBstore,
        cookie: {
            maxAge: MAX_AGE,
            sameSite: false,
            secure: false,
        },
        resave: true,
        saveUninitialized: false,
    })
)

const corsOptions = {
    origin: 'http://localhost:3500',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

app.use('/auth', require('./routes/AuthRoutes'))

app.listen(PORT, () => { console.log(`Server running on Port ${PORT}`)})

module.exports = app