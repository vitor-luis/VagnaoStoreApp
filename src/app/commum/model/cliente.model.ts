import { Login } from './login.model';

export interface Cliente {
    _id: number,
    nome: string,
    cpf: string,
    dataNascimento: Date,
    idLogin: number
    email: string,
    senha: string
}