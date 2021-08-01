import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';
import DoneIcon from "@material-ui/icons/Done";

const AlertDialog = ({message}) => {
    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(!open);

    return (
        <Dialog
            open={open}
            onClose={handleOpen}
        >
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOpen} color="primary">
                    <DoneIcon/>
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;
