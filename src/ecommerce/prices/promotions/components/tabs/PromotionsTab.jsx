import React, { useState } from 'react';
import PromotionsTable from '../tables/PromotionsTable';
import { PromotionsProvider } from '../../pages/PromotionsProvider'; 
import { PreciosProvider } from '../../../componentes/PreciosProvider';
import PreciosTablaSimple from '../../../componentes/PreciosTablaSimple';
import '../../assets/promotions.css';

const PromotionsTab = () => {
    const [selectedListaPrecios, setSelectedListaPrecios] = useState(null); // Mueve esto dentro del componente

    return (
        <div className='contenedorPromociones'>
            <PreciosProvider> 
                <PreciosTablaSimple onRowClick={setSelectedListaPrecios} />
            </PreciosProvider>
            <PromotionsProvider selectedListaPrecios={selectedListaPrecios}>
                <div className='TablaPromociones'>
                    <PromotionsTable selectedListaPrecios={selectedListaPrecios} />
                </div>
            </PromotionsProvider>
        </div>
    );
};

export default PromotionsTab;
