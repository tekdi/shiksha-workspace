import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./SideBar";
import { Toaster, toast } from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';

interface LayoutProps {
  children: React.ReactNode;
  selectedKey: string;
  onSelect: (key: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, selectedKey, onSelect }) => {
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !toastShown) {
        toast((t) => (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>For a better experience, please use a desktop view.</span>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                marginLeft: "10px",
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <CloseIcon/>
            </button>
          </div>
        ), {
          position: "top-center",
          duration: Infinity,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        setToastShown(true); // Mark toast as shown
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toastShown]);

  return (
    <Box display="flex" sx={{ overflowX: "hidden !important" }} minHeight="100vh">
      <Toaster />
      <Box
        sx={{
          maxHeight: "132vh",
          minHeight: "100vh",
          "@media (max-width: 900px)": {
            position: "absolute",
            top: "3px",
          },
          "@media (min-width: 900px)": {
            background: "linear-gradient(to bottom, white, #F8EFDA)",
            position: "fixed",
          },
        }}
      >
        <Sidebar selectedKey={selectedKey} onSelect={onSelect} />
      </Box>
      <Box
        sx={{
          flex: 1,
          background: "#F3F5F8",
          "@media (min-width: 900px)": {
            width: "calc(100% - 251px)",
            marginLeft: "284px",
          },
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;