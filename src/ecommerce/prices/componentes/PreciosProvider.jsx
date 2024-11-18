import React, { createContext, useState, useContext,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();
	const [userName, setUserName] = useState('');
	//Nombre del usuario
	useEffect(() => {
  const storedUserName = sessionStorage.getItem('usuario');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  
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
    activo,
    setActivo,
    borrado,
    setBorrado,
    dispatch
  }
  return (
    <PreciosProvinerContex.Provider value={contexto}>
      {children}
    </PreciosProvinerContex.Provider>
  );
};

export const useContexto = () => useContext(PreciosProvinerContex);