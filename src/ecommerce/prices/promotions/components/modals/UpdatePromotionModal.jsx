import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { putPromotions } from '../../services/remote/put/PutPromotions';

const UpdatePromotionModal = ({ showModal, setShowModal, data, id_lista_precios }) => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            _id: data?._id || "",
            Activo: data?.Activo || "S",
            tipo: data?.tipo || "descuento_personalizado",
            descuento: data?.descuento || 0,
            condicion: data?.condicion || "No hay",
        },
        validationSchema: Yup.object({
            Activo: Yup.string().required("El estado activo (S o N) de descuento es obligatorio"),
            tipo: Yup.string().required("El tipo de descuento es obligatorio"),
            descuento: Yup.number()
                .typeError("El descuento debe ser un número")
                .required("El descuento es obligatorio"),
            condicion: Yup.string().required("La condición es obligatoria"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const preparedValues = {
                Activo: values.Activo,
                tipo: values.tipo,
                descuento: Number(values.descuento),
                condicion: values.condicion
            };

            try {
                await putPromotions(id_lista_precios, values._id, preparedValues);
                console.log("Promoción actualizada con éxito:", preparedValues);
                setShowModal(false);
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
                    <Typography>
                        <strong>Actualizar Promoción</strong>
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
                        <TextField
                            id="_id"
                            label="ID"
                            disabled
                            value={formik.values._id}
                        />
                        <br></br>
                        <TextField
                            id="Activo"
                            label="Estado de la promoción"
                            select
                            SelectProps={{ native: true }}
                            required
                            value={formik.values.Activo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Activo && Boolean(formik.errors.Activo)}
                            helperText={formik.touched.Activo && formik.errors.Activo}
                        >
                            <option value="S">Promoción activa</option>
                            <option value="N">Promoción inactiva</option>
                        </TextField>
                        <br></br>
                        <TextField
                            id="tipo"
                            label="Tipo de Descuento"
                            select
                            SelectProps={{ native: true }}
                            required
                            value={formik.values.tipo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tipo && Boolean(formik.errors.tipo)}
                            helperText={formik.touched.tipo && formik.errors.tipo}
                        >
                            <option value="descuento_volumen">Descuento por volumen</option>
                            <option value="descuento_personalizado">Descuento personalizado</option>
                        </TextField>
                        <br></br>
                        <TextField
                            id="descuento"
                            label="Descuento (%)"
                            required
                            value={formik.values.descuento}
                            onChange={(e) => formik.setFieldValue("descuento", e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.descuento && Boolean(formik.errors.descuento)}
                            helperText={formik.touched.descuento && formik.errors.descuento}
                        />
                        <br></br>
                        <TextField
                            id="condicion"
                            label="Condición*"
                            required
                            multiline
                            rows={3}
                            value={formik.values.condicion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.condicion && Boolean(formik.errors.condicion)}
                            helperText={formik.touched.condicion && formik.errors.condicion}
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
                        loading={loading}
                    >
                        GUARDAR
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdatePromotionModal;
