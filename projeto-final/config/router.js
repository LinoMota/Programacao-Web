const express = require('express')

const router = express.Router()

const areaController        =       require('../app/controllers/area')
const mainController        =       require('../app/controllers/main')
const gameController        =       require('../app/controllers/game')
const interfaceController   =       require('../app/controllers/interface')
const cursoController       =       require('../app/controllers/curso');



router.get('/',                     mainController.index)
router.get('/sobre',                mainController.sobre)

router.get('/game',                 gameController.game)

router.get('/interface',            interfaceController.interface)

router.get('/area',                 areaController.index)


router.get('/curso',                cursoController.index);
router.get('/curso/read/:id',       cursoController.read);
router.get('/curso/create',         cursoController.create);
router.post('/curso/create',        cursoController.create);
router.get('/curso/update/:id',     cursoController.update);
router.post('/curso/update/:id',    cursoController.update);
router.post('/curso/remove/:id',    cursoController.remove);

module.exports = router