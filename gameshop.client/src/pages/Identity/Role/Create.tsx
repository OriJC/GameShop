import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';

interface ModalFormProps {
    open: boolean,
    onClose: () => void;
    onCreate: (values: any) => void;
}

interface FormData{
    name: string
}

const Create: React.FC<ModalFormProps> = ({ open, onClose, onCreate }) => {
    const [data, setData] = useState<FormData>({name: ''})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };


    const handleClose = () => {
        onCreate(data);
        setData({name: ''});
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form below to create a new Role
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleClose}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Create;