const index = (req, res) => {
    res.render('main')
}

const sobre = (req, res) => {
    res.render('main/sobre')
}

module.exports = {
    index,
    sobre
}