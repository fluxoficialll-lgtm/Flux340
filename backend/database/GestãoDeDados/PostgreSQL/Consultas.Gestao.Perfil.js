
// backend/database/GestãoDeDados/PostgreSQL/Consultas.Gestao.Perfil.js

export const queries = {
    updateUser: `
        UPDATE users 
        SET name = $1, bio = $2, profile_image = $3, website = $4
        WHERE id = $5
        RETURNING *;
    `,
    findUserById: `
        SELECT 
            u.id, 
            u.username, 
            u.name as nickname, 
            u.bio, 
            u.profile_pic as avatar, 
            u.website,
            (SELECT COUNT(*) FROM posts WHERE user_id = u.id) as posts_count,
            (SELECT COUNT(*) FROM user_relationships WHERE followed_id = u.id) as followers_count,
            (SELECT COUNT(*) FROM user_relationships WHERE follower_id = u.id) as following_count
        FROM users u
        WHERE u.id = $1;
    `,
};
