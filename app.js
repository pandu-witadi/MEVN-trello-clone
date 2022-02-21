//
//
//

const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const cfApp = require('./config')

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// API
app.use('/api', require('./src/api/index'))

//these 3 lines make sure that vue and express app are coming from the same server
const vuePath = path.join(__dirname, './client_vue/dist')
app.use(express.static(vuePath))
app.get('/', function(req, res) {
    res.sendFile('index.html',  { root: vuePath } )
})

// connect db first, then start server
mongoose.connect(cfApp.dburl+cfApp.dbname, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
}).then( (result) => {
    console.log('... db connect to ' + cfApp.dburl+cfApp.dbname)



    // start server app
    app.listen(cfApp.port, () => {
        console.log('... ' + cfApp.appName +' server started, listening to port: ' + cfApp.port.toString())
    })
}).catch( (e) => {
    console.log('... db NOT connect to ' + cfApp.dburl+cfApp.dbname)
})
