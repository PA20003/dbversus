import { detalleorden } from "../../utils/mysql";
export default defineEventHandler(async (event) => {
    // imprimimos en consola la data que recibimos
    const body = await readBody(event);
    //console.log(body)    
    try {
        //valido que en el body vengan todos los campos requeridos        
        if (!body.idorden || !body.idproducto || !body.cantidad || body.cantidad < 0 || !body.precio) {
            return { statusCode: 400, "message": "Faltan campos requeridos" };
        }
        //ahora guardo en la base de datos
        //await db.sequelize.authenticate();
        const data = await detalleorden.create({
            idorden: body.idorden,
            idproducto: body.idproducto,
            cantidad: body.cantidad,
            precio: body.precio
        });
        return { statusCode: 200, "message": "insertado" };
    } catch (error) {
        console.error('Tenemos un error:', error);
        return (error);
    }
})
