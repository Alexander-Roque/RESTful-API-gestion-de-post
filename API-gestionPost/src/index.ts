// import path from "path";
import dotenv from "dotenv";
import express from "express"
import type { NextFunction, Request, RequestHandler, Response } from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getAllPost, getPostsByUsername, createPost, getPostId, updatePost } from "./data/post.ts";
import { createUser, getUser, getUserByEmail } from "./data/user.ts";
import { addLike, deleteLike } from "./data/likes.ts";
import { pool } from "./lib/db.ts";
import { authenticateHandler } from "./middlewares/auth.ts";
import { resourceUsage } from "process";

dotenv.config()

const app = express()
const port = 5500;

const jwtSecret = process.env.JWT_SECRET!;

// codigo momentaneo
if (!jwtSecret) {
    console.error("JWT_SECRET no está configurado en .env");
    process.exit(1);
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

app.post("/login",async(req,res)=> {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email y password son requeridos" });
        return;
    }
    try {
        const user = await getUserByEmail(email);
        
        if(!user){
            res.status(401).send("Credenciales incorrectas");
            return;
        }

        const isValid = await bcrypt.compare(password, user.password)
    
        if(!isValid){
            res.status(401).json({ error: "Credenciales incorrectas" });
            return;
            // validomos el id
        }
        // genereramos el token
        const payload = {userId: user.id}
        const token = jwt.sign(payload, jwtSecret,{ expiresIn: "1m" })

        res.json({ok:true, message: "Login Exitoso", data:{token}})
        
    } catch (error) {
        console.error("POST /login error:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }

})

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

app.get("/me", authenticateHandler(), async (req,res)=>{
    try {
        const userId = req.userId;

         if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });

         const user = await getUser(userId);
         if (!user) return res.status(404).json({message: "El usuario no encontrado"})
         
         return res.status(200).json({message:"user encontrado", data:user})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al buscar el user" });
    }
})


app.post("/posts", authenticateHandler(), async (req,res)=>{
    try {
        const userId = req.userId;
        const {content} = req.body;

        if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });
        if (!content) return res.status(400).json({ message: "Debes enviar 'content'" });

        const post = await createPost(userId, content);
        return res.status(201).json({message:"post creado", data:post})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el post" });
    }
}
);

app.patch("/posts/:id", authenticateHandler(),async (req,res)=> {
    try {
        // traemos el userId, content y id del post para verificar el acceso y funcionamiento de la pagina
        const userId = req.userId;
        const {content} = req.body;
        const postId= Number(req.params["id"])

        // por si hay errores
        if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });
        if (!content) return res.status(400).json({ message: "Debes enviar 'content'" });
        if(!postId) return res.status(404).json({
            message: "Id no encontrado"
        })

        // ahora traemos el post que deseamos actualizar por medio del id que pasaramos al params
        const post = await getPostId(postId)

        // verificamos si es el correcto o si existe
        if(!post) return res.status(404).json({
            message:"Post no encontrado"
        })
        if(post.userid !== userId){
            return res.status(403).json({ message: "No autorizado para editar este post" });
        }

        // ya podemos actualizar el post que deseamos
        const update = await updatePost(postId, content)
        return res.status(200).json({message:"Post actualizado", post: update})

    } catch (error) {
         console.error(error);
        return res.status(500).json({ message: "Error al crear el post" });
    }
})
app.post("/posts/:postId/like", authenticateHandler(), async(req,res)=>{
    try {
        const userId = req.userId;
        const postId= Number(req.params["postId"])

        if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });
        if(!postId) return res.status(404).json({
            message: "Id no encontrado"
        });

        // verificamos que el post exista
        const post = await getPostId(postId)
        // console.log(post)

        if(!post) return res.status(404).json({
            message:"Post no encontrado"
        });

        const likeResult = await addLike(postId, userId)

        return res.status(200).json({message:"Like agregado", data: likeResult})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el post" });
    }
})

app.delete("/posts/:postId/like", authenticateHandler(), async(req,res)=> {
    try {
        const userId = req.userId;
        const postId= Number(req.params["postId"])
        
        if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });
       
        if(!postId) return res.status(404).json({
            message: "Id no encontrado"
        });
        
        const post = await getPostId(postId)

        if(!post) return res.status(404).json({
            message:"Post no encontrado"
        });
        
        const deleteLik = await deleteLike(postId, userId)
        return res.status(200).json({message:"Like agregado", data: deleteLik})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el post" });
    }
})

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