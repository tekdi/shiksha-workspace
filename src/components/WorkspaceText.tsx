import { Box, Typography, useTheme } from "@mui/material"
import React from "react";


const WorkspaceText: React.FC<any> = () => {
  const theme = useTheme();

    return (<Box p={3} display={"flex"} flexDirection={"row"} gap={2}>
        <Typography
            variant="h1"
            sx={{
                color: theme.palette.text.primary,
                marginRight: "10px",
            }}
        >
            Workspace
        </Typography>

        <Typography
            variant="body1"
            color="textSecondary"
            width={500}
            fontSize={15}
        >
            Create, organize, and manage all types of content in one place.
            Whether it&apos;s courses, assessments, or any other type of content.
        </Typography>
    </Box>)
}

export default WorkspaceText;