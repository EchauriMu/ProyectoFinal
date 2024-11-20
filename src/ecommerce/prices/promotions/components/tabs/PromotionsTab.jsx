import React, { useState } from 'react';
import PromotionsTable from '../tables/PromotionsTable';
import { PromotionsProvider } from '../../pages/PromotionsProvider'; 
import { PreciosProvider } from '../../../componentes/PreciosProvider';
import PreciosTablaSimple from '../../../componentes/PreciosTablaSimple';

const PromotionsTab = () => {
    const [selectedListaPrecios, setSelectedListaPrecios] = useState(null); // Mueve esto dentro del componente

    return (
        <div>
            <PreciosProvider> 
                <PreciosTablaSimple onRowClick={setSelectedListaPrecios} />
            </PreciosProvider>
            <PromotionsProvider selectedListaPrecios={selectedListaPrecios}>
                <div>
                    <PromotionsTable selectedListaPrecios={selectedListaPrecios} />
                </div>
            </PromotionsProvider>
        </div>
    );
};

export default PromotionsTab;
