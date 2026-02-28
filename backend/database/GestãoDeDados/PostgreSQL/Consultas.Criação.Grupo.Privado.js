export const criarGrupoPrivado = `
    INSERT INTO groups (
        id, creator_id, name, description, group_type, cover_image, is_vip, price, currency, access_type, selected_provider_id, expiration_date, vip_door, pixel_id, pixel_token, status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *;
`;
