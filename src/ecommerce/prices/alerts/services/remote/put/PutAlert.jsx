import axios from 'axios';

export const putAlert = async (id,priceAlert) => {
    const response = await axios.put(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/9001-000000000001/alertas/${id}`, priceAlert); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};