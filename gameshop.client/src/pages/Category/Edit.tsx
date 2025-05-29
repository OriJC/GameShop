import { useState, useEffect } from 'react'
import {Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle, 
        Button, 
        TextField } 
from '@mui/material';
import { Category } from '@/models/Category';
interface ModalFormProps {
    open: boolean
    record: Category | null,
    onClose: () => void;
    onUpdate: (values: Category) => void;
}


const Edit: React.FC<ModalFormProps> = ({ open, record, onClose, onUpdate }) => {
    const [data, setData] = useState<Category>({ id: '', name: '' });

    useEffect(() => {
        setData(record ?? { id: '', name: '' });
    }, [record]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCancel = () => {
        setData({ id: '', name: '' });
        onClose(); 
    }

    const handleUpdate = () => {
        onUpdate(data);
        setData({ id: '', name: '' });
    };
    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Update Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form below to update the Category
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="id"
                    label="id"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.id || ''}
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
                    value={data.name || ''}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Edit;