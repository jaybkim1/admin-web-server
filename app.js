/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./models');

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config')
const port = process.env.PORT || 3000 

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()

// parse JSON and url-encoded json query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// index page, just for testing
app.get('/', (req, res) => {
    res.send('Hello JWT')
})

// configure api router
app.use('/api', require('./routes/api'))

/* =======================
    CONNECT TO MYSQL SERVER USING SEQUELIZE
==========================*/
db.sequelize.sync()
    .then(() => {
        console.log(' ✓ DB connection success.');
        // open the server
        app.listen(port, () => {
            console.log(` ✓ Express is running on port ${port}`)
        })
    }).catch(err => {
        console.error(err);
        console.log(' ✗ DB connection error. Please make sure DB is running.');
        process.exit();
});