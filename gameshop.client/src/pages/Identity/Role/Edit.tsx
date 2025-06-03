import { useState, useEffect } from 'react'
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
    record: RoleRecord,
    onClose: () => void;
    onUpdate: (values: RoleRecord) => void;
}

interface RoleRecord {
    id: string;
    name: string;
    key: string;
}



const Edit: React.FC<ModalFormProps> = ({ open, record, onClose, onUpdate }) => {
    const [data, setData] = useState<RoleRecord>({ id: '', name: '' , key: '' });

    useEffect(() => {
        if(record)
        {
            setData(record);
        } else {
            setData({ id: '', name: '' , key: ''});
        }
        
    }, [record]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCancel = () => {
        setData({ id: '', name: '' , key: '' });
        onClose(); 
    }

    const handleUpdate = () => {
        onUpdate(data);
        setData({ id: '', name: '' , key: '' });
    };
    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Update Role</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form below to update the Role
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