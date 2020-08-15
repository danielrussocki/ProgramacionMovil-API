import { Request, Response } from 'express';
import User from '../models/User';
import { UserToken } from '../models/UserToken';
import auth from '../commons/Auth';

// Creado correctamente - 1
// Bad request - 2
// Usuario ya existe - 3
// Acceso incorrecto - 4
// Contraseña incorrecta - 5
// Cuenta no existe - 6
// Campos vacíos - 7

class AuthController {
    public async registerUser(req: Request, res: Response){
        const { nombre, apellidos, correo, password } = req.body;
        await User.findOrCreate({
            where: {
                correo_user: correo
            },
            defaults: {
                nombre_user: nombre,
                apellidos_user: apellidos,
                correos_user: correo,
                password_user: password
            }
        }).spread((user: any, created) => {
            if(created){
                return res.status(200).json({_status: 1});
            }
            res.status(400).json({_status: 3});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({_status: 2});
        });
    }
    public async loginUser(req: Request, res: Response){
        const { correo, password } = req.body;
        await User.findOne({
            where: {
                correo_user: correo
            }
        }).then(async (user: any) => {
            if(user === null) return res.status(400).json({_status: 6});
            await User.findOne({
                where: {
                    correo_user: correo,
                    password_user: password
                }
            }).then((userWithPass: any) => {
                if(userWithPass === null) return res.status(400).json({_status: 7});
                const beforeToken: UserToken = userWithPass.dataValues;
                auth.generateToken(beforeToken).then(generated => {
                    return res.json({token: generated});
                }).catch(err => {
                    console.log(err);
                    return res.sendStatus(400);
                });
            }).catch(err => {
                console.log(err);
                res.status(401).json({_status: 5});
            })
        }).catch(err => {
            console.log(err);
            res.status(401).json({_status: 4});
        })
    }
}

export const authController = new AuthController();