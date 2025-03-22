import { categorias } from "../../../utils/oracle/oracle";

export default defineEventHandler(async (event) => {   
    try {
        // Eliminamos de la base de datos
        const data = await categorias.destroy({
            where: {
                id: event.context.params.id
            }
        });

        if (data === 0) {
            return { statusCode: 404, message: "Categoría no encontrada" };
        }

        return { statusCode: 200, message: "Eliminado correctamente" };
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        return { statusCode: 500, error: "Error interno del servidor" };
    }
});