// components/SearchBox.tsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Define the props for the SearchBox component
interface SearchBoxProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filter: string) => void;
  onSortChange: (sortBy: string) => void;
}

// Main SearchBox Component
const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  onSearch,
  onFilterChange,
  onSortChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Handle changes in the search field
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  // Handle changes in the filter dropdown
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setFilter(value);
    onFilterChange(value);
  };

  // Handle changes in the sort-by dropdown
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <Box display="flex" gap={2} mb={2}>
      {/* Search Field */}
      <TextField
        placeholder={placeholder || "Search..."}
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Filter Dropdown */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} onChange={handleFilterChange} label="Filter">
          {/* Add dummy filters here */}
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="courses">Courses</MenuItem>
          <MenuItem value="ebooks">eBooks</MenuItem>
          <MenuItem value="questionsets">Question Sets</MenuItem>
        </Select>
      </FormControl>

      {/* Sort By Dropdown */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={handleSortChange} label="Sort By">
          {/* Add sort options here */}
          <MenuItem value="updated">Updated On</MenuItem>
          <MenuItem value="modified">Modified On</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchBox;
