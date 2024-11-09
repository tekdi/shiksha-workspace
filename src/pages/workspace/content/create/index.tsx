import React, { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { Typography, Box, useTheme, Paper } from "@mui/material";
import ContentCard from "../../../../components/ContentCard";
import DescriptionIcon from "@mui/icons-material/Description";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UploadIcon from "@mui/icons-material/Upload";
import { useRouter } from "next/router";
import { createCourse, createQuestionSet } from "@/services/ContentService";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import largeVideoIcon from '../../../../../public/150+.png';
import Image from "next/image";
import WorkspaceText from '../../../../components/WorkspaceText'

const CreatePage = () => {
  const theme = useTheme();
  const [selectedKey, setSelectedKey] = useState("create");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      document.cookie = `authToken=${token}; path=/; secure; SameSite=Strict`;
      document.cookie = `userId=${userId}; path=/; secure; SameSite=Strict`;
    }
  }, []);

  const fetchData = async () => {
    try {
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
      const userId =
        localStorage.getItem("userId") ||
        "5afb0c71-5e85-46f6-8780-3059cbb7bbf9";
      const response = await createCourse(userId);
      console.log("Course set created successfully:", response);

      const identifier = response?.result?.identifier;
      router.push({
        pathname: `/collection`,
        query: { identifier },
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const openCollectionEditor = () => {
    fetchCollectionData();
  };

  const cardData = [
    {
      title: "New Question Set",
      description: "Create assessments, question banks, quizzes, etc.",
      icon: <QuizOutlinedIcon fontSize="large" />,
      onClick: openEditor,
    },
    {
      title: "New Course",
      description:
        "Description about what this is and what the user can create.",
      icon: <SchoolOutlinedIcon fontSize="large" />,
      onClick: openCollectionEditor,
    },
    {
      title: "New Content",
      description: "Create new documents, PDF, video, QML, HTML, etc.",
      icon: <VideoLibraryOutlinedIcon fontSize="large" />,
      onClick: () => router.push("/upload-editor"),
    },
    {
      title: "New Large Content",
      description: "Videos and documents larger than 150 MB",
      icon: <Image src={largeVideoIcon} alt="large-video" height={35} width={70} />,
      onClick: () =>
        router.push({
          pathname: "/upload-editor",
          query: { editorforlargecontent: "true" },
        }),
    },
  ];

  return (
    <Layout selectedKey={selectedKey} onSelect={setSelectedKey}>
      <WorkspaceText />

      {/* Outer box for "Create new content" heading and cards */}
      <Box
        sx={{
          backgroundColor: "#F7F2FA",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: theme.shadows[3],
        }}
        m={3} // Margin around the box for spacing
      >
        <Typography variant="h4" sx={{ mb: 2 }} fontSize={'16px'} fontWeight={500}>
          Create new content
        </Typography>

        <Box
          display="flex"
          gap="1rem"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {cardData.map((card, index) => (
            <Paper
              key={index}
              elevation={3}
              onClick={card.onClick}
              sx={{
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "left",
                cursor: "pointer",
                flex: "1 1 180px",
                maxWidth: "220px",
                border: "solid 1px #D0C5B4",
                boxShadow: 'none',
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {card.icon}
              <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{mt: 1, mb: 0}}>
                {card.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default CreatePage;
