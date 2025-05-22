//import { useState } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField
} from '@mui/material';
interface ModalFormProps {
    open: boolean
    record: Object,
    onClose: () => void;
    onDelete: (values: any) => void;
}


const Delete: React.FC<ModalFormProps> = ({ open, record, onClose, onDelete }) => {

    const handleDelete = () => {
        onDelete(record.id)
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Press Delete to delete this Role
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="id"
                    label="id"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={record.id}
                    disabled
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="name"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={record.name}
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Delete;