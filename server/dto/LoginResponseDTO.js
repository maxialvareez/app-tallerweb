
class LoginResponseDTO {
    constructor(id,correo,nombre,token) {
        this.id = id
        this.correo = correo
        this.nombre = nombre
        this.token = token
    }

    static constructorSinToken(id,correo,nombre) {
        return new LoginResponseDTO(id,correo,nombre,null);
    }

}

module.exports = LoginResponseDTO;