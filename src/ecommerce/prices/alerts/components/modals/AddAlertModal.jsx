import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { addAlert } from '../../services/remote/post/AddAlert';
import { useFormik } from "formik";
import * as Yup from "yup";

const AddAlertModal = ({ showModal, setShowModal, id_lista_precios }) => {
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            _id: "",
            fecha: "",
            Activo: "S",
            Borrado: "N",
            reporte: true,
            mensaje: "",
            detail_row_reg: [
                  {
                    _id: "67156acabc57b06756104d6b",
                    FechaReg: "2024-10-15T00:00:00.628Z",
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
            console.log("Valores enviados:", values);
            try {
                await addAlert(id_lista_precios, values); // Llama a la API o función para agregar la alerta
                setShowModal(false);
                console.log("Alerta agregada con éxito:", values);
            } catch (error) {
                console.error("Error al agregar la alerta:", error);
            }
            setLoading(false);
        },
    });

    return (
        <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nueva Alerta</strong>
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
                    <TextField
                        id="reporte"
                        label="Reporte"
                        select
                        SelectProps={{ native: true }}
                        required
                        value={formik.values.reporte}
                        onChange={(e) => formik.setFieldValue("reporte", e.target.value === "true")}
                        onBlur={formik.handleBlur}
                        error={formik.touched.reporte && Boolean(formik.errors.reporte)}
                        helperText={formik.touched.reporte && formik.errors.reporte}
                    >
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                    </TextField>
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
                        type="submit"
                        loading={Loading}
                    >
                        GUARDAR
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddAlertModal;
