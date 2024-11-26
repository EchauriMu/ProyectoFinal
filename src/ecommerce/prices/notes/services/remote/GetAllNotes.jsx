import axios from "axios";

export function getAllNotes(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id}/notas`)
            .then((response) => {
                const data = response.data;
                if (!Array.isArray(data) || data.length === 0) {
                    console.info("No se encontraron datos de notas de listas de precios");
                    resolve([]);
                } else {
                    // Asegúrate de que estás accediendo a la propiedad 'precios' en el primer objeto de la respuesta
                    const notesData = data;
                    console.log("Datos de precios obtenidos:", data);
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("Error en el servicio de Notas. ", error);
                reject(error);
            });
    });
}
