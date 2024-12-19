import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Box,
    Grid,
    IconButton,
    TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmActionPopupProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (checkedItems: string[], comment?:any) => void;
    actionType: any
}

const ConfirmActionPopup: React.FC<ConfirmActionPopupProps> = ({
    open,
    onClose,
    onConfirm,
    actionType,
}) => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [comment, setComment] = useState<string>('');

    const usabilityOptions = [
        'Correct Spellings and Grammar',
        'Simple Language',
        'Content/Audio/Video quality',
        'Suitable font size for app and portal',
        'Copyright infringement (images and texts)',
    ];

    const contentDetailsOptions = [
        'Appropriate Title',
        'Standard description of the course/resource',
        'Relevant tags and keywords',
        'Appropriate image',
    ];

    const handleCheckboxChange = (item: string) => {
        setCheckedItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    const handleClose = () => {
        setCheckedItems([]); // Clear all checked items
        setComment(''); // Clear the comment
        onClose(); // Call the parent-provided onClose handler
    };

    const handleConfirm = () => {
        onConfirm(checkedItems, comment);
    };

    const allOptions = [...usabilityOptions, ...contentDetailsOptions];
    const allChecked = allOptions.every((option) => checkedItems.includes(option));

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle
                sx={{
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {actionType === 'publish' ? 'Confirm Publish Action' : 'Confirm Reject Action'}
                <IconButton onClick={handleClose} sx={{ color: 'black' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Typography gutterBottom mt="20px">
                    {actionType === 'publish' ? 'Please confirm that ALL the following items are verified (by ticking the checkboxes) before you can {actionType}':'Please select the reason(s) for rejection by ticking the checkboxes below and provide a comment to proceed with rejecting the action:'}
                </Typography>

                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="h6">Usability</Typography>
                            {usabilityOptions.map((option) => (
                                <FormControlLabel
                                    key={option}
                                    control={
                                        <Checkbox
                                            checked={checkedItems.includes(option)}
                                            onChange={() => handleCheckboxChange(option)}
                                            sx={{
                                                color: 'black',
                                                '&.Mui-checked': {
                                                    color: 'black',
                                                },
                                            }}
                                        />
                                    }
                                    label={option}
                                />
                            ))}
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">Content Details</Typography>
                            {contentDetailsOptions.map((option) => (
                                <FormControlLabel
                                    key={option}
                                    control={
                                        <Checkbox
                                            checked={checkedItems.includes(option)}
                                            onChange={() => handleCheckboxChange(option)}
                                            sx={{
                                                color: 'black',
                                                '&.Mui-checked': {
                                                    color: 'black',
                                                },
                                            }}
                                        />
                                    }
                                    label={option}
                                />
                            ))}
                        </Grid>
                    </Grid>

                    {actionType === 'reject' && (
                        <TextField
                            label="Write your comment"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    )}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary" sx={{ minWidth: '120px', textTransform: 'capitalize' }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                    className={
                        (comment === '' && actionType === 'reject') ||
                        (actionType === 'publish' && !allChecked)
                            ? undefined
                            : 'Request-btn'
                    }
                    sx={{
                        minWidth: '120px',
                        textTransform: 'capitalize',
                        borderRadius: '100px',
                    }}
                    disabled={
                        (comment === '' && actionType === 'reject') ||
                        (actionType === 'publish' && !allChecked)
                    }
                >
                    {actionType === 'publish' ? 'Publish' : 'Reject'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmActionPopup;


