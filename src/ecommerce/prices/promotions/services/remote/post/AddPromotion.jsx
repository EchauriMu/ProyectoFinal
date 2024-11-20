import axios from 'axios';

export const addPromotion = async (id_lista_precios, promtionData) => {
    const response = await axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id_lista_precios}/promociones`, promtionData); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo o la respuesta de la API
};
