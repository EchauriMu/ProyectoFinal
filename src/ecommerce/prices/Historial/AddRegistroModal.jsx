import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddRegistroModal = ({ onClose, selectedLista, selectedPresentaOK, setRegistros,maxId }) => {
  if (!selectedLista || !selectedPresentaOK) return null;
  console.log(maxId);
  const validationSchema = Yup.object({
    Formula: Yup.string().required("La fórmula es requerida"),
    CostoIni: Yup.number().required("Costo inicial es requerido"),
    CostoFin: Yup.number().required("Costo final es requerido"),
    Precio: Yup.number().required("El precio es requerido"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newId = maxId + 1; // Usar el máximo ID recibido como prop y sumarle 1
  
    const payload = {
      ...values,
      Id: newId, // Asignar el nuevo ID generado
      detail_row: {
        Activo: "S",
        Borrado: "N",
        detail_row_reg: [
          {
            FechaReg: new Date().toISOString(),
            UsuarioReg: "Carlos",
          },
        ],
      },
    };
  
    axios
      .post(
        `${import.meta.env.VITE_REST_API_PRECIOS}/historial/${selectedLista.IdListaOK}/historial/${selectedPresentaOK.IdPresentaOK}`,
        payload
      )
      .then((response) => {
        setRegistros((prev) => [...prev, response.data]); // Actualiza los registros con el nuevo registro
        resetForm(); // Limpiar el formulario
        onClose(); // Cerrar el modal
      })
      .catch((error) => console.error("Error al agregar registro:", error));
  };
  

  return (
    <div className="addregistrohistorial-modal-overlay">
      <div className="addregistrohistorial-modal-content">
        <h4>Agregar Registro</h4>
        <Formik
          initialValues={{
            Formula: "",
            CostoIni: "",
            CostoFin: "",
            Precio: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="addregistrohistorial-form">
              <div className="addregistrohistorial-form-group">
                <label>Fórmula:</label>
                <Field
                  name="Formula"
                  className={
                    errors.Formula && touched.Formula
                      ? "addregistrohistorial-input addregistrohistorial-input-error"
                      : "addregistrohistorial-input"
                  }
                />
                <ErrorMessage name="Formula" component="div" className="addregistrohistorial-error-message" />
              </div>
              <div className="addregistrohistorial-form-group">
                <label>Costo Inicial:</label>
                <Field
                  name="CostoIni"
                  type="number"
                  className={
                    errors.CostoIni && touched.CostoIni
                      ? "addregistrohistorial-input addregistrohistorial-input-error"
                      : "addregistrohistorial-input"
                  }
                />
                <ErrorMessage name="CostoIni" component="div" className="addregistrohistorial-error-message" />
              </div>
              <div className="addregistrohistorial-form-group">
                <label>Costo Final:</label>
                <Field
                  name="CostoFin"
                  type="number"
                  className={
                    errors.CostoFin && touched.CostoFin
                      ? "addregistrohistorial-input addregistrohistorial-input-error"
                      : "addregistrohistorial-input"
                  }
                />
                <ErrorMessage name="CostoFin" component="div" className="addregistrohistorial-error-message" />
              </div>
              <div className="addregistrohistorial-form-group">
                <label>Precio:</label>
                <Field
                  name="Precio"
                  type="number"
                  className={
                    errors.Precio && touched.Precio
                      ? "addregistrohistorial-input addregistrohistorial-input-error"
                      : "addregistrohistorial-input"
                  }
                />
                <ErrorMessage name="Precio" component="div" className="addregistrohistorial-error-message" />
              </div>
              <div className="addregistrohistorial-modal-actions">
                <button type="submit" className="addregistrohistorial-btn-submit">
                  Guardar
                </button>
                <button type="button" className="addregistrohistorial-btn-cancel" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddRegistroModal;
