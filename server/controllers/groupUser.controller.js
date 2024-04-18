const { response, request, json } = require('express');
const { Usuario, GroupUser } = require('../models');

const registrarGrupo = async (req, res = response) => {

    const { nombre, descripcion } = req.body;

    if(nombre == null || descripcion == null) {
        return res.status(401).json({
            msg: "Falta el nombre o la descripcion."
        });
    }

    const data = {
        nombre,
        descripcion,
        creado_por: req.usuario._id,
        integrantes: req.usuario._id
    }

    const grupo = new GroupUser(data);
    await grupo.save();

    res.status(201).json({
        msg: 'Grupo creado',
        grupo
    })
};

const userGroupGet = async (req, res = response) =>{

    const query = { integrantes: { $in: [req.usuario._id] } }

    const grupos = await GroupUser.find(query)
            .populate('creado_por', 'nombre')
            .populate('integrantes', 'nombre');

    res.json({
        grupos
    });
}

const userGroupByIdGet = async (req, res = response) =>{

    const { id } = req.params;
    const group = await GroupUser.findById(id);

    if(group.integrantes.includes(req.usuario._id)){
        const response = await group.populate('integrantes', ['nombre', 'correo', 'estado']);
        await response.populate('creado_por');
        return res.json(response);
    }

    return res.status(401).json({
        msg: "No tienes permisos para ver este grupo"
    });

}

const addUserGroup = async (req, res = response) => {

    const correo = req.body.correo;
    const user = await Usuario.findOne({correo});
    const idUserGrupo = req.usuario._id.valueOf();
    const groupUser = await GroupUser.findById(req.params.id);
    
    const { integrantes } = groupUser;

    if ( idUserGrupo !== groupUser.creado_por.valueOf()){
        return res.status(401).json({
            msg: "Sólo el creador del grupo puede agregar usuarios."
        });
    }

    if (integrantes.includes(user._id)){
        return res.status(400).json({
            msg: "El usuario ya pertenece al grupo."
        });
    }

    const grupo = await GroupUser.findByIdAndUpdate( groupUser,
        { $push: {
            integrantes: user
        }});
    
    return res.json({
        grupo
    })
};

const editarGrupo = async (req, res = response) => {
    
    const { id } = req.params;
    const group = await GroupUser.findById(id);
    const { estado, creado_por, ...data } = req.body;
    const idUser = req.usuario._id.valueOf();

    if(group.creado_por.valueOf() !== idUser){
        return res.status(401).json({
            msg: "No tienes permiso para editar el grupo, sólo el creador"
        })    
    }

    const grupo = await GroupUser.findByIdAndUpdate( id, data);
    res.json(grupo)
};

const deleteGroup = async (req, res) => {
    
    const { id } = req.params;
    const grupoBorrado = await GroupUser.findById(id);

    if(grupoBorrado.creado_por.valueOf() == req.usuario._id.valueOf()){
        await GroupUser.findByIdAndUpdate(id, {estado: false}, {new: true});
        
        res.json({
            msg: "Grupo eliminado"
        });
    } else {
        res.status(401).json("No tenes permisos");
    }
    
};

const deleteUserFromGroup = async (req, res) => {
    
    const { id } = req.params;
    const correo = req.body.correo;
    const userBorrado = await Usuario.findOne({correo});
    const group = await GroupUser.findById(req.params.id);

    if(group.creado_por.valueOf() == req.usuario._id.valueOf()){
        await GroupUser.findByIdAndUpdate(group, {$pull: { integrantes: userBorrado._id}});
        
        res.json({
            msg: "Integrante eliminado del grupo"
        });
    } else {
        res.status(401).json("No tenes permisos");
    }
};

module.exports = { userGroupByIdGet, userGroupGet, registrarGrupo, editarGrupo, deleteGroup, addUserGroup, deleteUserFromGroup};