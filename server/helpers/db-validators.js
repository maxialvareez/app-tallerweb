const { Usuario, Item, Role, GroupUser } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
};

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
        throw new Error(`El Item ID: ${ id } no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeItem,
    existeGrupo,
    existeUsuarioPorCorreo
}