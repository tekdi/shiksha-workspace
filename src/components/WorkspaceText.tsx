import { Box, Typography, useTheme } from "@mui/material"
import React from "react";


const WorkspaceText: React.FC<any> = () => {
  const theme = useTheme<any>();

    return (<Box p={3} display={"flex"} flexDirection={"row"} gap={2}>
        <Typography
            variant="h1"
            sx={{
                color: theme.palette.warning['300'],
                marginRight: "10px",
                fontSize: "22px",
                fontWeight: 400,
            }}
        >
            Workspace
        </Typography>

        <Typography
            variant="body1"
            color="#635E57"
            width={'70%'}
            fontSize={15}
            sx={{lineHeight:'20px', fontSize:'14px'}}
        >
            Create, organize, and manage all types of content in one place.
            Whether it&apos;s courses, assessments, or any other type of content.
        </Typography>
    </Box>)
}

export default WorkspaceText;