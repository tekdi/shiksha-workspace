import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import OutlinedFlagOutlinedIcon from "@mui/icons-material/OutlinedFlagOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import logo from "../../public/logo.png";

// Updated menu items with icons
const menuItems = [
  { text: "Create", key: "create", icon: <AddOutlinedIcon /> },
  { text: "Draft", key: "draft", icon: <CreateOutlinedIcon /> },
  {
    text: "Submitted for Review",
    key: "submitted",
    icon: <PreviewOutlinedIcon />,
  },
  { text: "Publish", key: "publish", icon: <OutlinedFlagOutlinedIcon /> },
  { text: "All My Contents", key: "allContents", icon: <AppsOutlinedIcon /> },
];

interface SidebarProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedKey, onSelect }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme<any>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavigation = (key: string) => {
    console.log(key);
    router.push(`/workspace/content/${key}`);
    onSelect(key);
    if (isMobile) {
      setDrawerOpen(false); // Close drawer after selecting in mobile view
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const goBack = () => {
    router.push("/");
  };

  const drawerContent = (
    <Box margin={"1rem 0.5rem 0.5rem 0.5rem"} width={"100%"} height={"100%"} sx={{ fontSize: '14px' }}>
      <Image src={logo} alt="logo" height={60} />
      <Box
        p={'2rem 2rem 2rem 0'}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >

        <Box display="flex" alignItems="center">
          <ListItemIcon>
            <IconButton onClick={goBack}>
              <ArrowBackIcon sx={{ color: theme.palette.warning["100"] }} />
            </IconButton>
          </ListItemIcon>
          <Typography
            variant="h2"
            fontSize={"14px"}
            sx={{ color: theme.palette.warning["100"] }}
          >
            Back to Main Page
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            sx={{
              gap: "4px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              borderRadius: "4rem",
              backgroundColor:
                selectedKey === item.key
                  ? "var(--mui-palette-primary-main)"
                  : "transparent",
              color:
                selectedKey === item.key
                  ? "#2E1500"
                  : theme.palette.warning.A200,

              "&:hover": {
                background:
                  selectedKey === item.key
                    ? "var(--mui-palette-primary-main)"
                    : "transparent",
              },
            }}
            key={item?.key}
            onClick={() => handleNavigation(item?.key)}
          >
            <ListItemIcon
              sx={{
                color:
                  selectedKey === item?.key
                    ? "#2E1500"
                    : theme.palette.warning.A200,
                minWidth: '40px',
                fontWeight: selectedKey === item?.key ? '600' : 'normal',
                fontSize: '14px !important'
              }}
            >
              {item?.icon}
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{fontSize: '14px', fontWeight: selectedKey === item?.key ? '600' : 'normal'}}  primary={item?.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ marginLeft: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true, // Improves performance on mobile
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: 250,
            height: "100vh",
            bgcolor: theme.palette.background.paper,
            borderRight: 1,
            borderColor: theme.palette.divider,
          }}
        >
          {drawerContent}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
