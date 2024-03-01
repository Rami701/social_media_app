const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models')

const port = 3000

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout')
app.use(expressLayouts)

// Session configuration
const sessionStore = new SequelizeStore({
    db: db.sequelize,
});
app.use(session({
    secret: 'This is a secret.',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));

const userRouter = require('./routes/user')


app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.send('Hello world!')
})

db.sequelize.sync().then((req) => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
