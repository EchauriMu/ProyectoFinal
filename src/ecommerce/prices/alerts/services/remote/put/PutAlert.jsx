import axios from 'axios';

export const putAlert = async (id_lista_precios,id_alerta,priceAlert) => {
    const response = await axios.put(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id_lista_precios}/alertas/${id_alerta}`, priceAlert); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};