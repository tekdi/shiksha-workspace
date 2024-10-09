import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../../components/Layout";
import { Typography, Box, TablePagination } from "@mui/material";
import CourseCard from "../../../../components/CourseCard";
import SearchBox from "../../../../components/SearchBox";
import { getContent } from "@/services/ContentService";

const DraftPage = () => {
  const [selectedKey, setSelectedKey] = useState("draft");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
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
      contentList.filter((content) =>
        content.name.toLowerCase().includes(searchTerm)
      ),
    [searchTerm]
  );

  // const displayedCards = filteredData.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  const handleDelete = (index: number) => {
    console.log(`Deleting item at index ${index}`);
  };

  useEffect(() => {
    const getDraftContentList = async () => {
      try {
        const response = await getContent(["Draft", "FlagDraft"]);
        const contentList = response?.content || response?.QuestionSet;
        setContentList(contentList);
      } catch (error) {
        console.log(error);
      }
    };
    getDraftContentList();
  }, []);

  return (
    <Layout selectedKey={selectedKey} onSelect={setSelectedKey}>
      <Box p={3}>
        <Typography variant="h4">Draft Content</Typography>
        <Typography mb={2}>Here you see all your draft content.</Typography>

        <Box mb={3}>
          <SearchBox
            placeholder="Search by title..."
            onSearch={handleSearch}
            // onFilterChange={handleFilterChange}
            // onSortChange={handleSortChange}
          />
        </Box>

        <Box display="flex" flexWrap="wrap" gap={3}>
          {contentList?.map((content, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "250px",
                maxWidth: "250px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CourseCard
                title={content?.name}
                description={content?.description}
                type={content?.contentType}
                imageUrl={content.appIcon}
                status={content.status}
                onDelete={() => handleDelete(index)}
              />
            </Box>
          ))}
        </Box>

        <Box display="flex" justifyContent="center" mt={3}>
          <TablePagination
            component="div"
            count={contentList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[4, 8, 12]}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default DraftPage;
