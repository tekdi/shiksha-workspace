import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchContent } from "@/services/PlayerService";
import { useRouter } from "next/router"; // Import useRouter

const ReviewContentSubmissions = () => {
    const theme = useTheme();
    const router = useRouter(); // Initialize the router
    const { identifier } = router.query; 
    const [contentDetails, setContentDetails] = useState({
        name: "Sample Content",
        createdBy: "John Doe",
        createdOn: "2024-10-16",
        description: "This is a description of the content.",
    });

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

        loadContent();
    }, [identifier]);

    const handleClose = () => {
        console.log("Close button clicked");
        router.push({ pathname: `/workspace/content/submitted` });
    };

    const handleReject = () => {
        console.log("Reject button clicked");
        router.push({ pathname: `/workspace/content/submitted` });
    };

    const handlePublish = () => {
        console.log("Publish button clicked");
        router.push({ pathname: `/workspace/content/submitted` });
    };

    return (
        <Card sx={{ padding: 2, backgroundColor: 'white' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" color="primary">Review Content Submissions</Typography>
                <IconButton onClick={handleClose}>
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
                <Button variant="contained" color="primary" onClick={handleReject} sx={{ marginRight: 1 }}>
                    Publish
                </Button>
                <Button variant="contained" color="primary" onClick={handlePublish}>
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
        </Card>
    );
};

export default ReviewContentSubmissions;
