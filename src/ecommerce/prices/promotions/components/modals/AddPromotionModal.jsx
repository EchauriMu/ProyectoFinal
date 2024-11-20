import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { addPromotion } from '../../services/remote/post/AddPromotion';
import { useFormik } from "formik";
import * as Yup from "yup";

const AddPromotionModal = ({ showModal, setShowModal, id_lista_precios }) => {
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            tipo: "descuento_personalizado",
            descuento: 0,
            condicion: "",
        },
        validationSchema: Yup.object({
            tipo: Yup.string().required("El tipo de descuento es obligatorio"),
            descuento: Yup.number()
                .typeError("El descuento debe ser un número")
                .required("El descuento es obligatorio"),
            condicion: Yup.string().required("La condición es obligatoria")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const preparedValues = {
                tipo: values.tipo,
                descuento: Number(values.descuento), // Aseguramos que el descuento sea numérico
                condicion: values.condicion,
            };
            console.log("Valores enviados:", preparedValues);
            try {
                await addPromotion(id_lista_precios, preparedValues); // Llama a la API o función para agregar la alerta
                setShowModal(false);
                console.log("Promoción agregada con éxito:", preparedValues);
            } catch (error) {
                console.error("Error al agregar la promoción:", error);
            }
            setLoading(false);
        },
    });

    return (
        <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nueva Promoción</strong>
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
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
                        onChange={(e) =>
                            formik.setFieldValue("descuento", e.target.value)
                        }
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
                        loading={Loading}
                    >
                        GUARDAR
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddPromotionModal;
