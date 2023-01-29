const { Usuario, Item, GroupUser } = require('../models');

const emailExiste = async( correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
};

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El ID: ${ id } no existe`);
    }
};

const existeUsuarioPorCorreo = async( correo ) => {
    const existeUsuario = await Usuario.findOne({ correo });
    if ( !existeUsuario ){
        throw new Error(`El correo: ${ correo } no está registrado`);
    }
};

const existeItem = async ( id ) => {
    const existeItem = await Item.findById(id);
    if ( !existeItem ){
        throw new Error(`El Item ID: ${ id } no existe`);
    }
}

const existeGrupo = async ( id ) => {
    const existeGrupo = await GroupUser.findById(id);
    if ( !existeGrupo ){
        throw new Error(`El Grupo con ID: ${ id } no existe`);
    }
}

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    existeItem,
    existeGrupo,
    existeUsuarioPorCorreo
}