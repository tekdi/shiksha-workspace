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
import useSharedStore from "@/utils/useSharedState";
// const columns = [
//   { key: 'name', title: 'Content', dataType: DataType.String, width: "450px" },
//   { key: 'lastUpdatedOn', title: 'Last Updated', dataType: DataType.String, width: "300px" },
//   { key: 'status', title: 'Status', dataType: DataType.String, width: "300px" },
//   { key: 'contentAction', title: 'Action', dataType: DataType.String, width: "200px" },

// ]
const columns = [
  { key: 'title_and_description', title: 'TITLE & DESCRIPTION', dataType: DataType.String, width: "350px" },
  { key: 'create-by', title: 'CREATED BY', dataType: DataType.String, width: "100px" },

  { key: 'contentType', title: 'CONTENT TYPE', dataType: DataType.String, width: "100px" },
  { key: 'state', title: 'STATE', dataType: DataType.String, width: "100px" },

  { key: 'status', title: 'STATUS', dataType: DataType.String, width: "100px" },
  { key: 'lastUpdatedOn', title: 'LAST MODIFIED', dataType: DataType.String, width: "100px" },


]
const ContentsPage = () => {
  const theme = useTheme<any>();

  const [selectedKey, setSelectedKey] = useState("discover-contents");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Modified On");
 const [contentList, setContentList] = React.useState<content[]>([]);
  const [data, setData] = React.useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [contentDeleted, setContentDeleted] = React.useState(false);
  const fetchContentAPI = useSharedStore(
    (state: any) => state.fetchContentAPI
  );
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const [totalCount, setTotalCount] = useState(0);
  const [state, setState] = useState("All");

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
    console.log("sortBy", sortBy)
    setSortBy(sortBy);
  };
  const handleStateChange = (state: string) => {
    setState(state)
  };

  useEffect(() => {
    const getContentList = async () => {
      try {
        setLoading(true);
        const status = [
          // "Draft",
          // "FlagDraft",
          // "Review",
          // "Processing",
          "Live",
          // "Unlisted",
          // "FlagReview",
        ];
        const query = debouncedSearchTerm || "";
        const primaryCategory = filter.length ? filter : [];
        const order = sortBy === "Created On" ? "asc" : "desc";
        const sort_by = {
          lastUpdatedOn: order,
        };
        const offset =debouncedSearchTerm!==""? 0 : page * LIMIT;

        const contentType="discover-contents"
let response;
if(state!=="All")
{
  response = await getContent(
    status,
    query,
    LIMIT,
    offset,
    primaryCategory,
    sort_by,
    contentType,
    state
  );
}
else{
  response = await getContent(
    status,
    query,
    LIMIT,
    offset,
    primaryCategory,
    sort_by,
    contentType
  );
}
        
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
  }, [debouncedSearchTerm, filter,fetchContentAPI, sortBy, state, page]);

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
      mode: item.mode,
      creator: item.creator,
      description: item?.description,
      state: item?.state,
      author: item.author
    }));
    setData(filteredArray)
    console.log(filteredArray)
  }, [contentList]);

  

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
        <Box sx={{ background: "#fff", borderRadius: '8px', boxShadow: "0px 2px 6px 2px #00000026", pb: totalCount > LIMIT ? '15px' : '0px' }}>
          <Box p={2}>
            <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "16px" }}>Discover Contents</Typography>
          </Box>
          {/* <Typography mb={2}>Here you see all your content.</Typography> */}

          <Box mb={3}>
            <SearchBox
              placeholder="Search by title..."
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onStateChange={handleStateChange}
              discoverContents={true}
            />
          </Box>
              {loading ? (
            <Loader showBackdrop={true} loadingText={"Loading"} />
          ) : (
            <>
                <Box className="table-ka-container">
                  <KaTableComponent columns={columns} tableTitle="discover-contents" data={data} />
                </Box>
              </>
          )}
           {totalCount > LIMIT && (
            <PaginationComponent
              count={Math.ceil(totalCount / LIMIT)}
              page={page}
              setPage={setPage}
             onPageChange={(event, newPage) => setPage(newPage - 1)}
            />
          )}
        </Box>

       
      </Box>

    </Layout>
  );
};

export default ContentsPage;
