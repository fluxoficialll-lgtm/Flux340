
import { MetodoEmailSenha } from './MetodoEmailSenha';
import { MetodoGoogle } from './MetodoGoogle';
import { performLoginSync } from './AuthSync';

export const AuthFlow = {
    ...MetodoEmailSenha,
    ...MetodoGoogle,
    performLoginSync
};