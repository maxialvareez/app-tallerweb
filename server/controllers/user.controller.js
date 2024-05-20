const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { GroupUser } = require('../models');
const LoginResponseDTO = require('../dto/LoginResponseDTO');

// Registrar usuario - se usa.
const registrarUsuario = async (req, res = response) => {

    const { nombre, correo, password } = req.body;
    const usuario = new Usuario({ nombre, correo, password });

    // Verificar si el email existe
    const validar = await Usuario.findOne({ correo });
    
    if ( validar ){
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya se encuentra en uso.'
        });
    };

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(4);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    // Devuelve DTO
    const body = LoginResponseDTO.constructorSinToken(usuario._id,usuario.correo,usuario.nombre);

    res.status(201).json({
        ok: true,
        msg: 'Usuario creado',
        body
    })
};

// No se usa
const gruposUsuarioGet = async (req, res = response) => {

    const idUser = req.usuario._id.valueOf();

    if ( idUser !== req.params.id ){
        return res.status(401).json({
            ok: false,
            msg: 'No tienes permisos para ver los grupos de otro usuario'
        });
    };

    res.json({
        idUser,
        id: req.params.id
    });
};

// No se usa
const editUsuario = async (req, res = response) => {
    
    const { password, nombre, ...resto} = req.body;
    const id = req.params.id;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    if( nombre ){
        resto.nombre = nombre;
    }

    if(req.usuario._id == id){
        const usuario = await Usuario.findByIdAndUpdate(id, resto);
        res.json(usuario);
    } else {
        res.json({
            msg: "Error, no se puede editar."
        })
    }
    
};

// No se usa
const usuariosDelete = async (req, res) => {
    
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }).then(() => {
        const group = GroupUser.updateMany({integrantes: { $in: [id]}}, { $pull: { 'integrantes': id } }, function(err) {
            if (err) handleError(err);
        });
    });

    res.json({
        msg: "Usuario eliminado",
        usuario
    });
};

module.exports = { registrarUsuario, editUsuario, usuariosDelete, gruposUsuarioGet };