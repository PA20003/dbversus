import { categorias } from "../../utils/oracle/oracle"; // Cambia el path según corresponda a tu configuración

export default defineEventHandler(async (event) => {
    // Leemos el cuerpo de la solicitud
    const body = await readBody(event);
    //console.log(body)

    try {
        // Aquí usamos el ORM para insertar los datos en Oracle
        const data = await categorias.create({
            id: body.id,
            nombre: body.nombre,
        });
        return { statusCode: 200, message: "insertado" };
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        return { statusCode: 500, message: 'Error al insertar', error: error.message };
    }
});
