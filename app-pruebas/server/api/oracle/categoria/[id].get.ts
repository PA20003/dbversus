import { categorias } from "../../../utils/oracle/oracle";

export default defineEventHandler(async (event) => {      
    try {
        const data = await categorias.findOne({ where: { id: event.context.params.id } });
        return data;
    } catch (error) {
        console.error('Unable to connect to the Oracle database:', error);
        return error;
    }
});
