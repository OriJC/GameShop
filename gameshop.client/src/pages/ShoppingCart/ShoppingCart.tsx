import {
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



const ShoppingCartPage: React.FC<ShoppingCart> = ({ cart }) => {
    return (

    );
});

export default ShoppingCartPage;