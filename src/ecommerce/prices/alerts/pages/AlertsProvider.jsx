// src/ecommerce/prices/pages/PricesProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllAlerts } from '../services/remote/GetAllAlerts';

const AlertsContext = createContext();

export const AlertsProvider = ({ children, id_lista_precios }) => {
    const [alerts, setAlerts] = useState([]); // Estado de lista de alertas
    const [loadingTable, setLoadingTable] = useState(false); // Estado de carga

    // Función para cargar los precios
    const fetchDataAlerts = async () => {
        setLoadingTable(true);
        try {
            const allAlerts = await getAllAlerts(id_lista_precios);
            setAlerts(allAlerts);
        } catch (error) {
            console.error("Error al obtener las alertas:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchDataAlerts(); // Carga inicial de precios
    }, []);

    // Valores compartidos en el contexto
    return (
        <AlertsContext.Provider value={{ alerts, loadingTable, fetchDataAlerts }}>
            {children}
            {id_lista_precios}
        </AlertsContext.Provider>
    );
};

// Hook personalizado para usar el contexto de precios
export const useAlertsContext = () => useContext(AlertsContext);
