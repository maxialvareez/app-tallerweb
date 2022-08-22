const { Router } = require('express');
const { check } = require('express-validator');

const { userGroupsGet, userGroupGet, userGroupPost, updateUserGroup, deleteUserGroup } = require('../controllers/groupUser.controller');
const { validarJWT, esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Obtener todos los items - publico
router.get('/', userGroupsGet);

// Obtener un item en particular
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    //check('id').custom( existeItem ), Hacer existe grupo
    validarCampos
], userGroupGet);

// Crear un nuevo item
router.post('/',[
    validarJWT
], userGroupPost);

// Actualizar un item
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('id').custom( existeItem ), Hacer existe grupo
    validarCampos
], updateUserGroup);

// Borrar un item
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    //check('id').custom( existeItem ), Hacer existe grupo
    validarCampos
], deleteUserGroup);

module.exports = router;