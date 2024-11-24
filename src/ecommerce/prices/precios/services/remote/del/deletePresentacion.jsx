import axios from "axios";

export function deletePresentacion(id, idPresentaOK) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id}/precio/${idPresentaOK}`)
      .then((response) => {
        const data = response.data;

        // Considera que una eliminación exitosa puede no necesitar validaciones adicionales.
        if (data.success === false) {
          console.error("Error en la API (success=false):", data);
          reject(new Error("No se pudo eliminar el precio correctamente."));
        } else {
          console.log("Precio eliminado exitosamente:", data);
          resolve("Promoción eliminada exitosamente.");
        }
      })
      .catch((error) => {
        console.error("Error en deletePresentacion():", error);
        reject(error); // Manejo de errores del servidor o de la red
      });
  });
}
