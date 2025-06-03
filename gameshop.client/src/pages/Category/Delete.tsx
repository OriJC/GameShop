//import { useState } from 'react'
import { Category } from '@/models/Category';
import {Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle, 
        Button, 
        TextField } 
from '@mui/material';
interface ModalFormProps {
    open: boolean
    record: Category| null,
    onClose: () => void;
    onDelete: (values: any) => void;
}



const Delete: React.FC<ModalFormProps> = ({ open, record, onClose, onDelete }) => {
    if(!record) return null;
    
    const handleDelete = () => {
        onDelete(record.id)
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Press Delete to delete this Category
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="id"
                    label="id"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={record.id}
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
                    value={record.name}
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