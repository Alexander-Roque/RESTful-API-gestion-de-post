import dotenv from "dotenv";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt  from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userId?:number;
            role?:string | undefined;
        }
    }
}

dotenv.config()

const jwtSecret =process.env.JWT_SECRET!;

interface JwtPayload {
    userId: number;
    role?: string;
    iat: number;
    exp: number;
}

export function authenticateHandler(requiredRole?:string){
    return (req: Request, res: Response, next: NextFunction) =>{
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
            res.status(401).send("Token no proporciona")
            return;
        }

        const payload = jwt.verify(token, jwtSecret) as unknown as JwtPayload;

        req.userId = payload.userId;
        req.role = payload.role;

        // verificamos el role
        if(requiredRole && requiredRole !== req.role){
                res.status(403).send("No tienes permisos para acceder")
                return;
            }

        // console.log("User ID:", payload.userId);
        return next();
    } catch {
       res.status(403).json({ error: "Token inválido o expirado" });
       return;
    }
};
}
