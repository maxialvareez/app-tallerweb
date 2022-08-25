const { response } = require("express");
const { Item } = require('../models');


const addItem = async (req, res = response) =>{

    const { nombre, descripcion, costo } = req.body;

    const data = {
        nombre, 
        costo,
        descripcion,
        creado_por: req.usuario._id
    }

    const item = new Item(data);

    await item.save();

    res.status(201).json(item);
    
}

const getItems = async (req, res = response) =>{

    const { limit = 10, from = 0 } = req.query;
    const query = { estado: true };

    const [ total, items ] = await Promise.all([
        Item.countDocuments(query),
        Item.find(query)
            .populate('creado_por','nombre')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        items
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

    const { id } = req.params;
    const itemBorrado = await Item.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(itemBorrado);

}

module.exports = {
    addItem,
    getItem,
    getItems,
    updateItem,
    deleteItem
}