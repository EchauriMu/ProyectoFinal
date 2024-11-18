import React from 'react';
import AlertsTable from '../tables/AlertsTable';
import { AlertsProvider } from '../../pages/AlertsProvider'; 

const AlertsTab = () => {
    return (
        /*<div>
            <h1>¡Pestaña de Alertas cargada!</h1>
        </div>*/
        <AlertsProvider>
            <div>
                <AlertsTable />
            </div>
        </AlertsProvider>
    );
};

export default AlertsTab;