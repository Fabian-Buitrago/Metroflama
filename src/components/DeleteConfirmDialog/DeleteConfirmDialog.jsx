import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useDialog } from "../../context/DialogContext";

export const DeleteConfirmDialog = () => {
  const { dialogOpen, dialogContent, closeDialog } = useDialog();

  const handleConfirm = () => {
    dialogContent.dispatchAction();
    closeDialog();
  };

  return (
    <Dialog open={dialogOpen} onClose={closeDialog}>
      <DialogTitle>{dialogContent.title}</DialogTitle>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="secondary" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
