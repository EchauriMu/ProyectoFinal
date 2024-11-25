import axios from 'axios';

export const putNotes = async (id_lista_precios,id_notas,priceNotas) => {
    const response = await axios.put(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id_lista_precios}/notas/${id_notas}`, priceNotas); // Ajusta la URL según tu API
    return response.data; // Devuelve el nuevo precio o la respuesta de la API
};