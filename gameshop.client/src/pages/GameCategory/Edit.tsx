import { useState, useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
interface ModalFormProps {
    open: boolean
    record: Object,
    onClose: () => void;
    onUpdate: (values: any) => void;
}


const Edit: React.FC<ModalFormProps> = ({ open, record, onClose, onUpdate }) => {
    const [data, setData] = useState<{ id: string; name: string }>({ id: '', name: '' });

    useEffect(() => {
        // 确保当record更新时，状态也更新，而不会是undefined
        setData(record || { id: '', name: '' });
    }, [record]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 针对具体的输入字段id更新data状态
        const { id, value } = event.target;
        setData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCancel = () => {
        setData({});
    }

    const handleUpdate = () => {
        onUpdate(data);
        setData({});
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Game Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form below to update the Game Category
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
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Edit;