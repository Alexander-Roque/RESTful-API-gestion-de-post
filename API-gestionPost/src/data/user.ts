import { query, pool } from "../lib/db.ts";

export async function getUserByEmail(email: string) {
  return (await query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
}

export async function getAdmins() {
  return(await query("SELECT id, username, email, firstname,lastname, role, createdAt FROM users WHERE role = 'admin'")).rows;
}

export async function createUser(email: string, hashedPassword: string, username:string, firstname: string, lastname: string, role:string) {
  return (
    await query(
      "INSERT INTO users (email, password, username, firstname, lastname, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, hashedPassword, username, firstname, lastname, role]
    )
  ).rows[0];
}

export async function getUser(userId:number) {
  return ((await query("SELECT id, username, email, firstname, lastname, role, createdAt, updatedAt FROM users WHERE id = $1",[userId])).rows[0])
}

export async function updateUser(userId:number,email:string, firstname:string, lastname:string) {
  return ((await query("UPDATE users SET email = $2, firstname = $3, lastName = $4 WHERE id = $1 RETURNING id, username, email, firstname, lastname, role, createdAt, updatedAt",[userId, email, firstname, lastname])).rows[0])
}

// export async function deleteUser(userId:number) {
//   return((await query("DELETE FROM users WHERE id = $1",[userId])).rows[0])
// }
export async function deleteUser (userId:number) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // borramos los likes hechos por el usuario
    await client.query("DELETE FROM likes WHERE userid=$1",[userId]);

    // borramos los likes sobre los post hechos por el usaurio
    await client.query("DELETE FROM likes WHERE postid IN (SELECT id FROM posts WHERE userid = $1)", [userId]);

    // borramos posts del usuario
    await client.query("DELETE FROM posts WHERE userid = $1",[userId]);

    // borrar el usuario
    const result = await client.query("DELETE FROM users WHERE id = $1",[userId])

    await client.query("COMMIT");
    return result.rowCount
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}