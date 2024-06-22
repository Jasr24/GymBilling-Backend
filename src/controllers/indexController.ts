import {Request, Response}  from 'express'
import encryptionService from '../service/encryptionService';
import pool from '../database'

class IndexController {


    public index (req: Request, res: Response) {
        res.send("Hello JasrGamer, this is a texts")
    }
    
    public async login (req: Request, res: Response): Promise<void> {
        const { usuario } = req.body
        const { contraseña } = req.body

        const encryptedContraseña = encryptionService.encrypt(contraseña);
        const administrador = await pool.query(`SELECT usuario, correo from users_admin WHERE usuario = "${usuario}" AND contraseña = "${encryptedContraseña}"`)
        if(administrador[0].length > 0){
            res.send({message: "Administrador logueado exitosamente", administrador: administrador[0]})
        } else {
            const administrador = await pool.query(`SELECT * from users_admin WHERE usuario = ${usuario}`)
            if(administrador[0].length > 0){
                res.send({message: "Contraseña incorrecta."})
            } else {
                res.send({message: "Usuario no existe."})
            }
        }
    }
}

export const indexController = new IndexController();