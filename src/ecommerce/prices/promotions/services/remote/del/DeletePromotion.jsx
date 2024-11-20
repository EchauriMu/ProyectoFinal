import axios from "axios";

export function delPromotion(id_lista_precios, id_promotion) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id_lista_precios}/alertas/${id_promotion}`)
      .then((response) => {
        const data = response.data;

        // Considera que una eliminación exitosa puede no necesitar validaciones adicionales.
        if (data.success === false) {
          console.error("Error en la API (success=false):", data);
          reject(new Error("No se pudo eliminar la promocion correctamente."));
        } else {
          console.log("Promoción eliminada exitosamente:", data);
          resolve("Promoción eliminada exitosamente.");
        }
      })
      .catch((error) => {
        console.error("Error en delPromotion():", error);
        reject(error); // Manejo de errores del servidor o de la red
      });
  });
}
