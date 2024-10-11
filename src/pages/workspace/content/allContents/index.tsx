import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import { deleteContent, getContent } from "../../../../services/ContentService";
import { timeAgo } from "@/utils/Helper";
import Loader from "@/components/Loader";
import NoDataFound from "@/components/NoDataFound";
import { MIME_TYPE } from "@/utils/app.config";
import router from "next/router";

const AllContentsPage = () => {
  const theme = useTheme<any>();

  const [selectedKey, setSelectedKey] = useState("allContents");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [contentList, setContentList] = React.useState<content[]>([]);
  const [loading, setLoading] = useState(false);
  const [contentDeleted, setContentDeleted] = React.useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const openEditor = (content: any) => {
    const identifier = content?.identifier;
    const mode = content?.mode;
    if (content?.mimeType === MIME_TYPE.QUESTIONSET_MIME_TYPE) {
      router.push({ pathname: `/editor`, query: { identifier, mode } });
    } else if (
      content?.mimeType &&
      MIME_TYPE.GENERIC_MIME_TYPE.includes(content?.mimeType)
    ) {
      router.push({ pathname: `/upload-editor`, query: { identifier } });
    }
  };

  useEffect(() => {
    const getContentList = async () => {
      try {
        setLoading(true);
        const status = [
          "Draft",
          "FlagDraft",
          "Review",
          "Processing",
          "Live",
          "Unlisted",
          "FlagReview",
        ];
        const query = debouncedSearchTerm || "";
        const response = await getContent(status, query);
        const contentList = (response?.content || []).concat(
          response?.QuestionSet || []
        );
        setContentList(contentList);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getContentList();
  }, [debouncedSearchTerm, contentDeleted]);

  const handleDeleteClick = async (content: any) => {
    if (content?.identifier && content?.mimeType) {
      try {
        await deleteContent(content?.identifier, content?.mimeType);
        console.log(`Deleted item with identifier - ${content?.identifier}`);
        setTimeout(() => {
          setContentDeleted((prev) => !prev);
        }, 1000);
      } catch (error) {
        console.error("Failed to delete content:", error);
      }
    }
  };

  const filteredData = useMemo(
    () =>
      contentList?.filter((content) =>
        content?.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ),
    [debouncedSearchTerm, contentList]
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
          <SearchBox placeholder="Search by title..." onSearch={handleSearch} />
        </Box>
        {loading ? (
          <Loader showBackdrop={true} loadingText={"Loading"} />
        ) : contentList && contentList.length > 0 ? (
          contentList &&
          contentList.length > 0 && (
            <>
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
                      <TableCell onClick={() => openEditor(content)}>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ cursor: "pointer" }}
                        >
                          {content?.appIcon ? (
                            <img src={content?.appIcon} height={"25px"} />
                          ) : (
                            <UpReviewTinyImage fontSize="small" />
                          )}
                          <Box ml={2}>
                            <Typography variant="body1">
                              {content?.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={theme.palette.warning["A200"]}
                            >
                              {content?.primaryCategory}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{timeAgo(content?.lastUpdatedOn)}</TableCell>
                      <TableCell>{content?.status}</TableCell>
                      <TableCell>
                        {content?.status === "Draft" && (
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteClick(content)}
                          >
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
                count={contentList.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
              />
            </>
          )
        ) : (
          <NoDataFound />
        )}
      </Box>
    </Layout>
  );
};

export default AllContentsPage;
