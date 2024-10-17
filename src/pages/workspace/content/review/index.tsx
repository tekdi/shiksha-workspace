import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchContent } from "@/services/PlayerService";
import { useRouter } from "next/router";
import ConfirmActionPopup from '../../../../components/ConfirmActionPopup';
import ReviewCommentPopup from '../../../../components/ReviewCommentPopup';
import { publishContent, submitComment } from "@/services/ContentService";

const ReviewContentSubmissions = () => {
    const router = useRouter();
    const { identifier } = router.query;

    const [contentDetails, setContentDetails] = useState({
        name: "Sample Content",
        createdBy: "John Doe",
        createdOn: "2024-10-16",
        description: "This is a description of the content.",
    });

    const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
    const [confirmationActionType, setConfirmationActionType] = useState<'publish' | ''>('');

    const [openCommentPopup, setOpenCommentPopup] = useState<boolean>(false);

    useEffect(() => {
        const loadContent = async () => {
            try {
                console.log('identifier ==>', identifier);
                const data = await fetchContent(identifier);
                console.log('data ==>', data);
                setContentDetails({
                    name: data.name || "Sample Content",
                    createdBy: data.createdBy || "Unknown",
                    createdOn: data.createdOn || new Date().toISOString().split('T')[0], // Fallback to today
                    description: data.description || "No description available.",
                });
            } catch (error) {
                console.error('Failed to fetch content:', error);
            }
        };

        if (identifier) {
            loadContent();
        }
    }, [identifier]);

    const redirectToReviewPage = () => {
        router.push({ pathname: `/workspace/content/submitted` });
    }

    const closePublishPopup = () => {
        setOpenConfirmationPopup(false);
    };

    const closeCommentPopup = () => {
        setOpenCommentPopup(false);
    }

    const handleReject = () => {
        console.log("Reject button clicked");
        setOpenCommentPopup(true);
    };

    const handlePublish = () => {
        console.log("Publish button clicked");
        setConfirmationActionType('publish');
        setOpenConfirmationPopup(true);
    };

    const confirmPublishContent = async () => {
        try {
            const response = await publishContent(identifier);
            console.log('Published successfully:', response);
            // Add toaster success message here
            setOpenConfirmationPopup(false);
            router.push({ pathname: `/workspace/content/submitted` });
        } catch (error) {
            console.error('Error during publishing:', error);
            // Add toaster error message here
        }
    };

    const handleSubmitComment = async (comment: string) => {
        try {
            const response = await submitComment(identifier, comment);
            console.log('Comment submitted successfully:', response);
            // Add toaster success message here
            setOpenCommentPopup(false);
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Add toaster error message here
        }
    };

    return (
        <Card sx={{ padding: 2, backgroundColor: 'white' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" color="primary">Review Content Submissions</Typography>
                <IconButton onClick={redirectToReviewPage}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2, backgroundColor: 'white', mb: 2 }}>
                <Typography variant="h6" color="primary">Test Content</Typography>
                {/* Replace with your actual PDF player component */}
                <Box sx={{
                    border: '1px solid #000', height: '500px', marginBottom: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Typography align="center">Player will be loaded here</Typography>
                </Box>
            </Box>

            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handlePublish} sx={{ marginRight: 1 }}>
                    Publish
                </Button>
                <Button variant="contained" color="primary" onClick={handleReject}>
                    Request Changes
                </Button>
            </CardActions>

            <CardContent sx={{ border: '1px solid #ccc', borderRadius: 1, backgroundColor: 'white' }}>
                <Typography variant="h6" color="primary">Content Details</Typography>
                <Typography>Name: {contentDetails.name}</Typography>
                <Typography>Created By: {contentDetails.createdBy}</Typography>
                <Typography>Created On: {contentDetails.createdOn}</Typography>
                <Typography>Description: {contentDetails.description}</Typography>
            </CardContent>

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
