const { response, request } = require('express');
const { Usuario, GroupUser } = require('../models');


const userGroupsGet = async (req, res = response) => {
    
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [ total, grupos ] = await Promise.all([
        GroupUser.countDocuments(query),
        GroupUser.find(query)
            .populate('creado_por', 'nombre')
            .populate('integrantes', 'nombre')
            .populate('items', 'nombre', 'costo')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        grupos
    });
};

const userGroupGet = async (req, res = response) =>{

    const { id } = req.params;
    const grupo = await GroupUser.findById(id);

    res.json(grupo);

}

const userGroupPost = async (req, res = response) => {

    const { nombre, descripcion } = req.body;

    const data = {
        nombre,
        descripcion,
        creado_por: req.usuario._id,
        integrantes: req.usuario._id
    }

    const grupo = new GroupUser(data);

    // Guardar en BD
    await grupo.save();

    res.json({
        msg: 'Grupo creado'
    })
};

const updateUserGroup = async (req, res = response) => {
    const { id } = req.params;
    const { estado, creado_por, ...data } = req.body;

    const grupo = await GroupUser.findByIdAndUpdate( id, data);

    res.json(grupo)
};

const deleteUserGroup = async (req, res) => {
    
    const { id } = req.params;
    const grupoBorrado = await GroupUser.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(grupoBorrado);
};

module.exports = { userGroupsGet, userGroupGet, userGroupPost, updateUserGroup, deleteUserGroup };