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
    pago: {
        type: Boolean,
        default: false,
        required: true
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
    }
});

ItemSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Item', ItemSchema);