import axios from "axios";

export function getAllPromotions(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id}/promociones`)
            .then((response) => {
                const data = response.data;
                if (!Array.isArray(data) || data.length === 0) {
                    console.info("No se encontraron datos de listas de promociones");
                    resolve([]);
                } else {
                    const alertsData = data;
                    console.log("Datos de precios obtenidos:", data);
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("Error en el servicio de promociones. ", error);
                reject(error);
            });
    });
}
