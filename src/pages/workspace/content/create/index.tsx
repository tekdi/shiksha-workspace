import React, { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { Typography, Box, useTheme } from "@mui/material";
import ContentCard from "../../../../components/ContentCard";
import DescriptionIcon from "@mui/icons-material/Description";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UploadIcon from "@mui/icons-material/Upload";
import { useRouter } from "next/router";
import { createCourse, createQuestionSet } from "@/services/ContentService";
import axios from "axios";

const CreatePage = () => {
  const theme = useTheme<any>();
  const [selectedKey, setSelectedKey] = useState("create");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        document.cookie = `authToken=${token}; path=/; secure; SameSite=Strict`;
      }

      const response = await createQuestionSet();
      console.log("Question set created successfully:", response);

      const identifier = response?.result?.identifier;
      router.push({
        pathname: `/editor`,
        query: { identifier },
      });
    } catch (error) {
      console.error("Error creating question set:", error);
    }
  };

  const openEditor = () => {
    fetchData();
  };

  const fetchCollectionData = async () => {
    try {
      const userId = "bcb1050b-1967-4a04-8da2-df3ed9d282d4";
      const response = await createCourse(userId);
      console.log("Course set created successfully:", response);

      const identifier = response?.result?.identifier;
      router.push({
        pathname: `/collection`,
        query: { identifier },
      });
    } catch (error) {
      console.error("Error creating question set:", error);
    }
  };

  const openCollectionEditor = () => {
    fetchCollectionData();
  };

  const cardData = [
    {
      title: "Upload Content",
      description: "You can upload content here.",
      icon: <UploadIcon fontSize="large" />,
      onClick: () => router.push("/upload-editor"),
    },
    {
      title: "Upload Large Videos(>50 MB)",
      description: "You can upload content here.",
      icon: <UploadIcon fontSize="large" />,
      onClick: () => router.push({
        pathname: '/upload-editor',
        query: { editorforlargecontent: 'true' },
      })
    },
    {
      title: "Question Set",
      description: "Create Questionsets",
      icon: <DescriptionIcon fontSize="large" />,
      onClick: openEditor,
    },
    {
      title: "Course",
      description: "Design courses using collections and resources.",
      icon: <DescriptionOutlinedIcon fontSize="large" />,
      onClick: openCollectionEditor,
    },
  ];

  return (
    <Layout selectedKey={selectedKey} onSelect={setSelectedKey}>
      <Box p={3}>
        <Typography
          variant="h2"
          fontSize={"16px"}
          sx={{ color: theme.palette.warning["100"] }}
        >
          Here you can create new content.
        </Typography>
      </Box>

      <Box
        display={"flex"}
        gap={"1rem"}
        padding={"1rem"}
        justifyContent={"flex-start"}
      >
        {cardData.map((card, index) => (
          <ContentCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            onClick={card.onClick}
          />
        ))}
      </Box>
    </Layout>
  );
};

export default CreatePage;
