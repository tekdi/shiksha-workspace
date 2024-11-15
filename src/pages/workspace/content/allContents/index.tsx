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
import PaginationComponent from "@/components/PaginationComponent";
import { LIMIT } from "@/utils/app.constant";
import WorkspaceText from "@/components/WorkspaceText";
import { Table as KaTable } from 'ka-table';
import { DataType } from 'ka-table/enums';
import "ka-table/style.css";
import KaTableComponent from "@/components/KaTableComponent";
// const columns = [
//   { key: 'name', title: 'Content', dataType: DataType.String, width: "450px" },
//   { key: 'lastUpdatedOn', title: 'Last Updated', dataType: DataType.String, width: "300px" },
//   { key: 'status', title: 'Status', dataType: DataType.String, width: "300px" },
//   { key: 'contentAction', title: 'Action', dataType: DataType.String, width: "200px" },

// ]
const columns = [
  { key: 'name', title: 'TITLE & DESCRIPTION', dataType: DataType.String, width: "450px" },
  { key: 'contentType', title: 'CONTENT TYPE', dataType: DataType.String, width: "250px" },
  { key: 'status', title: 'STATUS', dataType: DataType.String, width: "100px" },
  { key: 'lastUpdatedOn', title: 'LAST MODIFIED', dataType: DataType.String, width: "100px" },
  { key: 'contentAction', title: 'ACTION', dataType: DataType.String, width: "100px" },


]
const AllContentsPage = () => {
  const theme = useTheme<any>();

  const [selectedKey, setSelectedKey] = useState("allContents");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("updated");
  const [contentList, setContentList] = React.useState<content[]>([]);
  const [data, setData] = React.useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [contentDeleted, setContentDeleted] = React.useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const [totalCount, setTotalCount] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
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

  const handleFilterChange = (filter: string[]) => {
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
        const primaryCategory = filter.length ? filter : [];
        const order = sortBy === "Created On" ? "asc" : "desc";
        const sort_by = {
          lastUpdatedOn: order,
        };
        const offset = page * LIMIT;
        const response = await getContent(
          status,
          query,
          LIMIT,
          offset,
          primaryCategory,
          sort_by
        );
        const contentList = (response?.content || []).concat(
          response?.QuestionSet || []
        );
        setContentList(contentList);
        setTotalCount(response?.count);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getContentList();
  }, [debouncedSearchTerm, filter, sortBy, contentDeleted, page]);

  useEffect(() => {
    const filteredArray = contentList.map(item => ({
      image: item?.appIcon,
      contentType: item.primaryCategory,
      name: item.name,
      primaryCategory: item.primaryCategory,
      lastUpdatedOn: timeAgo(item.lastUpdatedOn),
      status: item.status,
      identifier: item.identifier,
      mimeType: item.mimeType,
      mode: item.mode

    }));
    setData(filteredArray)
    console.log(filteredArray)
  }, [contentList]);

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
  console.log("contentList", contentList)
  return (
    <Layout selectedKey={selectedKey} onSelect={setSelectedKey}>
      <WorkspaceText />
      <Box p={3}>
        <Box sx={{ background: "#fff", borderRadius: '8px', boxShadow: "0px 2px 6px 2px #00000026", pb: '15px' }}>
          <Box p={2}>
            <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "16px" }}>All My Contents</Typography>
          </Box>
          {/* <Typography mb={2}>Here you see all your content.</Typography> */}

          <Box mb={3}>
            <SearchBox
              placeholder="Search by title..."
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
          </Box>


          {loading ? (
            <Loader showBackdrop={true} loadingText={"Loading"} />
          ) : contentList && contentList.length > 0 ? (
            contentList &&
            contentList.length > 0 && (
              <>
                <Box className="table-ka-container">
                  <KaTableComponent columns={columns} tableTitle="all-content" data={data} />
                </Box>
              </>
            )
          ) : (
            <NoDataFound />
          )}
        </Box>


      </Box>

    </Layout>
  );
};

export default AllContentsPage;
