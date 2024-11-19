import axios from "axios";

export function getAllAlerts(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id}/alertas`)
            .then((response) => {
                const data = response.data;
                if (!Array.isArray(data) || data.length === 0) {
                    console.info("No se encontraron datos de alertas de listas de precios");
                    resolve([]);
                } else {
                    // Asegúrate de que estás accediendo a la propiedad 'precios' en el primer objeto de la respuesta
                    const alertsData = data;
                    //const alertsData = data.flatMap(item => item.alertas); // Combina todos los arrays de precios
                    //console.log("Datos de precios obtenidos:", alertsData);
                    console.log("Datos de precios obtenidos:", data);
                    //resolve(alertsData);
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("Error en el servicio de alertas. ", error);
                reject(error);
            });
    });
}
