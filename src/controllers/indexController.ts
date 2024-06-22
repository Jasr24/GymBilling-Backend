import {Request, Response}  from 'express'
import encryptionService from '../service/encryptionService';
import metodosUtilidad from '../util/metodosUtilidad';
import pool from '../database'
const nodemailer = require('nodemailer');

class IndexController {


    public index (req: Request, res: Response) {
        res.send("Hello JasrGamer, this is a texts")
    }
    
    public async login (req: Request, res: Response): Promise<void> {
        const { usuario } = req.body
        const { contraseña } = req.body

        const encryptedContraseña = encryptionService.encrypt(contraseña);
        const administrador = await pool.query(`SELECT usuario, nombre, correo from users_admin WHERE usuario = "${usuario}" AND contraseña = "${encryptedContraseña}"`)
        if(administrador[0].length > 0){
            res.send({success: true, status: 1, message: "Administrador logueado exitosamente", administrador: administrador[0]})
        } else {
            const administrador = await pool.query(`SELECT * from users_admin WHERE usuario = ${usuario}`)
            if(administrador[0].length > 0){
                res.send({success: true, status: 0, message: "Contraseña incorrecta."})
            } else {
                res.send({success: true, status: 0, message: "Usuario no existe."})
            }
        }
    }

    public async recuperarContraseña(req: Request, res: Response): Promise<void> {
        const { usuario } = req.body;

        // Consulta para obtener el administrador por el usuario
        let administrador = await pool.query(`SELECT * FROM users_admin WHERE usuario = ${pool.escape(usuario)}`);

        if (administrador[0].length > 0) {
            const contraseñaTemporal = metodosUtilidad.generarContraseñaTemporal()
            await pool.query(`UPDATE users_admin SET contraseña_temporal = '${contraseñaTemporal}' WHERE id = ${administrador[0][0].id}`);
            administrador = await pool.query(`SELECT * FROM users_admin WHERE usuario = ${pool.escape(usuario)}`);

            // Configuración del transporte de correo con nodemailer
            const transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "3fbd96805cf90d",
                  pass: "5cedc0c330b9d2"
                }
            });

            // Opciones del correo electrónico
            const mailOptions = {
                from: 'gym-billing@sw.com',
                to: administrador[0][0].correo, // Usar el correo del administrador obtenido de la base de datos
                subject: 'Recuperación de contraseña',
                text: `Hola ${administrador[0][0].nombre}, aquí está tu nueva contraseña temporal: ${administrador[0][0].contraseña_temporal}`
            };

            // Enviar el correo electrónico
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error al enviar el correo:", error);
                    res.status(500).send({ success: false, status: 0, message: "Error al enviar el correo." });
                } else {
                    console.log("Correo electrónico enviado:", info.response);
                    res.send({ success: true, status: 1, message: "Correo enviado correctamente." });
                }
            });
        } else {
            res.send({ success: false, status: 0, message: "Usuario no encontrado." });
        }
    }
}

export const indexController = new IndexController();