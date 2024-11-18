import axios from "axios";

export function delAlert(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/9001-000000000001/alertas/${id}`)
        .then((response) => {
          const data = response.data;
         // console.log("getPrIce()", data);
          if (!data.success) {
            console.error("No se pudo realizar correctamente la petición delAlert():", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          } else if (data.data.length === 0) {
            console.info("🛈 No se encontraron elementos para delAlert():");
            resolve([]); 
          } else if (data.success) {
            const precios = data.data[0].dataRes;
            console.log("Alertas: ", precios);
            resolve(JSON.parse(JSON.stringify(precios))); // Resuelve la promesa y hace una copia profunda
          }
        })
        .catch((error) => {
          console.error("Error en delAlert():", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }