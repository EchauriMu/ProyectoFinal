import React, {useState, useEffect} from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { putNotes } from '../../services/remote/put/putNotes';
//import { addPrice } from '../../services/remote/post/AddPrice';
//import MyAddLabels from "../elements/MyAddLabels"; 
import axios from 'axios';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const UpdateNotesModal = ({ showModal, setShowModal, data , id_lista_precios}) => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,  // Permite que los valores iniciales cambien cuando se recibe nueva data
        
        initialValues: {
            _id: data?._id || "",
            Usuario: data?.Usuario || "",
            Fecha: data?.Fecha && !isNaN(new Date(data.fecha)) ? new Date(data.fecha).toISOString().slice(0, 16) : "2024-01-01T00:00",
            /*fecha: data?.fecha && !isNaN(Date.parse(data.fecha))
            ? `${new Date(data.fecha).getFullYear()}-${String(new Date(data.fecha).getMonth() + 1).padStart(2, '0')}-${String(new Date(data.fecha).getDate()).padStart(2, '0')}T${String(new Date(data.fecha).getHours()).padStart(2, '0')}:${String(new Date(data.fecha).getMinutes()).padStart(2, '0')}`
            : "2024-01-01T00:00",*/
            Comentario: data?.Comentario || "",
            Categoria: data?.Categoria || "",
            Prioridad: data?.Prioridad || "",
            Estado: data?.Estado || "",
        },
        validationSchema: Yup.object({
            _id: Yup.string().required("El ID es obligatorio"),
            Usuario: Yup.string().required("El Usuario es obligatorio"),
            Fecha: Yup.date().required("La fecha es obligatoria"),
            Comentario: Yup.string().required("El comentario es obligatorio"),
            Categoria: Yup.string().required("La categoria es obligatoria"),
            Prioridad: Yup.string().required("LA prioridad es obligatorio"),
            Estado: Yup.string().required("El Estado es obligatorio")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            values.Fecha = `${values.Fecha}:00.000Z`;
            console.log("Datos actualizados:", values);
            
            try {
                // Aquí se llamará a la API PUT
                await putNotes(id_lista_precios, values._id,values); // Llama a la API para agregar el precio
                console.log("Nota actulizada con éxito:", values);

                setShowModal(false); // Cierra el modal al completar la solicitud
                
            } catch (error) {
                console.error("Error al actualizar:", error);
            }
            setLoading(false);
        },
    });

    useEffect(() => {
        console.log('Datos recibidos para edición:', data);
        console.log('id lista precios: ', id_lista_precios);
    }, [data]);

    return (
        <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography > {/* Cambiado de h6 a h5 */}
                        <strong>Actualizar Precio</strong>
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
                <TextField
                        id="_id"
                        label="ID"
                        required
                        value={formik.values._id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched._id && Boolean(formik.errors._id)}
                        helperText={formik.touched._id && formik.errors._id}
                        disabled
                    />
                    <TextField
                        id="Usuario"
                        label="Usuario*"
                        required
                        multiline
                        rows={3}
                        value={formik.values.Usuario}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Usuario && Boolean(formik.errors.Usuario)}
                        helperText={formik.touched.Usuario && formik.errors.Usuario}
                    />
                    <TextField
                        id="Fecha"
                        label="Fecha"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        required
                        value={formik.values.Fecha}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Fecha && Boolean(formik.errors.Fecha)}
                        helperText={formik.touched.Fecha && formik.errors.Fecha}
                    />
                    <TextField
                        id="Comentario"
                        label="Comentario*"
                        required
                        multiline
                        rows={3}
                        value={formik.values.Comentario}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Comentario && Boolean(formik.errors.Comentario)}
                        helperText={formik.touched.Comentario && formik.errors.Comentario}
                    />
                    <TextField
                        id="Categoria"
                        label="Categoria*"
                        required
                        multiline
                        rows={3}
                        value={formik.values.Categoria}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Categoria && Boolean(formik.errors.Categoria)}
                        helperText={formik.touched.Categoria && formik.errors.Categoria}
                    />
                    <TextField
                        id="Prioridad"
                        label="Prioridad*"
                        required
                        multiline
                        rows={3}
                        value={formik.values.Prioridad}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Prioridad && Boolean(formik.errors.Prioridad)}
                        helperText={formik.touched.Prioridad && formik.errors.Prioridad}
                    />
                    <TextField
                        id="Estado"
                        label="Estado*"
                        required
                        multiline
                        rows={3}
                        value={formik.values.Estado}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Estado && Boolean(formik.errors.Estado)}
                        helperText={formik.touched.Estado && formik.errors.Estado}
                    />
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setShowModal(false)}
                    >
                        CERRAR
                    </LoadingButton>
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit" // Cambiar a tipo submit
                        loading={loading}
                    >
                        GUARDAR
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateNotesModal;
