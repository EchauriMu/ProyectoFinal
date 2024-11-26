import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { addAlert } from '../../services/remote/post/AddAlert';
import { useFormik } from "formik";
import * as Yup from "yup";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AddAlertModal = ({ showModal, setShowModal, id_lista_precios }) => {
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
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
            fecha: Yup.date().required("La fecha es obligatoria"),
            reporte: Yup.boolean().required("El reporte es obligatorio"),
            mensaje: Yup.string().required("El mensaje es obligatorio")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            values.fecha = `${values.fecha}:00.000Z`;
            console.log("Valores enviados:", values);
            try {
                //console.log("id: ", id_lista_precios);
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
