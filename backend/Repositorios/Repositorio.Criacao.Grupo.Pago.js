import pool from '../database/pool.js';
import { criarGrupoPago } from '../database/GestaoDeDados/PostgreSQL/Consultas.Criacao.Grupo.Pago.js';

class RepositorioCriacaoGrupoPago {
    async criar(grupo) {
        const {
            id, creator_id, name, description, group_type, cover_image, is_vip,
            price, currency, access_type, selected_provider_id, expiration_date,
            vip_door, pixel_id, pixel_token, status
        } = grupo;

        const values = [
            id, creator_id, name, description, group_type, cover_image, is_vip,
            price, currency, access_type, selected_provider_id, expiration_date,
            vip_door, pixel_id, pixel_token, status
        ];

        const { rows } = await pool.query(criarGrupoPago, values);
        return rows[0];
    }
}

export default new RepositorioCriacaoGrupoPago();
