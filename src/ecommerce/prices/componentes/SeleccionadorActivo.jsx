import React from 'react';
import { useContexto } from './PreciosProvider';

const SeleccionadorActivo = () => {
  const { 
    activo,
    setActivo,
    borrado,
    setBorrado
   } = useContexto();

  const handleActivoChange = (e) => {
    setActivo(e.target.value);
  };

  const handleBorradoChange = (e) => {
    setBorrado(e.target.value);
  };

  return (
    <div>
      <div className="selector-activo">
        <label htmlFor="activo">Activo</label>
        <select id="activo" value={activo} onChange={handleActivoChange}>
          <option value="S">Sí</option>
          <option value="N">No</option>
        </select>
        <label htmlFor="borrado">Borrado</label>
        <select id="borrado" value={borrado} onChange={handleBorradoChange}>
          <option value="N">No</option>
          <option value="S">Sí</option>
        </select>
      </div>
    </div>
  );
};

export default SeleccionadorActivo;