const { Router } = require('express');
const { check } = require('express-validator');

const { userGroupByIdGet, userGroupGet, userGroupPost, updateUserGroup, deleteUserGroup, addUserGroup } = require('../controllers/groupUser.controller');
const { existeGrupo, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT, esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Obtener los grupos para ese usuario
router.get('/',[
    validarJWT
], userGroupGet);

// Obtener un grupo por id
router.get('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeGrupo ),
    validarCampos
], userGroupByIdGet);

// Crear un nuevo grupo
router.post('/',[
    validarJWT,
    existeUsuarioPorId,
    validarCampos
], userGroupPost);

// Agregar usuario a grupo
router.put('/:id/user',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('usuario', 'No es un id de Mongo válido').isMongoId(),
    check('usuario').custom(existeUsuarioPorId),
    check('id').custom( existeGrupo ),
    validarCampos
], addUserGroup);

// Actualizar un item
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeGrupo ),
    validarCampos
], updateUserGroup);

// Borrar un item
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeGrupo),
    validarCampos
], deleteUserGroup);

module.exports = router;