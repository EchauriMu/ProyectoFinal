import axios from 'axios';

export const addAlert = async (id_lista_precios, alertData) => {
    const response = await axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id_lista_precios}/alertas`, alertData); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};
