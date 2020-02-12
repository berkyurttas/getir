const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config.json')

const port = config.port
const app = express()

app.use(bodyParser.json())
app.use(require('./controllers'))

//Create server

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Getir app listening on port ${port}!`)
    })
}else{
    module.exports = app
}