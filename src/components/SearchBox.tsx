import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { debounce } from "@/utils/Helper";
import { getPrimaryCategory } from "@/services/ContentService";
import { SortOptions } from "@/utils/app.constant";

export interface SearchBarProps {
  onSearch: (value: string) => void;
  value?: string;
  onClear?: () => void;
  placeholder: string;
  onFilterChange?: (selectedFilters: string[]) => void;
  onSortChange?: (sortBy: string) => void;
}

const sortOptions = SortOptions;

const SearchBox: React.FC<SearchBarProps> = ({
  onSearch,
  value = "",
  placeholder = "Search...",
  onFilterChange,
  onSortChange,
}) => {
  const theme = useTheme<any>();
  const [searchTerm, setSearchTerm] = useState(value);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [primaryCategory, setPrimaryCategory] = useState<string[]>();

  useEffect(() => {
    const PrimaryCategoryData = async () => {
      const response = await getPrimaryCategory();
      const collectionPrimaryCategories =
        response?.channel?.collectionPrimaryCategories;
      const contentPrimaryCategories =
        response?.channel?.contentPrimaryCategories;

      const PrimaryCategory = [
        ...collectionPrimaryCategories,
        ...contentPrimaryCategories,
      ];
      setPrimaryCategory(PrimaryCategory);
      localStorage.setItem("PrimaryCategory", JSON.stringify(PrimaryCategory));
    };
    PrimaryCategoryData();
  }, []);

  const filterOptions = primaryCategory;

  const handleSearchClear = () => {
    onSearch("");
    setSearchTerm("");
  };

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      onSearch(searchTerm);
    }, 300),
    [onSearch]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedFilters(value);
    onFilterChange && onFilterChange(value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setSortBy(value);
    onSortChange && onSortChange(value);
  };

  return (
    <Grid container gap={1} alignItems={"center"}>
      <Grid item xs={5} md={5}>
        <Box sx={{ mt: 2, px: theme.spacing(2.5) }}>
          <Paper
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "50px",
              background: theme.palette.warning.A700,
              boxShadow: "none",
            }}
          >
            <InputBase
              value={searchTerm}
              onChange={handleChange}
              sx={{ ml: theme.spacing(3), flex: 1, fontSize: "14px" }}
              placeholder={placeholder}
              inputProps={{ "aria-label": placeholder }}
            />
            <IconButton
              type="button"
              onClick={searchTerm ? handleSearchClear : undefined}
              sx={{ p: theme.spacing(1.25) }}
              aria-label={searchTerm ? "Clear" : "Search"}
            >
              {searchTerm ? <ClearIcon /> : <SearchIcon />}
            </IconButton>
          </Paper>
        </Box>
      </Grid>

      <Grid item xs={3} md={3}>
        <FormControl sx={{ width: "100%", mt: 2 }}>
          <InputLabel>Filter By</InputLabel>
          <Select
            multiple
            value={selectedFilters}
            onChange={handleFilterChange}
            input={<OutlinedInput label="Filter By" />}
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {filterOptions?.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={selectedFilters.indexOf(option) > -1} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={3} md={3} justifySelf={"end"}>
        <FormControl sx={{ width: "100%", mt: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            input={<OutlinedInput label="Sort By" />}
          >
            {sortOptions?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SearchBox;
