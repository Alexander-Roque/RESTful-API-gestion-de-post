// interactuamos con la base de datos crearemos estas dos funciones getAllPost y getPostsByUsername

import { query } from "../lib/db.ts";

export async function getAllPost() {
    const result = await query("SELECT posts.id, users.username, posts.content, posts.createdAt, posts.updatedAt FROM posts JOIN users ON posts.userid = users.id");
    return result.rows;
}

export async function getPostsByUsername(username: string){
     const result = await query("SELECT posts.id, users.username, posts.content, posts.createdAt, posts.updatedAt FROM posts JOIN users ON posts.userid = users.id WHERE users.username = $1",[username]);
    return result.rows;
}

export async function createPost(userId: number, content: string) {
    return(
        await query("INSERT INTO posts (userId, content) VALUES ($1, $2) RETURNING *",[userId, content])
    ).rows[0];
}