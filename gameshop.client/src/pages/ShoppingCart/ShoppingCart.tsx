import {
    Paper,
    Typography,
    Card,
    Button,
    Grid,
    CardHeader,
    CardContent,
    CardActions,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    OutlinedInput,
    Box,
    Chip,
    CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import Product from '@/models/Product';
import { ShoppingCart, ShoppingCartItem } from '@/models/ShoppingCart';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import store from '@/store/store'



const ShoppingCartPage: React.FC = () => {
    const [data, setData] = useState<ShoppingCartItem[]>([])
    const [username, setUsername] = useState<string>("")
    const getUserData = () => {
        const username = store.getState().auth.username
        console.log(store.getState().auth)
        if (username == null) {
            console.log('testing')
        }else {
            setUsername(username)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        getUserData()
    }
    return (
        <Paper>
            <Grid item className="ms-3 mt-2">
                <Typography component="h1" variant="h5">
                    {username}'s ShoppingCart
                </Typography>
            </Grid>
        </Paper>        
    );
};

export default ShoppingCartPage;