const models = require('../models/index')
const Area = models.Area;

const index = async (req, res) => {

    const areas = (await Area.findAll()).map(area => area.toJSON())
    console.log(areas)
    res.render('area', {
        areas: areas
    });
};

module.exports = {
    index
}