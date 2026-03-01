import pool from '../database/pool.js';
import { criarGrupoPrivado } from '../database/GestaoDeDados/PostgreSQL/Consultas.Criacao.Grupo.Privado.js';

class RepositorioCriacaoGrupoPrivado {
    async criar(grupo) {
        const {
            id, creator_id, name, description, group_type, cover_image, is_vip, status
        } = grupo;

        const values = [
            id, creator_id, name, description, group_type, cover_image, is_vip, 
            null, null, null, null, null, null, null, null, status
        ];

        const { rows } = await pool.query(criarGrupoPrivado, values);
        return rows[0];
    }
}

export default new RepositorioCriacaoGrupoPrivado();
