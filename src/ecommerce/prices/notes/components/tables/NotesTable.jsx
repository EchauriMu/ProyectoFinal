import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getAllNotes } from "../../services/remote/GetAllNotes";
import AddNotesModal from "../modals/AddNotesModal";
import UpdateNotesModal from "../modals/UpdateNotesModal";
import { showMensajeError, showMensajeConfirm } from "../elements/messages/mySwalAlers";
import { delNotes } from "../../services/remote/del/DeleteNotes"; // Nueva función para eliminar notas

const NotesColumns = [
  { accessorKey: "_id", header: "ID Nota", size: 30 },
  { accessorKey: "Usuario", header: "Usuario", size: 100 },
  { accessorKey: "Fecha", header: "Fecha", size: 100 },
  { accessorKey: "Comentario", header: "Comentario", size: 200 },
  { accessorKey: "Categoria", header: "Categoria", size: 100 },
  { accessorKey: "Prioridad", header: "Prioridad", size: 100 },
  { accessorKey: "Estado", header: "Estado", size: 100 },

];

const NotesTable = ({ selectedListaPrecios }) => {
  const [notes, setNotes] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [showAddNotesModal, setShowAddNotesModal] = useState(false);
  const [showUpdateNotesModal, setShowUpdateNotesModal] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState(null); // Almacena la nota seleccionada
  const [selectedRowId, setSelectedRowId] = useState(null); // Almacena el ID de la fila seleccionada

  useEffect(() => {
    if (selectedListaPrecios) {
      fetchDataNotes();
    }
  }, [selectedListaPrecios]); // Dependencia
  
  if (!selectedListaPrecios) {
    return <div>Selecciona una lista de precios para ver las Notas.</div>;
  }

  const fetchDataNotes = async () => {
    setLoadingTable(true);
    try {
      const allNotesData = await getAllNotes(selectedListaPrecios); // Usa el ID
      const formattedData = allNotesData.map((notes) => ({
        _id: notes._id,
        Usuario: notes.Usuario,
        Fecha: notes.Fecha,
        Comentario: notes.Comentario,
        Categoria: notes.Categoria,
        Prioridad: notes.Prioridad,
        Estado: notes.Estado,
      }));
      setNotes(formattedData);
    } catch (error) {
      console.error("Error al obtener las notas:", error);
      showMensajeError("Error al cargar las notas.");
    } finally {
      setLoadingTable(false);
    }
  };

  const handleReload = async () => {
    await fetchDataNotes();
  };

  const handleDelete = async () => {
    const res = await showMensajeConfirm(
      `La Nota con el ID ${selectedNotes._id} será eliminada, ¿Desea continuar?`
    );
    if (res) {
      try {
        const mensaje = await delNotes(selectedListaPrecios, selectedNotes._id); // Llamada a la función de eliminación
        console.log(mensaje); // Confirmación opcional
        fetchDataNotes(); // Recargar notas
        //showMensajeSuccess("nota eliminada exitosamente."); // Mensaje de éxito
      } catch (error) {
        console.error("Error al eliminar la nota:", error);
        showMensajeError("No se pudo eliminar la nota.");
      }
    }
  };
  

  return (
    <Box>
      <MaterialReactTable
        columns={NotesColumns}
        data={notes}
        state={{ isLoading: loadingTable }}
        initialState={{ density: "compact", showGlobalFilter: true }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            setSelectedNotes(row.original);
            setSelectedRowId(row.id);
          },
          sx: {
            cursor: loadingTable ? "not-allowed" : "pointer",
            backgroundColor: selectedRowId === row.id ? darken("#e0e0e0", 0.01) : "inherit",
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" sx={{ m: 1 }}>
            <Tooltip title="Agregar">
              <IconButton onClick={() => setShowAddNotesModal(true)}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Actualizar">
              <IconButton
                onClick={() => selectedNotes && setShowUpdateNotesModal(true)}
                disabled={!selectedNotes}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton onClick={handleDelete} disabled={!selectedNotes}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Recargar">
              <IconButton onClick={handleReload}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
      <AddNotesModal
        showModal={showAddNotesModal}
        setShowModal={(open) => {
          setShowAddNotesModal(open);
          if (!open) fetchDataNotes();
        }}
        id_lista_precios = {selectedListaPrecios}
      />
      <UpdateNotesModal
        showModal={showUpdateNotesModal}
        data={selectedNotes}
        id_lista_precios = {selectedListaPrecios}
        setShowModal={(open) => {
          setShowUpdateNotesModal(open);
          if (!open) fetchDataNotes();
        }}
      />
    </Box>
  );
};

export default NotesTable;
