const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, tieneRole, esAdminRole } = require('../middlewares');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/user.controller');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password tiene que ser de más de 6 dígitos').isLength({ min: 6}),
    check('correo').custom(emailExiste),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;