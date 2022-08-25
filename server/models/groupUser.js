const { Schema, model } = require('mongoose');

const groupUserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    creado_por:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    integrantes: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'    
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

module.exports = model('GroupUser', groupUserSchema);