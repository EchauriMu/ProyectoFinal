import axios from 'axios';

export const addAlert = async (alertData) => {
    const response = await axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/9001-000000000001/alertas`, alertData); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};
