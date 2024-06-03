import {Request, Response}  from 'express'
import pool from '../database'

class GymController {


    public async list (req: Request, res: Response): Promise<void> {
        const { table } = req.query
        var data: any = "";
        console.log(table)
        if(table == "clientes"){
            data = await pool.query(`SELECT clientes.id, tipos_documentos.nombre AS documento_id, clientes.identificacion, clientes.nombres, clientes.apellidos, clientes.telefono, clientes.email, clientes.nota, clientes.estado from ${table} INNER JOIN tipos_documentos ON clientes.documento_id = tipos_documentos.id`)
        } else {
            data = await pool.query(`SELECT * from ${table}`)
        }
        res.send({success: true, message: "Tabla listada", data: data[0]})
    }

    public async getOne (req: Request, res: Response): Promise<void> {
        console.log(req.query);
        const { table } = req.query
        const { id } = req.params
        //const cliente = await pool.query('SELECT * from clientes WHERE id = ?', [id]) //Esta es otra forma de hacerlo
        const cliente = await pool.query(`SELECT * from ${table} WHERE id = ${id}`)
        if(cliente[0].length > 0){
            res.send({message: "Cliente listado", clientes: cliente[0]})
        } else {
            res.status(404).json({message: "No existe."})
        }
    }
    
    public async create (req: Request, res: Response): Promise<void> {
        const { table } = req.query
        console.log(req.body)
        await pool.query(`INSERT INTO ${table} set ?`, [req.body])
        res.send({success: true, message: "Guardado con exito."})
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { table } = req.query
        const { id } = req.params
        await pool.query(`UPDATE ${table} set ? WHERE id = ${id}`, [req.body])
        res.json({success: true, message: "Actualizado con exito."})
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { table } = req.query
        const { id } = req.params
        await pool.query(`DELETE from ${table} WHERE id = ${id}`)
        res.send({success: true, message: "Aliminado con exito."})
    }
}

const gymController = new GymController();
export default gymController;