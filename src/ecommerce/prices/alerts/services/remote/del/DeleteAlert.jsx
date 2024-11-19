import axios from "axios";

export function delAlert(id_lista_precios, id_alerta) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id_lista_precios}/alertas/${id_alerta}`)
      .then((response) => {
        const data = response.data;

        // Considera que una eliminación exitosa puede no necesitar validaciones adicionales.
        if (data.success === false) {
          console.error("Error en la API (success=false):", data);
          reject(new Error("No se pudo eliminar la alerta correctamente."));
        } else {
          console.log("Alerta eliminada exitosamente:", data);
          resolve("Alerta eliminada exitosamente.");
        }
      })
      .catch((error) => {
        console.error("Error en delAlert():", error);
        reject(error); // Manejo de errores del servidor o de la red
      });
  });
}
