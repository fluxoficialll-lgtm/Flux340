const pool = require('../database/pool');
const { criarGrupoPublico } = require('../database/GestãoDeDados/PostgreSQL/Consultas.Criação.Grupo.Publico.js');

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

module.exports = new RepositorioCriacaoGrupoPublico();
