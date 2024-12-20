import React, {useState, useEffect} from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";

import { putAlert } from '../../services/remote/put/PutAlert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import { addPrice } from '../../services/remote/post/AddPrice';
//import MyAddLabels from "../elements/MyAddLabels"; 
//import axios from 'axios';
//import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";


const UpdateAlertModal = ({ showModal, setShowModal, data , id_lista_precios}) => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,  // Permite que los valores iniciales cambien cuando se recibe nueva data
        
        initialValues: {
            _id: data?._id || "",
            fecha: data?.fecha && !isNaN(new Date(data.fecha)) ? new Date(data.fecha).toISOString().slice(0, 16) : "2024-01-01T00:00",
            Activo: data?.Activo || "S",
            Borrado: data?.Borrado || "N",
            reporte: data?.reporte === "Sí" ? true : false,
            mensaje: data?.mensaje || "",
            detail_row_reg: data?.detail_row_reg || [
                {
                  _id: "67156acabc57b06756104d6b",
                  FechaReg: "2025-01-25T00:00:00.628Z",
                  UsuarioReg: "aramis"
                }
            ]
        },
        validationSchema: Yup.object({
            _id: Yup.string().required("El ID es obligatorio"),
            fecha: Yup.date().required("La fecha es obligatoria"),
            reporte: Yup.boolean().required("El reporte es obligatorio"),
            mensaje: Yup.string().required("El mensaje es obligatorio")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            values.fecha = `${values.fecha}:00.000Z`;
            console.log("Datos actualizados:", values);
            
            try {
                // Aquí se llamará a la API PUT
                await putAlert(id_lista_precios, values._id,values); // Llama a la API para agregar el precio
                console.log("Alerta actulizada con éxito:", values);

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
                        <strong>Actualizar Alerta</strong>
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
                    style={{ display: 'none' }} // Estilo para ocultar el campo
                />
                    <TextField
                        id="fecha"
                        label="Fecha"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        required
                        value={formik.values.fecha}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                        helperText={formik.touched.fecha && formik.errors.fecha}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                            id="reporte"
                            checked={formik.values.reporte}
                            onChange={(e) => formik.setFieldValue("reporte", e.target.checked)}
                            onBlur={formik.handleBlur}
                            />
                        }
                        label="Reporte"
                    />
                    <TextField
                        id="mensaje"
                        label="Mensaje*"
                        required
                        multiline
                        rows={3}
                        value={formik.values.mensaje}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.mensaje && Boolean(formik.errors.mensaje)}
                        helperText={formik.touched.mensaje && formik.errors.mensaje}
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

export default UpdateAlertModal;
