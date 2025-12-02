// import express, { NextFunction, Request, Response } from "express";
// import path from "path";
// import dotenv from "dotenv";
import express from "express"
import type { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getAllPost, getPostsByUsername } from "./data/post.ts";
import { createUser, getUserByEmail } from "./data/user.ts";
import { pool } from "./lib/db.ts";

// dotenv.config({path:path.resolve(__dirname,".env")})

const app = express()
const port = 5500;
declare module "express-session"{
    interface SessionData {
        user: string;
    }
}
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req,res)=>{
    const {email, password, username, firstname, lastname} = req.body

    // validamos si email y password existen
    if(!email || !password || !username){
        res.status(400).json({ error: "Email y password son requeridos" })
        return;
    }

    try {
        const user = await getUserByEmail(email);
        
        if (user) {
        res.status(400).send("El correo ya está registrado");
        return;
    }
    const costFactor = 10
    const hashedPassword = await bcrypt.hash(password,costFactor)
    const newUser = await createUser(email,hashedPassword, username, firstname, lastname)

    res.status(201).json(newUser)
    } catch (error) {
        console.error("POST /signup error:", error)
        res.status(500).json({ error: "Error al crear el usuario" });
    }
  }
)

app.get("/", async (req, res)=> {
    // permite ver una lista de sobre todos los post echos
    try {
        const posts = await getAllPost();
        res.json(posts);
    } catch (error) {
        console.error("GET / error:", error);
        res.status(500).json({error:"no recibimos el post"})
    }
});

app.get("/:username", async (req,res)=> {
    const {username} = req.params
    try {
        const posts = await getPostsByUsername(username);
        res.json(posts);
    } catch (error) {
        console.error(`GET /${username} error:`, error);
        res.status(500).json({error:"no recibimos el post"})
    }
});

// prueba si se escucha la base de datos
(async ()=> {
    try {
        await pool.query("Select 1");
        console.log("DB connected OK")
        
        app.listen(port, ()=>{
            console.log(`Escuchando en el puerto ${port}`)
        })  
    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1);
    }
})();