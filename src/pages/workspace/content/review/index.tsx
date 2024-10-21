import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchContent } from "@/services/PlayerService";
import { useRouter } from "next/router";
import ConfirmActionPopup from "../../../../components/ConfirmActionPopup";
import ReviewCommentPopup from "../../../../components/ReviewCommentPopup";
import { publishContent, submitComment } from "@/services/ContentService";
import Players from "@/components/Players";
import { playerConfig } from "../../../../components/PlayerConfig";
import SunbirdPdfPlayer from "@/components/SunbirdPdfPlayer";

const ReviewContentSubmissions = () => {
  const router = useRouter();
  const { identifier } = router.query;
  // const identifier = "do_2141610327664312321258";

  const [contentDetails, setContentDetails] = useState<any>(undefined);
  const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
  const [confirmationActionType, setConfirmationActionType] = useState<
    "publish" | ""
  >("");
  const [openCommentPopup, setOpenCommentPopup] = useState<boolean>(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        if (identifier) {
          const data = await fetchContent(identifier);
          // playerConfig.metadata = data;
          console.log(playerConfig);
          console.log("data ==>", data);
          setContentDetails(data);
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
      }
    };

    if (identifier) {
      loadContent();
    }
  }, [identifier]);

  const redirectToReviewPage = () => {
    router.push({ pathname: `/workspace/content/submitted` });
  };

  const closePublishPopup = () => {
    setOpenConfirmationPopup(false);
  };

  const closeCommentPopup = () => {
    setOpenCommentPopup(false);
  };

  const handleReject = () => {
    console.log("Reject button clicked");
    setOpenCommentPopup(true);
  };

  const handlePublish = () => {
    console.log("Publish button clicked");
    setConfirmationActionType("publish");
    setOpenConfirmationPopup(true);
  };

  const confirmPublishContent = async () => {
    try {
      const response = await publishContent(identifier);
      console.log("Published successfully:", response);
      // Add toaster success message here
      setOpenConfirmationPopup(false);
      router.push({ pathname: `/workspace/content/submitted` });
    } catch (error) {
      console.error("Error during publishing:", error);
      // Add toaster error message here
    }
  };

  const handleSubmitComment = async (comment: string) => {
    try {
      const response = await submitComment(identifier, comment);
      console.log("Comment submitted successfully:", response);
      // Add toaster success message here
      setOpenCommentPopup(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
      // Add toaster error message here
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card sx={{ padding: 2, backgroundColor: "white" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" color="primary">
          Review Content Submissions
        </Typography>
        <IconButton onClick={redirectToReviewPage}>
          <CloseIcon />
        </IconButton>
      </Box>

      {contentDetails ? (
        <>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 1,
              padding: 2,
              backgroundColor: "white",
              mb: 2,
            }}
          >
            <Typography variant="h6" color="primary">
              {contentDetails.name}
            </Typography>
            <Box
              sx={{
                border: "1px solid #000",
                height: "500px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ height: "100%", width: "100%" }}>
                <Players playerConfig={playerConfig} />
              </div>
            </Box>
          </Box>

          <CardActions
            disableSpacing
            sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handlePublish}
              sx={{ marginRight: 1 }}
            >
              Publish
            </Button>
            <Button variant="contained" color="primary" onClick={handleReject}>
              Request Changes
            </Button>
          </CardActions>

          <CardContent
            sx={{
              border: "1px solid #ccc",
              borderRadius: 1,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h6" color="primary">
              Content Details
            </Typography>
            <Typography>
              <strong>Name:</strong> {contentDetails.name}
            </Typography>
            <Typography>
              <strong>Creator:</strong> {contentDetails.creator}
            </Typography>
            <Typography>
              <strong>Description:</strong> {contentDetails.description}
            </Typography>
            <Typography>
              <strong>Primary Category:</strong>{" "}
              {contentDetails.primaryCategory}
            </Typography>
            <Typography>
              <strong>Created On:</strong>{" "}
              {formatDate(contentDetails.createdOn)}
            </Typography>
            <Typography>
              <strong>Last Update:</strong>{" "}
              {formatDate(contentDetails.lastUpdatedOn)}
            </Typography>
          </CardContent>
        </>
      ) : (
        <Typography>No content details available</Typography>
      )}

      <ConfirmActionPopup
        open={openConfirmationPopup}
        onClose={closePublishPopup}
        actionType={confirmationActionType}
        onConfirm={confirmPublishContent}
      />

      <ReviewCommentPopup
        open={openCommentPopup}
        onClose={closeCommentPopup}
        onSubmit={handleSubmitComment}
        title="Submit Your Comment"
      />
    </Card>
  );
};

export default ReviewContentSubmissions;
