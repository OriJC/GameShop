//import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
interface ModalFormProps {
    open: bool,
    onClose: () => void;
    onCreate: (values: any) => void;
}


const Create: React.FC<ModalFormProps> = ({ open, onClose, onCreate }) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Game Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form below to create a new Game Category
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onCreate}>Create</Button>
            </DialogActions>
        </Dialog>
  );
}

export default Create;