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
  Box,
  Divider,
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
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle sx={{ m: 0,}} id="delete-confirmation-title">
        <Box sx={{padding:'10px'}}>
          <Typography sx={{ fontWeight: "400", fontSize: "16px" }}>Are you sure you want to delete this item?</Typography>
        </Box>
        {/* <IconButton
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
        </IconButton> */}
      </DialogTitle>
      <Divider />
     
      <DialogActions sx={{ justifyContent: "end", gap:'10px', padding:'20px' }}>
        <Box onClick={handleClose} sx={{ cursor: "pointer", color: "#0D599E", fontSize:'14px', }}>
          No, go back
        </Box>
        <Button sx={{ background:'#FDBE16', color:'#000' , borderRadius:'100px'}} onClick={handleDelete} variant="contained">
          yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
