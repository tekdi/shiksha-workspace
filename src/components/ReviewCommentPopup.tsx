import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface ReviewCommentPopupProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (comment: string) => void;
    title: string;
}

const ReviewCommentPopup: React.FC<ReviewCommentPopupProps> = ({ open, onClose, onSubmit, title }) => {
    const [comment, setComment] = useState<string>('');

    const handleSubmit = () => {
        if (comment.trim()) {
            onSubmit(comment);
            setComment('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Write your comment"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Submit Comment</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewCommentPopup;
