import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./SideBar";

interface LayoutProps {
  children: React.ReactNode;
  selectedKey: string;
  onSelect: (key: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, selectedKey, onSelect }) => {
  return (
    <Box display="flex" minHeight={"100vh"}>
      <Sidebar selectedKey={selectedKey} onSelect={onSelect} />
      <Box sx={{ flex: 1, background: 'rgb(243, 245, 248)'}}>{children}</Box>
    </Box>
  );
};

export default Layout;
