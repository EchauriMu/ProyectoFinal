import React from 'react';
import { useContexto } from './PreciosProvider';

const SeleccionadorActivo = () => {
  const { 
    activo,
    setActivo,
    borrado,
    setBorrado
   } = useContexto();

  const handleEstadoChange = (e) => {
    const value = e.target.value;
    if (value === "Activo") {
      setActivo("S");
      setBorrado("N");
    } else if (value === "Borrado") {
      setActivo("N");
      setBorrado("S");
    }
  };

  // Determinar el color de fondo según el valor de "activo"
  const selectClass = activo === "S" ? 'activo' : 'borrado';

  return (
    <div className='contendor-selecActivo'>
      <div className="selector-activo">
        <label htmlFor="estado">Estado</label>
        <select 
          id="estado" 
          value={activo === "S" ? "Activo" : "Borrado"} 
          onChange={handleEstadoChange} 
          className={selectClass}
        >
          <option value="Activo">Activo</option>
          <option value="Borrado">Borrado</option>
        </select>
      </div>
    </div>
  );
};

export default SeleccionadorActivo;
