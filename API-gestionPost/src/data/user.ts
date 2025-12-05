import { query } from "../lib/db.ts";

export async function getUserByEmail(email: string) {
  return (await query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
}

export async function createUser(email: string, hashedPassword: string, username:string, firstname: string, lastname: string) {
  return (
    await query(
      "INSERT INTO users (email, password, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, hashedPassword, username, firstname, lastname]
    )
  ).rows[0];
}

export async function getUser(userId:number) {
  return ((await query("SELECT id, username, email, firstname, lastname, role, createdAt, updatedAt FROM users WHERE id = $1",[userId])).rows[0])
}

export async function updateUser(userId:number,email:string, firstName:string, lastName:string) {
  return ((await query("UPDATE users SET email = $2, firstname = $3, lastName = $4 WHERE id = $1 RETURNING id, username, email, firstname, lastname, role, createdAt, updatedAt",[userId, email, firstName, lastName])).rows[0])
}