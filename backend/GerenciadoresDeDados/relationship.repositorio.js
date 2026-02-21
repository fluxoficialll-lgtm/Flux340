
import { pool } from '../database/pool.js';

export const relationshipRepositorio = {

    async follow(followerId, followingId) {
        const query = `
            INSERT INTO user_relationships (follower_id, following_id)
            VALUES ($1, $2)
            ON CONFLICT (follower_id, following_id) DO NOTHING;
        `;
        await pool.query(query, [followerId, followingId]);
    },

    async unfollow(followerId, followingId) {
        const query = 'DELETE FROM user_relationships WHERE follower_id = $1 AND following_id = $2';
        await pool.query(query, [followerId, followingId]);
    },

    async findFollowing(followerId) {
        const query = 'SELECT following_id FROM user_relationships WHERE follower_id = $1';
        const res = await pool.query(query, [followerId]);
        return res.rows.map(row => row.following_id);
    },

    async findFollowers(followingId) {
        const query = 'SELECT follower_id FROM user_relationships WHERE following_id = $1';
        const res = await pool.query(query, [followingId]);
        return res.rows.map(row => row.follower_id);
    },

    async getTopCreators(limit = 10) {
        const query = `
            SELECT following_id as creator_id, COUNT(follower_id) as followers_count
            FROM user_relationships
            GROUP BY following_id
            ORDER BY followers_count DESC
            LIMIT $1;
        `;
        const res = await pool.query(query, [limit]);
        return res.rows.map(row => ({ 
            creatorId: row.creator_id, 
            followersCount: parseInt(row.followers_count, 10)
        }));
    }
};