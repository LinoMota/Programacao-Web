const index = (req, res) => {
    res.render('game',{
        layout : false
    })
}

const game = (req, res) => {
    res.render('game/game', {
        layout : false
    })
}

module.exports = {
    index,
    game
}