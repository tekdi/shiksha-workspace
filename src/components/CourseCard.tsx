import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";

interface ContentCardProps {
  title: string;
  description: string;
  type: string;
  imageUrl?: string;
  status: string;
  onDelete?: () => void;
}

const CourseCard: React.FC<ContentCardProps> = ({
  title,
  description,
  type,
  imageUrl,
  status,
  onDelete,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "250px",
      }}
    >
      <Box position="relative">
        <CardMedia
          component="div"
          sx={{
            height: 140,
            backgroundColor: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || "Untitled Course"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <ImageIcon fontSize="large" />
          )}
        </CardMedia>

        <Chip
          label={type || "Course"}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "black",
            color: "white",
          }}
        />
      </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{title || "Untitled Course"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description || "Enter description of course"}
        </Typography>
      </CardContent>

      {(status === "draft" || status === "published") && (
        <CardActions disableSpacing>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default CourseCard;
