import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../assets/Historial.css'; // Archivo CSS para estilos específicos

const EditModal = ({
  registro,
  onClose,
  selectedLista,
  selectedPresentaOK,
  setRegistros, // Recibe setRegistros como prop
}) => {
  if (!registro) return null;

  const validationSchema = Yup.object({
    Formula: Yup.string().required('La fórmula es requerida'),
    CostoIni: Yup.number().required('Costo inicial es requerido'),
    CostoFin: Yup.number().required('Costo final es requerido'),
    Precio: Yup.number().required('El precio es requerido'),
  });

  const handleSubmit = (values) => {
    const { Id } = registro;
    axios
      .put(
        `${import.meta.env.VITE_REST_API_PRECIOS}/historial/${selectedLista.IdListaOK}/historial/${selectedPresentaOK.IdPresentaOK}/${Id}`,
        values
      )
      .then(() => {
        // Actualiza el estado de registros en Historial.jsx
        setRegistros((prevRegistros) =>
          prevRegistros.map((item) =>
            item.Id === Id ? { ...item, ...values } : item
          )
        );
        onClose(); // Cierra el modal
      })
      .catch((error) => console.error('Error al actualizar:', error));
  };

  return (
    <div className="editregistrohistorial-modal-overlay">
      <div className="editregistrohistorial-modal-content">
        <h4>Editar Registro</h4>
        <Formik
        initialValues={{
          Formula: registro.Formula || '',
          CostoIni: registro.CostoIni || '',
          CostoFin: registro.CostoFin || '',
          Precio: registro.Precio || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="editregistrohistorial-form">
            <div className="editregistrohistorial-form-group">
              <label>Id:</label>
              <Field
                name="Id"
                value={registro.Id}
                disabled
                className="editregistrohistorial-input-disabled"
              />
            </div>
            <div className="editregistrohistorial-form-group">
              <label>Fórmula:</label>
              <Field
                name="Formula"
                className={
                  errors.Formula && touched.Formula
                    ? 'editregistrohistorial-input editregistrohistorial-input-error'
                    : 'editregistrohistorial-input'
                }
              />
              <ErrorMessage
                name="Formula"
                component="div"
                className="editregistrohistorial-error-message"
              />
            </div>
            <div className="editregistrohistorial-form-group">
              <label>Costo Inicial:</label>
              <Field
                name="CostoIni"
                type="number"
                className={
                  errors.CostoIni && touched.CostoIni
                    ? 'editregistrohistorial-input editregistrohistorial-input-error'
                    : 'editregistrohistorial-input'
                }
              />
              <ErrorMessage
                name="CostoIni"
                component="div"
                className="editregistrohistorial-error-message"
              />
            </div>
            <div className="editregistrohistorial-form-group">
              <label>Costo Final:</label>
              <Field
                name="CostoFin"
                type="number"
                className={
                  errors.CostoFin && touched.CostoFin
                    ? 'editregistrohistorial-input editregistrohistorial-input-error'
                    : 'editregistrohistorial-input'
                }
              />
              <ErrorMessage
                name="CostoFin"
                component="div"
                className="editregistrohistorial-error-message"
              />
            </div>
            <div className="editregistrohistorial-form-group">
              <label>Precio:</label>
              <Field
                name="Precio"
                type="number"
                className={
                  errors.Precio && touched.Precio
                    ? 'editregistrohistorial-input editregistrohistorial-input-error'
                    : 'editregistrohistorial-input'
                }
              />
              <ErrorMessage
                name="Precio"
                component="div"
                className="editregistrohistorial-error-message"
              />
            </div>
            <div className="editregistrohistorial-modal-actions">
              <button type="submit" className="editregistrohistorial-btn-submit">
                Guardar
              </button>
              <button
                type="button"
                className="editregistrohistorial-btn-cancel"
                onClick={onClose}
              >
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

export default EditModal;
