import { toast } from 'react-toastify';

export const TOAST_EXITO = (mensaje) => {
    toast.success(mensaje, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};