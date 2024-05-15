const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const LoginResponseDTO = require("../dto/LoginResponseDTO");

// Login - se usa
const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if ( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correctos - Correo equivocado'
            });
        };

        // Si el usuario está activo
        if ( !usuario.estado ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correctos - Cuenta borrada'
            });
        };

        //Verificar la pass
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correctos - Contraseña equivocada'
            });
        };

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        const body = new LoginResponseDTO(usuario._id,usuario.nombre,usuario.correo,token)

        res.json({
            ok: true,
            message: "",
            body
        });

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
};

const revalidarToken = async(req = request, res = response ) => {

    const { usuario } = req;

    // Generar el JWT
    const token = await generarJWT(usuario._id);

    return res.json({
        ok: true,
        uid: usuario._id,
        token
    });

}

module.exports = { login, revalidarToken };