import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { addNotes } from '../../services/remote/post/AddNotes';
import { useFormik } from "formik";
import * as Yup from "yup";

const AddNotesModal = ({ showModal, setShowModal, id_lista_precios }) => {
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            _id: "",
            Usuario: "Juan",
            Fecha: "",
            Comentario: "",
            Categoria: "",
            Prioridad: "Baja",
            Estado: "En proceso"
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
            console.log("Valores enviados:", values);
            try {
                await addNotes(id_lista_precios, values); // Llama a la API o función para agregar la Nota
                setShowModal(false);
                console.log("Nota agregada con éxito:", values);
            } catch (error) {
                console.error("Error al agregar la Nota:", error);
            }
            setLoading(false);
        },
    });

    return (
        <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nueva Nota</strong>
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

export default AddNotesModal;
