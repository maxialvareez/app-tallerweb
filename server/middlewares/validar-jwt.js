const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request , res = response, next) => {

    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    };

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById( uid );

        if ( !usuario ){
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido - Usuario no existe'
            });
        };

        // Verificar si el uid tiene estado en true
        if (!usuario.estado){
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido - Usuario con estado en false'
            });
        };

        req.usuario = usuario;

        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}