import dotenv from "dotenv";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt  from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userId?:number;
        }
    }
}

dotenv.config()

const jwtSecret =process.env.JWT_SECRET!;

interface JwtPayload {
    userId: number;
    iat: number;
    exp: number;
}

export function authenticateHandler (requiredRole?:string): RequestHandler{
    const middleware: RequestHandler = (req: Request, res: Response, next: NextFunction) =>{
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
            res.status(401).send("Token no proporciona")
            return;
        }

        const payload = jwt.verify(token, jwtSecret) as unknown as JwtPayload;

        req.userId = payload.userId;

        console.log("User ID:", payload.userId);
        next();
    } catch {
        res.status(403).json({ error: "Token inválido o expirado" });
    }
};
return middleware
}
