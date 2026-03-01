import pool from '../database/pool.js';
import { criarGrupoPublico } from '../database/GestaoDeDados/PostgreSQL/Consultas.Criacao.Grupo.Publico.js';

class RepositorioCriacaoGrupoPublico {
    async criar(grupo) {
        const {
            id, creator_id, name, description, group_type, cover_image, is_vip, status
        } = grupo;

        const values = [
            id, creator_id, name, description, group_type, cover_image, is_vip, 
            null, null, null, null, null, null, null, null, status
        ];

        const { rows } = await pool.query(criarGrupoPublico, values);
        return rows[0];
    }
}

export default new RepositorioCriacaoGrupoPublico();
