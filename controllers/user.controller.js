const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req, res = response) => {
    
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'Usuario creado'
    })
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, rol, ...resto} = req.body;

    // Validar contra base de datos
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario)
};

const usuariosDelete = async (req, res) => {
    
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json({
        msg: "Usuario eliminado",
        usuario
    });
};

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete };