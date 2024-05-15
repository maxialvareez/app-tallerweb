
class ItemDTO {
    constructor(id,nombre,descripcion,costo,pago,creadoPor) {
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.costo = costo
        this.pago = pago
        this.creadoPor = creadoPor
    }

}

module.exports = ItemDTO;