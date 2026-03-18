
import bcrypt from 'bcryptjs';

class Conta {
    constructor({ id, nome, email, senha, google_id }) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.google_id = google_id;
        this.senha_hash = null;
    }

    async criptografarSenha() {
        if (this.senha) {
            const salt = await bcrypt.genSalt(10);
            this.senha_hash = await bcrypt.hash(this.senha, salt);
        }
    }

    paraBancoDeDados() {
        const data = {
            id: this.id,
            name: this.nome,
            email: this.email,
        };
        if (this.senha_hash) {
            data.password_hash = this.senha_hash;
        }
        if (this.google_id) {
            data.google_id = this.google_id;
        }
        return data;
    }

    static deBancoDeDados(dbData) {
        if (!dbData) return null;
        const conta = new Conta({
            id: dbData.id,
            nome: dbData.name,
            email: dbData.email,
            google_id: dbData.google_id
        });
        conta.senha_hash = dbData.password_hash;
        return conta;
    }

    paraRespostaHttp() {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
        };
    }
}

export default Conta;
