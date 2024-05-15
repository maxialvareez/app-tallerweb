
class GroupDTO {
    constructor(id,nombre,descripcion,creadoPor) {
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.estado = true
        this.creadoPor = creadoPor
        let lista = [creadoPor]
        this.integrantes = lista
        let items = []
        this.items = items
    }

}

module.exports = GroupDTO;