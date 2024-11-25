import axios from "axios";

export function delNotes(id_lista_precios, id_notas) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_REST_API_ECOMMERCE}/listas-precios/${id_lista_precios}/notas/${id_notas}`)
      .then((response) => {
        const data = response.data;

        if (data.success === false) {
          console.error("Error en la API (success=false):", data);
          reject(new Error("No se pudo eliminar la Nota correctamente."));
        } else {
          console.log("Nota eliminada exitosamente:", data);
          resolve("Nota eliminada exitosamente.");
        }
      })
      .catch((error) => {
        console.error("Error en DeleteNotes():", error);
        reject(error); // Manejo de errores del servidor o de la red
      });
  });
}