class MetodosUtilidad {

    constructor() {
    }

    generarContraseñaTemporal() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let contraseña = '';
        const longitud = 12; // Longitud de la contraseña
    
        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            contraseña += caracteres.charAt(indice);
        }
    
        return contraseña;
    }

}
const metodosUtilidad = new MetodosUtilidad();
export default metodosUtilidad;