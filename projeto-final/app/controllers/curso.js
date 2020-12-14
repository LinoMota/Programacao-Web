const curso = require('../models/curso');
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
const read = async (req, res) => {
    const curso = (await Curso.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: models.Area
        }]
    })).toJSON()
    res.render('curso/read', {
        curso: curso
    });
};

const create = async (req, res) => {
    if (req.route.methods.get) {

        const areas = (await models.Area.findAll()).map(area => area.toJSON())

        res.render('curso/create', {
            areas
        });
    } else {
        try {
            console.log(curso)
            curso = await Curso.create({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.area,
            });

            res.render('curso')

        } catch (e) {

            const areas = (await models.Area.findAll()).map(area => area.toJSON())

            res.render('curso/create', {
                curso: req.body,
                errors: e.errors,
                areas
            });
        }
    }

};

const update = async (req, res) => {
    if (req.route.methods.get) {
        const curso = (await Curso.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.Area
            }]
        })).toJSON()
        res.render('curso/update', {
            curso: curso
        });
    } else {
        try {
            console.log(curso)
            curso = await Curso.findOne({
                where: req.body.id
            }).update({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.area,
            })

            res.render('curso')

        } catch (e) {

            const areas = (await models.Area.findAll()).map(area => area.toJSON())

            res.render('curso/create', {
                curso: req.body,
                errors: e.errors,
                areas
            });
        }
    }

};


const remove = async (req, res) => {
    const curso = (await Curso.destroy({
        where: {
            id: req.params.id
        }
    }))
};

module.exports = {
    index,
    read,
    create,
    update,
    remove
}