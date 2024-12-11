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
import { debounce, getOptionsByCategory } from "@/utils/Helper";
import {
  getFrameworkDetails,
  getPrimaryCategory,
} from "@/services/ContentService";
import { SortOptions, StatusOptions } from "@/utils/app.constant";

export interface SearchBarProps {
  onSearch: (value: string) => void;
  value?: string;
  onClear?: () => void;
  placeholder: string;
  onFilterChange?: (selectedFilters: string[]) => void;
  onSortChange?: (sortBy: string) => void;
  onStatusChange?: (status: string) => void;
  onStateChange?: (state: string) => void;

  allContents?: boolean;
  discoverContents?: boolean;
}

const sortOptions = SortOptions;

const SearchBox: React.FC<SearchBarProps> = ({
  onSearch,
  value = "",
  placeholder = "Search...",
  onFilterChange,
  onSortChange,
  onStatusChange,
  onStateChange,
  allContents = false,
  discoverContents = false,
}) => {
  const theme = useTheme<any>();
  const [searchTerm, setSearchTerm] = useState(value);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("Modified On");
  const [status, setStatus] = useState<string>("All");
  const [state, setState] = useState<string>("All");
  const [stateOptions, setStateOptions] = useState<string[]>([]);

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
  useEffect(() => {
    const fetchStates = async (stateName?: string) => {
      try {
        const data = await getFrameworkDetails();
        const framework = data?.result?.framework;

        const states = await getOptionsByCategory(framework, "state");

        {
          const stateNames = states.map((state: any) => state.name);
          setStateOptions(["All", ...stateNames]);

          console.log("stateNames", stateNames);
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    fetchStates();
  }, []);

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

    if (searchTerm.length >= 3) {
      handleSearch(searchTerm);
    } else if (searchTerm.length === 0 || searchTerm === "") {
      handleSearchClear();
      handleSearch(searchTerm);
    }
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

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setStatus(value);
    onStatusChange && onStatusChange(value);
  };
  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setState(value);
    onStateChange && onStateChange(value);
  };
  return (
    <Box sx={{ mx: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={12} lg={6}>
          <Box sx={{ mt: 2 }}>
            <Paper
              component="form"
              onSubmit={(e) => e.preventDefault()}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.warning["A700"],
                borderRadius: "8px",
                "& .MuiOutlinedInput-root fieldset": { border: "none" },
                "& .MuiOutlinedInput-input": { borderRadius: 8 },
              }}
            >
              <InputBase
                value={searchTerm}
                onChange={handleChange}
                sx={{
                  ml: theme.spacing(3),
                  flex: 1,
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  color: "#000000DB",
                }}
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

        <Grid
          item
          xs={12}
          md={12}
          lg={allContents || discoverContents ? 2 : 3}
          justifySelf={"end"}
        >
          <FormControl sx={{ width: "100%", mt: 2 }}>
            <InputLabel sx={{ color: "#000000DB" }}>Filter By</InputLabel>
            <Select
              multiple
              value={selectedFilters}
              onChange={handleFilterChange}
              input={<OutlinedInput label="Filter By" />}
              renderValue={(selected) => (selected as string[]).join(", ")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#000" },
                },
                "& .MuiSelect-select": {
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              {filterOptions?.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    color: "#000",
                    "& .MuiCheckbox-root": {
                      color: "#000",
                      "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                        color: "#000",
                      },
                    },
                    "& .MuiSvgIcon-root": { fontSize: "20px" },
                  }}
                >
                  <Checkbox
                    checked={selectedFilters.indexOf(option) > -1}
                    sx={{
                      color: "#000",
                      "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                        color: "#000",
                      },
                    }}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={allContents || discoverContents ? 2 : 3}
          justifySelf={"end"}
        >
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

        {allContents && (
          <Grid item xs={12} md={12} lg={2} justifySelf={"end"}>
            <FormControl sx={{ width: "100%", mt: 2 }}>
              <InputLabel>Filter By Status</InputLabel>
              <Select
                value={status}
                onChange={handleStatusChange}
                input={<OutlinedInput label="Filter By Status" />}
              >
                {StatusOptions?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {discoverContents && (
          <Grid item xs={12} md={12} lg={2} justifySelf={"end"}>
            <FormControl sx={{ width: "100%", mt: 2 }}>
              <InputLabel>Filter By State</InputLabel>
              <Select
                value={state}
                onChange={handleStateChange}
                input={<OutlinedInput label="Filter By State" />}
              >
                {stateOptions?.map((option: any) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SearchBox;
