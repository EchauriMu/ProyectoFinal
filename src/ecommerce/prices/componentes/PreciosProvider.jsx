import React, { createContext, useState, useContext,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const PreciosProvinerContex = createContext();

export const PreciosProvider = ({ children }) => {
  
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [selectedProdServId, setSelectedProdServId] = useState("");
  const [selectedPresentaId, setSelectedPresentaId] = useState("");
  const [idPresentaOK, setIdPresentaOK] = useState("")
  const [idTipoFormulaOK, setIdTipoFormulaOK] = useState("")
  const [formula, setFormula] = useState("")
  const [costoIni, setCostoIni] = useState("");
	const [costoFin, setCostoFin] = useState("");
  const [activo, setActivo] = useState("S");
  const [borrado, setBorrado] = useState("N");
  const [botonesHabilitado, setBotonesHabilitado] = useState(true);
  const dispatch = useDispatch();
	const [userName, setUserName] = useState('');
  const { precioData, loading, error } = useSelector((state) => state.precio);

  // Estado local
  const [showNewPresentacionInput, setShowNewPresentacionInput] = useState(false);

	//Nombre del usuario
	useEffect(() => {
  const storedUserName = sessionStorage.getItem('usuario');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  //Validación de Yup
  const validationSchema = Yup.object({
    IdPresentaOK: Yup.number()
    .required("La presentación es obligatoria."),
    IdTipoFormulaOK: Yup.string().required("El tipo de fórmula es obligatorio."),
    Formula: Yup.string().required("La fórmula es obligatoria."),
    CostoIni: Yup.number().required("El costo inicial es obligatorio.").min(0, "El costo inicial debe ser mayor o igual a 0."),
    CostoFin: Yup.number().required("El costo final es obligatorio.").min(Yup.ref('CostoIni'), "El costo final debe ser mayor o igual al costo inicial."),
    Precio: Yup.number().required("El precio es obligatorio.").min(0, "El precio debe ser mayor o igual a 0."),
  });
  const contexto ={
    nuevoPrecio, setNuevoPrecio,
    selectedProdServId, setSelectedProdServId,
    selectedPresentaId, setSelectedPresentaId,
    idPresentaOK, setIdPresentaOK,
    idTipoFormulaOK, setIdTipoFormulaOK,
    formula, setFormula,
    costoIni, setCostoIni,
    costoFin, setCostoFin,
    userName, setUserName,
    botonesHabilitado, setBotonesHabilitado,
    
    activo,
    setActivo,
    borrado,
    setBorrado,
    dispatch,

    precioData, loading, error,
    showNewPresentacionInput, setShowNewPresentacionInput,
    validationSchema
  }
  return (
    <PreciosProvinerContex.Provider value={contexto}>
      {children}
    </PreciosProvinerContex.Provider>
  );
};

export const useContexto = () => useContext(PreciosProvinerContex);