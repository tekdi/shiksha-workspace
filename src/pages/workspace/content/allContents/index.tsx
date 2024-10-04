import React, { useEffect, useMemo, useState } from "react";
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
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpReviewTinyImage from "@mui/icons-material/LibraryBooks";
import SearchBox from "../../../../components/SearchBox";
import { getContent } from "../../../../services/ContentService";
import { timeAgo } from "@/utils/Helper";

interface content {
  name: string;
  status: string;
  lastUpdatedOn: string;
  appIcon: string;
  contentType: string;
}

const AllContentsPage = () => {
  const theme = useTheme<any>();

  const [selectedKey, setSelectedKey] = useState("allContents");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [contentList, setContentList] = React.useState<content[]>([]);

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
      contentList?.filter((content) =>
        content?.name.toLowerCase().includes(searchTerm)
      ),
    [searchTerm]
  );

  const displayedRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    const getContentList = async () => {
      try {
        const reqBody = {
          request: {
            filters: {
              status: [
                "Draft",
                "FlagDraft",
                "Review",
                "Processing",
                "Live",
                "Unlisted",
                "FlagReview",
              ],
              createdBy: "84721b4a-6536-4cb0-b8c3-57583ef4cada",
              primaryCategory: [
                "Course Assessment",
                "eTextbook",
                "Explanation Content",
                "Learning Resource",
                "Practice Question Set",
                "Teacher Resource",
                "Exam Question",
                "Content Playlist",
                "Course",
                "Digital Textbook",
                "Question paper",
              ],
            },
            offset: 0,
            limit: 9,
            query: "",
            sort_by: {
              lastUpdatedOn: "desc",
            },
          },
        };
        const response = await getContent(reqBody);
        const contentList = response?.content || [];
        setContentList(contentList);
      } catch (error) {
        console.log(error);
      }
    };
    getContentList();
  }, []);

  return (
    <Layout selectedKey={selectedKey} onSelect={setSelectedKey}>
      <Box p={3}>
        <Typography variant="h4">Show all Content</Typography>
        <Typography mb={2}>Here you see all your content.</Typography>

        <Box mb={3}>
          <SearchBox
            placeholder="Search by title..."
            onSearch={handleSearch}
            // onFilterChange={handleFilterChange}
            // onSortChange={handleSortChange}
          />
        </Box>
        {contentList && contentList.length > 0 && (
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
              {contentList?.map((content, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {content?.appIcon ? (
                        <img src={content?.appIcon} />
                      ) : (
                        <UpReviewTinyImage fontSize="small" />
                      )}
                      <Box ml={2}>
                        <Typography variant="body1">{content?.name}</Typography>
                        <Typography
                          variant="body2"
                          color={theme.palette.warning["A200"]}
                        >
                          {content?.contentType}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{timeAgo(content?.lastUpdatedOn)}</TableCell>
                  <TableCell>{content?.status}</TableCell>
                  <TableCell>
                    {content?.status === "Draft" && (
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <TablePagination
          component="div"
          count={contentList.length}
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
