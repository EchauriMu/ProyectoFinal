import React, { useState } from 'react';
import NotesTable from '../tables/NotesTable';
import { NotesProvider } from '../../pages/NotesProvider'; 
import { PreciosProvider } from '../../../componentes/PreciosProvider';
import PreciosTablaSimple from '../../../componentes/PreciosTablaSimple';
import '../../assets/notes.css';

const NotesTab = () => {
    const [selectedListaPrecios, setSelectedListaPrecios] = useState(null); // Mueve esto dentro del componente

    return (
        <div className='contenedorNotas'>
            <PreciosProvider> 
                <PreciosTablaSimple onRowClick={setSelectedListaPrecios} />
            </PreciosProvider>
            <NotesProvider selectedListaPrecios={selectedListaPrecios}>
                <div className='TablaAlertas'>
                    <NotesTable selectedListaPrecios={selectedListaPrecios} />
                </div>
            </NotesProvider>
        </div>
    );
};

export default NotesTab;
