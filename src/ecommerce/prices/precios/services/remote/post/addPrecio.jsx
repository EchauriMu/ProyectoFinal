import axios from 'axios';

export const addPrecio = async (id, data) => {
    return new Promise((resolve, reject) => {
        axios
          .post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id}`,data)
          .then((response) => {
            const data = response.data;
    
            // Considera que una eliminación exitosa puede no necesitar validaciones adicionales.
            if (data.success === false) {
              console.error("Error en la API (success=false):", data);
              reject(new Error("No se pudo agregar el precio correctamente."));
            } else {
              console.log("Precio agregar exitosamente:", data);
              resolve("Precio agregar exitosamente.");
            }
          })
          .catch((error) => {
            console.error("Error en addPrecio():", error);
            reject(error); // Manejo de errores del servidor o de la red
          });
      });
};
