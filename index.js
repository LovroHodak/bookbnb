const express = require('express')

const app = express()

const getBookings = require('./booking')
const getAirnbnb = require('./airbnb')
const getOneBnb = require('./onebnb')


getBookings()
//getAirnbnb()
//getOneBnb()


const port = process.env.PORT || 4242
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})