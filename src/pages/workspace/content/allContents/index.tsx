import React, { useMemo, useState } from "react";
import Layout from "../../../../components/Layout";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpReviewTinyImage from "@mui/icons-material/LibraryBooks";
import SearchBox from "../../../../components/SearchBox";

const sampleData = [
  {
    title: "",
    type: "",
    lastUpdated: "10 days ago",
    status: "Draft",
  },
  {
    title: "",
    type: "",
    lastUpdated: "15 days ago",
    status: "Draft",
  },
  {
    title: "Home Science",
    type: "eTextbook",
    lastUpdated: "14 minutes ago",
    status: "Draft",
  },
  {
    title: "Test1",
    type: "Practice Question set",
    lastUpdated: "25 hours ago",
    status: "Publish",
  },
  {
    title: "",
    type: "",
    lastUpdated: "5 days ago",
    status: "Draft",
  },
];

const AllContentsPage = () => {
  const [selectedKey, setSelectedKey] = useState("allContents");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search.toLowerCase());
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const filteredData = useMemo(
    () =>
      sampleData.filter((content) =>
        content.title.toLowerCase().includes(searchTerm)
      ),
    [searchTerm]
  );

  const displayedRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Layout selectedKey={selectedKey} onSelect={setSelectedKey}>
      <Box p={3}>
        <Typography variant="h4">Show all Content</Typography>
        <Typography mb={2}>Here you see all your content.</Typography>

        <Box mb={3}>
          <SearchBox
            placeholder="Search by title..."
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <UpReviewTinyImage fontSize="small" />
                    <Box ml={2}>
                      <Typography variant="body1">
                        {row.title || "Untitled Course"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.type || "Course"}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{row.lastUpdated}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  {row.status === "Draft" && (
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={sampleData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Box>
    </Layout>
  );
};

export default AllContentsPage;
