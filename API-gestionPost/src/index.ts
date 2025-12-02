// import express, { NextFunction, Request, Response } from "express";
import express from "express"
import type { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import connect from "connect-pg-simple";
import jwt from "jsonwebtoken";
// import { pool } from "./config/db.ts";
import { getAllPost, getPostsByUsername } from "./services/callback.ts";
import { pool } from "./lib/db.ts";

const app = express()
const port = 5500;
declare module "express-session"{
    interface SessionData {
        user: string;
    }
}
app.use(express.json());
app.use(cookieParser());

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
    } catch (error) {
        console.error("DB connection failed:", error);
    }
})

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})