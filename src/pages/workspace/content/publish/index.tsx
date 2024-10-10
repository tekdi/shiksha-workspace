import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../../components/Layout";
import { Typography, Box } from "@mui/material";
import CourseCard from "../../../../components/CourseCard";
import SearchBox from "../../../../components/SearchBox";
import { getContent } from "@/services/ContentService";
import { ContentType } from "@/utils/app.constant";
import Loader from "@/components/Loader";
import NoDataFound from "@/components/NoDataFound";

const PublishPage = () => {
  const [selectedKey, setSelectedKey] = useState("publish");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [contentList, setContentList] = React.useState<content[]>([]);
  const [contentType, setContentType] = React.useState<string>("");
  const [loading, setLoading] = useState(false);

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

  const displayedCards = filteredData
    .slice
    // page * rowsPerPage,
    // page * rowsPerPage + rowsPerPage
    ();

  const handleDelete = (index: number) => {
    console.log(`Deleting item at index ${index}`);
  };

  useEffect(() => {
    const getPublishContentList = async () => {
      try {
        setLoading(true);
        const response = await getContent(["Live"]);
        const contentList = response?.content || response?.QuestionSet;
        if (response?.QuestionSet) {
          setContentType(ContentType.QUESTION_SET);
        }
        setContentList(contentList);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPublishContentList();
  }, [searchTerm]);

  return (
    <Layout selectedKey={selectedKey} onSelect={setSelectedKey}>
      <Box p={3}>
        <Typography variant="h4"> Content Publish</Typography>
        <Typography>Here you see all your Publish content.</Typography>

        <Box m={3}>
          <SearchBox
            placeholder="Search by title..."
            onSearch={handleSearch}
            // onFilterChange={handleFilterChange}
            // onSortChange={handleSortChange}
          />
        </Box>

        <Box display="flex" flexWrap="wrap" gap={3} padding={2}>
          {loading ? (
            <Loader showBackdrop={true} loadingText={"Loading"} />
          ) : contentList && contentList.length > 0 ? (
            contentList?.map((content, index) => (
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
                  type={content?.contentType || contentType}
                  imageUrl={content.appIcon}
                  status={content.status}
                  identifier={content?.identifier}
                  mimeType={content?.mimeType}
                  mode={'read'}
                  onDelete={() => handleDelete(index)}
                />
              </Box>
            ))
          ) : (
            <NoDataFound />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default PublishPage;
