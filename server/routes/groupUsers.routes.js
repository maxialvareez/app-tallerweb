const { Router } = require('express');
const { check } = require('express-validator');

const { userGroupByIdGet, userGroupGet, registrarGrupo, editarGrupo, deleteGroup, addUserGroup, deleteUserFromGroup} = require('../controllers/groupUser.controller');
const { existeGrupo, existeUsuarioPorCorreo } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Crear un nuevo grupo
router.post('/',[
    validarJWT,
    validarCampos
], registrarGrupo);

// Obtener los grupos de ese usuario
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

// Actualizar un grupo
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeGrupo ),
    validarCampos
], editarGrupo);

// Borrar un grupo
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeGrupo),
    validarCampos
], deleteGroup);

// Agregar usuario a grupo
router.put('/userAdd/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('correo').custom(existeUsuarioPorCorreo),
    validarCampos
], addUserGroup);

// Borrar un usuario del grupo
router.delete('/userDelete/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('correo').custom(existeUsuarioPorCorreo),
    validarCampos
], deleteUserFromGroup);

module.exports = router;