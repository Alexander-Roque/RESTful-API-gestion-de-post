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

export async function getPostId(id: number){
     const result = await query("SELECT * FROM posts WHERE id = $1",[id]);
    return result.rows[0];
};

export async function updatePost(id:number, content:string) {
    return (
        (await query("UPDATE posts SET content = $2 WHERE id = $1 RETURNING *",[id, content])).rows[0]
    )
}