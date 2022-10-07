const { response, request, json } = require('express');
const { Usuario, GroupUser } = require('../models');

/*
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
*/

const userGroupGet = async (req, res = response) =>{

    const { pertenece_a } = req.usuario;
    const grupo = await GroupUser.find({ _id: pertenece_a})

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

    await Usuario.findByIdAndUpdate(req.usuario._id, {$push: { pertenece_a: grupo}});

    res.status(201).json({
        msg: 'Grupo creado'
    })
};

const addUserGroup = async (req, res = response) => {

    const idUser = req.usuario._id.valueOf();
    const groupUser = await GroupUser.findById(req.params.id);
    const user = await Usuario.findById(req.body.usuario);
    const { integrantes } = groupUser;

    if ( idUser !== groupUser.creado_por.valueOf()){
        return res.status(401).json({
            msg: "Sólo el creador del grupo puede agregar usuarios."
        });
    }

    if (integrantes.includes(user._id)){
        return res.status(400).json({
            msg: "El usuario ya pertenece al grupo."
        });
    }

    const grupo = await GroupUser.findByIdAndUpdate( req.params.id,
        { $push: {
            integrantes: user
        }});
    
    return res.json({
        grupo
    })
};

const updateUserGroup = async (req, res = response) => {
    
    const { id } = req.params;
    const { estado, creado_por, ...data } = req.body;
    const idUser = req.usuario._id.valueOf();

    if(creado_por != idUser){
        return res.status(401).json({
            msg: "No tienes permiso para editar el grupo, sólo el creador"
        })    
    }

    const grupo = await GroupUser.findByIdAndUpdate( id, data);
    res.json(grupo)
};

const deleteUserGroup = async (req, res) => {
    
    const { id } = req.params;
    const grupoBorrado = await GroupUser.findById(id);

    if(grupoBorrado.creado_por == req.usuario._id.valueOf()){
        await GroupUser.findByIdAndUpdate(id, {estado: false}, {new: true});
        await Usuario.findByIdAndUpdate(req.usuario._id, {$pull: { pertenece_a: grupo}});
        
        res.json("Grupo eliminado");
    } else {
        res.status(401).json("No tenes permisos");
    }
    
};

module.exports = { userGroupGet, userGroupPost, updateUserGroup, deleteUserGroup, addUserGroup };