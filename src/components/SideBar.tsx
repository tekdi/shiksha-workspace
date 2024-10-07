import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import DatabaseIcon from "@mui/icons-material/Storage";
const menuItems = [
  { text: "Create", key: "create" },
  { text: "All My Contents", key: "allContents" },
  { text: "Draft", key: "draft" },
  { text: "Submitted for Review", key: "submitted" },
  { text: "Publish", key: "publish" },
];

const Sidebar: React.FC<SidebarProps> = ({ selectedKey, onSelect }) => {
  const router = useRouter();
  const theme = useTheme<any>();
  const handleNavigation = (key: string) => {
    router.push(`/workspace/content/${key}`);
    onSelect(key);
  };

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Box p={2} display="flex" alignItems="center">
        <ListItemIcon>
          <DatabaseIcon fontSize="large" />
        </ListItemIcon>
        <Typography variant="h6">My Workspace</Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.key}
            selected={selectedKey === item.key}
            onClick={() => handleNavigation(item.key)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
