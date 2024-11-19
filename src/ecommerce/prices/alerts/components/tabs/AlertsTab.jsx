import React, { useState } from 'react';
import AlertsTable from '../tables/AlertsTable';
import { AlertsProvider } from '../../pages/AlertsProvider'; 
import { PreciosProvider } from '../../../componentes/PreciosProvider';
import PreciosTablaSimple from '../../../componentes/PreciosTablaSimple';

const AlertsTab = () => {
    const [selectedListaPrecios, setSelectedListaPrecios] = useState(null); // Mueve esto dentro del componente

    return (
        <div>
            <PreciosProvider> 
                <PreciosTablaSimple onRowClick={setSelectedListaPrecios} />
            </PreciosProvider>
            <AlertsProvider selectedListaPrecios={selectedListaPrecios}>
                <div>
                    <AlertsTable selectedListaPrecios={selectedListaPrecios} />
                </div>
            </AlertsProvider>
        </div>
    );
};

export default AlertsTab;
