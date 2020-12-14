const models = require('../models/index');
const Curso = models.Curso;

const index = async (req, res) => {

    const cursos = (await Curso.findAll({
        include: [{
            model: models.Area
        }]
    })).map(curso => curso.toJSON())
    console.log(cursos)
    res.render('curso', {
        cursos: cursos
    });

};
const read = async (req, res) => {};

const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render('curso/create');
    } else {
        curso = await Curso.create({
            sigla: req.body.sigla,
            nome: req.body.nome,
            descricao: req.body.descricao,
            id_area: req.body.area,
        });
        res.redirect('/curso');
    }

};

const update = async (req, res) => {};
const remove = async (req, res) => {};

module.exports = {
    index,
    read,
    create,
    update,
    remove
}