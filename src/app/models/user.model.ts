export class User {
    email: string;
    password: string;
} 

export class UserR {
    nombre: string;
    empresa: string;
    email: string;
    password: string;
    uid: string;
    perfil: 'admin' | 'cliente';
    foto: string;
    tel: string;
    cita: boolean;
}