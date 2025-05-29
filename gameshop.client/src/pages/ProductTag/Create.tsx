import { ChangeEvent, useState } from 'react'
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
    open: boolean,
    onClose: () => void;
    onCreate: (values: {name: string}) => void;
}


const Create: React.FC<ModalFormProps> = ({ open, onClose, onCreate }) => {
    const [data, setData] = useState<string>('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value);
    };

    const handleCancel = () => {
        setData('');
        onClose();
    }

    const handleClose = () => {
        if (data.trim() === '') return;
        onCreate({name: data});
        setData('');
        onClose();
    };


    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Create New Product Tag</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form below to create a new Product Tag
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