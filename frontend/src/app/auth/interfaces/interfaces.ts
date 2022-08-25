

export interface AuthResponse {
    uid?: string
    token?: string,
    msg?: string,
    ok: boolean
}

export interface Usuario {
    uid: string,
    nombre: string,
    rol: string
}