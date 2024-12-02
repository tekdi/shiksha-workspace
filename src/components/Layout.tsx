import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./SideBar";
import { toast, ToastContainer } from "react-toastify";

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
        toast.info("For a better experience, please use a desktop.", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
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
    <Box display="flex" sx={{ overflowX: 'hidden !important' }} minHeight={"100vh"}>
      <ToastContainer position="bottom-left" autoClose={3000} stacked={false} />
      <Box sx={{ maxHeight: '132vh', minHeight: '100vh', '@media (max-width: 900px)': { position: 'absolute', top:"3px" }, '@media (min-width: 900px)': { background: "linear-gradient(to bottom, white, #F8EFDA)", position:'fixed' } }}>
        <Sidebar selectedKey={selectedKey} onSelect={onSelect} />
      </Box>
      <Box sx={{ flex: 1, background: '#F3F5F8', '@media (min-width: 900px)': { width: 'calc(100% - 251px)', marginLeft:'284px' }, width: '100%' }}>{children}</Box>
    </Box>
  )
};

export default Layout;
