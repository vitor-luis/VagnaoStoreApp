import { Login } from './login.model';

export interface Cliente {
    id: number,
    nome: string,
    cpf: string,
    dataNascimento: Date,
    idLogin: number
    email: string,
    senha: string
}