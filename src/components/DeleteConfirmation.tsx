import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { deleteContent } from "@/services/ContentService";

interface DeleteConfirmationProps {
  open: boolean;
  handleClose: any;
  rowData?: any;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  open,
  rowData,
  handleClose,
}) => {
  const handleDelete = async (content?: any) => {
    console.log(`Deleting item at index`, rowData);

    if (rowData?.identifier && rowData?.mimeType) {
      try {
        await deleteContent(rowData?.identifier, rowData?.mimeType);
        console.log(`Deleted item with identifier - ${rowData?.identifier}`);
        // setContentDeleted((prev) => !prev);
      } catch (error) {
        console.error("Failed to delete content:", error);
      }
    }
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="delete-confirmation-title">
        <Typography variant="h6">Confirm Deletion</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="delete-confirmation-description"
          sx={{ textAlign: "center", mt: 1 }}
        >
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
