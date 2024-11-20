import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getAllPromotions } from "../../services/remote/GetAllPromotions";
import AddPromotionModal from "../modals/AddPromotionModal";
import UpdatePromotionModal from "../modals/UpdatePromotionModal";
import { showMensajeError, showMensajeConfirm } from "../elements/messages/mySwalAlers";
import { delPromotion } from "../../services/remote/del/DeletePromotion"; // Nueva función para eliminar promociones

const PromotionColumns = [
  { accessorKey: "_id", header: "ID", size: 30 },
  { accessorKey: "tipo", header: "Tipo", size: 100 },
  { accessorKey: "descuento", header: "Descuento (%)", size: 200 },
  { accessorKey: "condicion", header: "Condición", size: 200 },
];

const PromotionsTable = ({ selectedListaPrecios }) => {
  const [promotions, setPromotions] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [showAddPromotionsModal, setShowAddPromotionsModal] = useState(false);
  const [showUpdatePromotionsModal, setShowUpdateAlertModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null); // Almacena la promoción seleccionada
  const [selectedRowId, setSelectedRowId] = useState(null); // Almacena el ID de la fila seleccionada

  useEffect(() => {
    if (selectedListaPrecios) {
      fetchDataAlerts();
    }
  }, [selectedListaPrecios]); // Dependencia
  
  if (!selectedListaPrecios) {
    return <div>Selecciona una lista de precios para ver las promociones.</div>;
  }

  const fetchDataAlerts = async () => {
    setLoadingTable(true);
    try {
      const allAlertsData = await getAllPromotions(selectedListaPrecios); // Usa el ID
      const formattedData = allAlertsData.map((idLista) => ({
        _id: idLista._id,
        tipo: idLista.tipo,
        descuento: idLista.descuento,
        condicion: idLista.condicion,
      }));
      setPromotions(formattedData);
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
      `La promoción con el ID ${selectedPromotion._id} será eliminada, ¿Desea continuar?`
    );
    if (res) {
      try {
        const mensaje = await delPromotion(selectedListaPrecios, selectedPromotion._id); // Llamada a la función de eliminación
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
        columns={PromotionColumns}
        data={promotions}
        state={{ isLoading: loadingTable }}
        initialState={{ density: "compact", showGlobalFilter: true }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            setSelectedPromotion(row.original);
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
              <IconButton onClick={() => setShowAddPromotionsModal(true)}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Actualizar">
              <IconButton
                onClick={() => selectedPromotion && setShowUpdateAlertModal(true)}
                disabled={!selectedPromotion}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton onClick={handleDelete} disabled={!selectedPromotion}>
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
      <AddPromotionModal
        showModal={showAddPromotionsModal}
        setShowModal={(open) => {
          setShowAddPromotionsModal(open);
          if (!open) fetchDataAlerts();
        }}
        id_lista_precios = {selectedListaPrecios}
      />
      <UpdatePromotionModal
        showModal={showUpdatePromotionsModal}
        data={selectedPromotion}
        id_lista_precios = {selectedListaPrecios}
        setShowModal={(open) => {
          setShowUpdateAlertModal(open);
          if (!open) fetchDataAlerts();
        }}
      />
    </Box>
  );
};

export default PromotionsTable;
