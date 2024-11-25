import axios from 'axios';

export const addNotes = async (id_lista_precios, notasData) => {
    const response = await axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id_lista_precios}/notas`, notasData); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};
