import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserToken } from '../models/UserToken';
import { token } from 'morgan';

class Auth {
    private AUTH_KEY = "PROGRAMACIONMOVIL";
    public validateToken(req: Request, res: Response, next: NextFunction){
        const token = req.headers["authorization"];
        if(!token) return res.status(401).send('Access denied!');
        try {
            jwt.verify(token, "PROGRAMACIONMOVIL");
            next();
        } catch(err){
            res.status(400).send('Invalid token!');
        }
    }
    public async generateToken(data: UserToken):Promise<string>{
        const _token = jwt.sign(data, this.AUTH_KEY, {
            expiresIn: 60 * 60 * 24
        });
        return _token;
    }
    public async getToken(data: string):Promise<string | { [key: string]: any; } | null>{
        const _token = jwt.decode(data);
        return _token;
    }
}

const auth = new Auth();
export default auth;