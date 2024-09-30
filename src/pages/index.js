import React from "react";
import QuestionSetEditor from "./QuestionSetEditor";
import Layout from "../components/Layout";
import { Typography, Box } from "@mui/material";
import { useState } from "react";

function IndexPage() {
  const [selectedKey, setSelectedKey] = useState("create");
  return (
    // <div className="App">
    //   <QuestionSetEditor />
    // </div>

    <Layout selectedKey={selectedKey} onSelect={setSelectedKey}>
      <Box p={3}>
        <Typography variant="h4">Welcome to My Workspace</Typography>
        <Typography>Here you can manage your content.</Typography>
      </Box>
    </Layout>
  );
}

export default IndexPage;
