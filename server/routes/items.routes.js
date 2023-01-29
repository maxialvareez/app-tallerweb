const { Router } = require('express');
const { check } = require('express-validator');

const { addItem, getItem, getItems, updateItem, deleteItem } = require('../controllers/item.controller');
const { validarJWT } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeItem, existeGrupo } = require('../helpers/db-validators');

const router = Router();

// Obtener todos los items de un grupo
router.get('/group/:grupo',[
    validarJWT,
    check('grupo').custom(existeGrupo),
    validarCampos
], getItems);

// Obtener un item en particular
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeItem ),
    validarCampos
], getItem);

// Crear un nuevo item
router.post('/:grupo',[
    validarJWT,
    check('grupo').custom(existeGrupo),
    validarCampos
], addItem);

// Actualizar un item
router.put('/:id',[
    validarJWT,
    check('id').custom( existeItem ),
    validarCampos
], updateItem);

// Borrar un item
router.delete('/:grupo',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeItem),
    check('grupo').custom( existeGrupo ),
    validarCampos
], deleteItem);

module.exports = router;