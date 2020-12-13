
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('main', {
        conteudo : 'oi',
        layout: true
    })
})

module.exports = router