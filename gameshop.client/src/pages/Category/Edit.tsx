import { useState, useEffect } from 'react'
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
    record: Object,
    onClose: () => void;
    onUpdate: (values: any) => void;
}


const Edit: React.FC<ModalFormProps> = ({ open, record, onClose, onUpdate }) => {
    const [data, setData] = useState<{ id: string; name: string }>({ id: '', name: '' });

    useEffect(() => {
        setData(record || { id: '', name: '' });
    }, [record]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCancel = () => {
        setData({});
        onClose(); 
    }

    const handleUpdate = () => {
        onUpdate(data);
        setData({});
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