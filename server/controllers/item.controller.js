const { response } = require("express");
const { Item, GroupUser } = require('../models');
const ItemDTO = require('../dto/ItemDTO');


const addItem = async (req, res = response) =>{

    const { nombre, descripcion, costo } = req.body;

    const data = {
        nombre, 
        costo,
        descripcion,
        creado_por: req.usuario._id,
    }

    const item = new Item(data);

    await item.save();
    await GroupUser.findByIdAndUpdate(req.params.grupo, {$push: { items: item}});

    // Devuelve DTO
    const body = new ItemDTO(item._id, item.nombre, item.descripcion, item.costo, item.pago, req.usuario)

    res.status(201).json({
        ok: true,
        message: "",
        body
    });
    
}

const getItems = async (req, res = response) =>{

    const groupUser = await GroupUser.findById(req.params.grupo);
    const { items } = groupUser;
    const query = { estado: true,  items};

    const gastos = await Item.find(query).populate('creado_por','nombre');

    res.json({
        gastos
    });
}

const getItem = async (req, res = response) =>{

    const { id } = req.params;
    const item = await Item.findById(id);

    res.json(item);

}

const updateItem = async (req, res = response) =>{

    const { id } = req.params;
    const { estado, creado_por, ...data } = req.body;
    
    const item = await Item.findByIdAndUpdate(id, data, { new: true });

    res.json(item);
}

const deleteItem = async (req, res = response) =>{

    const id = req.body.id;
    const idGrupo = req.params.grupo;
    const itemBorrado = await Item.findByIdAndUpdate(id, {estado: false}, {new: true});
    const grupoActualizado = await GroupUser.findByIdAndUpdate(idGrupo, {$pull: { items: itemBorrado._id}});
    
    res.json({
        ok: true,
        message: "Item eliminado correctamente",
        body: null
    });

}

module.exports = {
    addItem,
    getItem,
    getItems,
    updateItem,
    deleteItem
}