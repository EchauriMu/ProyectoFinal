import axios from 'axios';

export const putPrecio = async (id, data) => {
    return new Promise((resolve, reject) => {
        axios
          .put(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id}`,data)
          .then((response) => {
            const data = response.data;
    
            // Considera que una eliminación exitosa puede no necesitar validaciones adicionales.
            if (data.success === false) {
              console.error("Error en la API (success=false):", data);
              reject(new Error("No se pudo actualizar el precio correctamente."));
            } else {
              console.log("Precio actualizado exitosamente:", data);
              resolve("Precio actualizado exitosamente.");
            }
          })
          .catch((error) => {
            console.error("Error en putPrecio():", error);
            reject(error); // Manejo de errores del servidor o de la red
          });
      });
};