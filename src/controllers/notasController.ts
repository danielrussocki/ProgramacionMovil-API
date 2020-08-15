import { Request, Response } from 'express';
import Notas from '../models/Notas';
import auth from '../commons/Auth';

// 1 - Nota creada exitosamente
// 2 - Nota no existe
// 3 - Editada correctamente
// 4 - Eliminada correctamente

class NotasController {
    public async getAllNotes(req: Request, res: Response){
        const authToken = req.headers['authorization'];
        await auth.getToken(authToken!).then(async (decoded: any) => {
            const { id_user } = decoded;
            await Notas.findAll({
                attributes: [
                    'id_nota', 'titulo_nota',
                    'descripcion_nota', 'tipo_nota'
                ],
                where: {
                    usuario_nota: id_user
                }
            }).then(result => {
                return res.send(result);
                // return res.json({msg:'a'});
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }
    public async getNote(req: Request, res: Response){
        const authToken = req.headers['authorization'];
        const { id } = req.params;
        await auth.getToken(authToken!).then(async (decoded: any) => {
            const { id_user } = decoded;
            await Notas.findOne({
                where: {
                    id_nota: id,
                    usuario_nota: id_user
                }
            }).then(result => {
                if(result === null) return res.status(404).json({_status: 2})
                return res.send(result)
            }).catch(err => {
                console.log(err)
                return res.sendStatus(400)
            })
        }).catch(err => {
            console.log(err);
            return res.sendStatus(400)
        })
    }
    public async createSimpleNote(req: Request, res: Response){
        const authToken = req.headers['authorization'];
        await auth.getToken(authToken!).then(async (decoded: any) => {
            const { id_user } = decoded;
            const { titulo_nota, descripcion_nota, tipo_nota } = req.body;
            await Notas.create({
                id_nota: "",
                titulo_nota: titulo_nota,
                descripcion_nota: descripcion_nota,
                tipo_nota: tipo_nota,
                usuario_nota: id_user
            }).then(data => {
                console.log(data);
                res.status(200).json({_status: 1});
            }).catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
    public async editSimpleNote(req: Request, res: Response){
        const authToken = req.headers['authorization'];
        await auth.getToken(authToken!).then(async (decoded: any) => {
            const { id_user } = decoded;
            const { id } = req.params;
            const { titulo_nota, descripcion_nota, tipo_nota } = req.body;
            await Notas.update({
                titulo_nota: titulo_nota,
                descripcion_nota: descripcion_nota,
                tipo_nota: tipo_nota
            }, {
                where: {
                    id_nota: id,
                    usuario_nota: id_user
                }
            }).then(result => {
                return res.json({_status: 3});
            }).catch(err => {
                console.log(err);
                return res.sendStatus(400);
            });
        }).catch(err => {
            console.log(err);
            return res.sendStatus(400);
        })
    }
    public async deleteSimpleNote(req: Request, res: Response){
        const authToken = req.headers['authorization'];
        await auth.getToken(authToken!).then(async (decoded: any) => {
            const { id } = req.params;
            const { id_user } = decoded;
            await Notas.destroy({
                where: {
                    id_nota: id,
                    usuario_nota: id_user
                }
            }).then(result => {
                return res.json({_status: 4});
            }).catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        }).catch(err => {
            console.log(err);
            res.sendStatus(400)
        });
    }
}

export const notasController = new NotasController();