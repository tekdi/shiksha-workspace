import React from "react";
import { Pagination, Box } from "@mui/material";

interface PaginationComponentProps {
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  count,
  page,
  onPageChange,
}) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Pagination
        count={count}
        page={page + 1}
        color="primary"
        onChange={onPageChange}
      />
    </Box>
  );
};

export default PaginationComponent;
