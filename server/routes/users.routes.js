const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');

const { registrarUsuario, editUsuario, usuariosDelete, gruposUsuarioGet } = require('../controllers/user.controller');
const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

/* Por ahora no se usa.
router.get('/grupos/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], gruposUsuarioGet);
*/

// Editar usuario.
router.put('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], editUsuario);

// Agregar usuario.
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password tiene que ser de más de 6 dígitos').isLength({ min: 6}),
    check('correo').custom(emailExiste),
    validarCampos
], registrarUsuario);

// Borrar usuario.
router.delete('/:id', [
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;