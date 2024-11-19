import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getAllAlerts } from "../../services/remote/GetAllAlerts";
import AddAlertModal from "../modals/AddAlertModal";
import UpdateAlertModal from "../modals/UpdateAlertModal";
import { showMensajeError, showMensajeConfirm } from "../elements/messages/mySwalAlers";
import { delAlert } from "../../services/remote/del/DeleteAlert"; // Nueva función para eliminar alertas

const AlertsColumns = [
  { accessorKey: "_id", header: "ID Alerta", size: 30 },
  { accessorKey: "fecha", header: "Fecha", size: 100 },
  { accessorKey: "reporte", header: "Reporte", size: 100 },
  { accessorKey: "mensaje", header: "Mensaje", size: 200 },
];

const AlertsTable = ({ selectedListaPrecios }) => {
  const [alerts, setAlerts] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [showAddAlertModal, setShowAddAlertModal] = useState(false);
  const [showUpdateAlertModal, setShowUpdateAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null); // Almacena la alerta seleccionada
  const [selectedRowId, setSelectedRowId] = useState(null); // Almacena el ID de la fila seleccionada

  useEffect(() => {
    if (selectedListaPrecios) {
      fetchDataAlerts();
    }
  }, [selectedListaPrecios]); // Dependencia
  
  if (!selectedListaPrecios) {
    return <div>Selecciona una lista de precios para ver las alertas.</div>;
  }

  const fetchDataAlerts = async () => {
    setLoadingTable(true);
    try {
      const allAlertsData = await getAllAlerts(selectedListaPrecios); // Usa el ID
      const formattedData = allAlertsData.map((alert) => ({
        _id: alert._id,
        fecha: new Date(alert.fecha).toLocaleDateString(),
        reporte: alert.reporte ? "Sí" : "No",
        mensaje: alert.mensaje,
      }));
      setAlerts(formattedData);
    } catch (error) {
      console.error("Error al obtener las alertas:", error);
      showMensajeError("Error al cargar las alertas.");
    } finally {
      setLoadingTable(false);
    }
  };

  const handleReload = async () => {
    await fetchDataAlerts();
  };

  const handleDelete = async () => {
    const res = await showMensajeConfirm(
      `La alerta con el ID ${selectedAlert._id} será eliminada, ¿Desea continuar?`
    );
    if (res) {
      try {
        const mensaje = await delAlert(selectedListaPrecios, selectedAlert._id); // Llamada a la función de eliminación
        console.log(mensaje); // Confirmación opcional
        fetchDataAlerts(); // Recargar alertas
        //showMensajeSuccess("Alerta eliminada exitosamente."); // Mensaje de éxito
      } catch (error) {
        console.error("Error al eliminar la alerta:", error);
        showMensajeError("No se pudo eliminar la alerta.");
      }
    }
  };
  

  return (
    <Box>
      <MaterialReactTable
        columns={AlertsColumns}
        data={alerts}
        state={{ isLoading: loadingTable }}
        initialState={{ density: "compact", showGlobalFilter: true }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            setSelectedAlert(row.original);
            setSelectedRowId(row.id);
          },
          sx: {
            cursor: loadingTable ? "not-allowed" : "pointer",
            backgroundColor: selectedRowId === row.id ? darken("#EFF999", 0.01) : "inherit",
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" sx={{ m: 1 }}>
            <Tooltip title="Agregar">
              <IconButton onClick={() => setShowAddAlertModal(true)}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Actualizar">
              <IconButton
                onClick={() => selectedAlert && setShowUpdateAlertModal(true)}
                disabled={!selectedAlert}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton onClick={handleDelete} disabled={!selectedAlert}>
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
      <AddAlertModal
        showModal={showAddAlertModal}
        setShowModal={(open) => {
          setShowAddAlertModal(open);
          if (!open) fetchDataAlerts();
        }}
        id_lista_precios = {selectedListaPrecios}
      />
      <UpdateAlertModal
        showModal={showUpdateAlertModal}
        data={selectedAlert}
        id_lista_precios = {selectedListaPrecios}
        setShowModal={(open) => {
          setShowUpdateAlertModal(open);
          if (!open) fetchDataAlerts();
        }}
      />
    </Box>
  );
};

export default AlertsTable;
