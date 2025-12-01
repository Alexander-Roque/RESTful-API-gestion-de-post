import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import connect from "connect-pg-simple";
import jwt from "jsonwebtoken";
import { pool } from "./config/db.ts";
import { getAllPost, getPostsByUsername } from "./models/callback.ts";


const app = express()
const port = 5000;
declare module "express-session"{
    interface SessionData {
        user: string;
    }
}

app.get("/", async (req, res)=> {
    // permite ver una lista de sobre todos los post echos
    try {
        const posts = await getAllPost();
        res.json(posts);
    } catch (error) {
        res.status(500).json({error:"no recibimos el post"})
    }
})

app.get("/:username", async (req,res)=> {
    const {username} = req.params
    try {
        const posts = await getPostsByUsername(username);
        res.json(posts);
    } catch (error) {
        res.status(500).json({error:"no recibimos el post"})
    }
})

app.listen(port, ()=>{
    console.log(`Servicio corriendo en http://locahost:${port}`)
})