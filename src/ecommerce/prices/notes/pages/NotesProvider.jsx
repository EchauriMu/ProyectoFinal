// src/ecommerce/prices/pages/PricesProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllNotes } from '../services/remote/GetAllNotes';

const NotesContext = createContext();

export const NotesProvider = ({ children, id_lista_precios }) => {
    const [notes, setNotes] = useState([]); // Estado de lista de alertas
    const [loadingTable, setLoadingTable] = useState(false); // Estado de carga

    // Función para cargar los precios
    const fetchDataNotes = async () => {
        setLoadingTable(true);
        try {
            const allNotes = await getAllNotes(id_lista_precios);
            setNotes(allNotes);
        } catch (error) {
            console.error("Error al obtener las notes:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchDataNotes(); // Carga inicial de precios
    }, []);

    // Valores compartidos en el contexto
    return (
        <NotesContext.Provider value={{ notes, loadingTable, fetchDataNotes }}>
            {children}
            {id_lista_precios}
        </NotesContext.Provider>
    );
};

// Hook personalizado para usar el contexto de precios
export const useNotesContext = () => useContext(NotesContext);
