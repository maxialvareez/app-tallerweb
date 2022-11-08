const { Router } = require('express');
const { check } = require('express-validator');

const { addItem, getItem, getItems, updateItem, deleteItem } = require('../controllers/item.controller');
const { validarJWT, esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeItem, existeGrupo } = require('../helpers/db-validators');

const router = Router();

// Obtener todos los items de un grupo
router.get('/:grupo',[
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
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeItem ),
    validarCampos
], updateItem);

// Borrar un item
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeItem ),
    validarCampos
], deleteItem);

module.exports = router;