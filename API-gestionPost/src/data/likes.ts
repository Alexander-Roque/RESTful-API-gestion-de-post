import { query } from "../lib/db.ts";

// agregar like y devolveremos el post actualizado con likesCount
export async function addLike(postId:number, userId:number) {
    // aqui se guarda la interacion en la tabla likes
    const sql = 'INSERT INTO likes (postId, userId) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *';
    await query(sql,[postId, userId]);

    // Devolvemos el post con likesCount actualizado
    const getSql = 'SELECT id, userId, content, createdat,(SELECT COUNT(*) FROM likes WHERE postId = $1)::INT as "likesCount" FROM posts WHERE id = $1';
    const result = await query(getSql,[postId]);
    return result.rows[0]
}

export async function deleteLike(postId:number, userId:number) {
    const sql = 'DELETE FROM likes WHERE postId = $1 AND userId = $2';
    await query(sql,[postId, userId]);

    // Devolvemos el post con likesCount actualizado
    const getSql = 'SELECT id, userId, content, createdat,(SELECT COUNT(*) FROM likes WHERE postId = $1)::INT as "likesCount" FROM posts WHERE id = $1';
    const result = await query(getSql,[postId]);
    return result.rows[0]
}