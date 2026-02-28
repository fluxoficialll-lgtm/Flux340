const pool = require('../database/pool');
const { criarGrupoPrivado } = require('../database/GestãoDeDados/PostgreSQL/Consultas.Criação.Grupo.Privado.js');

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

module.exports = new RepositorioCriacaoGrupoPrivado();
