const { Schema, model } = require('mongoose');

const ItemSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String
    },
    costo: {
        type: Number,
        required: [true, 'El costo es obligatorio']
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
    }/*,
    pertenece_a:{
        type: Schema.Types.ObjectId,
        ref: 'GroupUser',
        required: true
    }*/
});

ItemSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Item', ItemSchema);