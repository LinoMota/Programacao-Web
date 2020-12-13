const sass          = require('node-sass-middleware')
const handlebars    = require('express-handlebars')
const express       = require('express')
const morgan        = require('morgan')
const path          = require('path')

const helpers       = require('./app/views/helpers/helper.js')
const router        = require('./config/router.js')

const PORT = process.env.PORT || 3333

const app = express()

app.use(express.urlencoded({
    extended: true
}))

//configurando logger
app.use(morgan('short'))

// configurando handlebars
app.engine('handlebars', handlebars({
    layoutsDir: path.resolve('app/views/layouts'),
    helpers: helpers,
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve('app/views'))


//configurando recursos estáticos
app.use('/img', [
    express.static(path.resolve('public/img')),
])

app.use('/css', [
    express.static(path.resolve('public/css')),
])

app.use('/js', [
    express.static(path.resolve('node_modules/jquery/dist/')),
    express.static(path.resolve('node_modules/bootstrap/dist/js/')),
    express.static(path.resolve('node_modules/popper.js/dist/umd/')),
    express.static(path.resolve('public/js')),
])


//configurando sass
app.use(sass({
    src: path.resolve('public/scss'),
    dest: path.resolve('public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css',
}))

app.use(router)

app.listen(PORT)