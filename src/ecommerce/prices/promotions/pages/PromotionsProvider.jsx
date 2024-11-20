// src/ecommerce/prices/pages/PricesProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllPromotions } from '../services/remote/GetAllPromotions';

const PromotionsContext = createContext();

export const PromotionsProvider = ({ children, id_lista_precios }) => {
    const [promotions, setPromotions] = useState([]); // Estado de lista de promociones
    const [loadingTable, setLoadingTable] = useState(false); // Estado de carga

    // Función para cargar los precios
    const fetchDataPromotions = async () => {
        setLoadingTable(true);
        try {
            const allPromotions = await getAllPromotions(id_lista_precios);
            setPromotions(allPromotions);
        } catch (error) {
            console.error("Error al obtener las promociones:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchDataPromotions(); // Carga inicial de precios
    }, []);

    // Valores compartidos en el contexto
    return (
        <PromotionsContext.Provider value={{ promotions, loadingTable, fetchDataPromotions }}>
            {children}
            {id_lista_precios}
        </PromotionsContext.Provider>
    );
};

// Hook personalizado para usar el contexto de precios
export const usePromotionsContext = () => useContext(PromotionsContext);
