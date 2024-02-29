const express = require('express')
const app = express()
const port = 3000

const db = require('./models')


app.get('/', (req, res) => {
    res.send('Hello world!')
})

db.sequelize.sync().then((req) => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
