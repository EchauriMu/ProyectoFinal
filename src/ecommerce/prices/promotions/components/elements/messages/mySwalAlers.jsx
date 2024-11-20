import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Función para mostrar una alerta de confirmación
export const showMensajeConfirm = (mensaje) => {
    return new Promise((resolve) => {
      MySwal.fire({
        title: '¿Estás seguro?',
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal.fire(
            'Confirmado!',
            'La operación ha sido confirmada.',
            'success'
          );
          resolve(true); // Resuelve con 'true' si el usuario confirma
        } else {
          resolve(false); // Resuelve con 'false' si el usuario cancela
        }
      });
    });
  };

// Función para mostrar una alerta de error
export const showMensajeError = (mensaje) => {
    MySwal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar',
    });
};