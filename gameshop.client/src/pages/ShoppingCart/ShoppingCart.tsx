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
    CircularProgress,
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Tab,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Product from '@/models/Product';
import { ShoppingCart, ShoppingCartItem } from '@/models/ShoppingCart';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import store from '@/store/store'
import { getShoppingCart } from '@/api/ShoppingCart/ShoppingCart';
import  './ShoppingCart.less'


const ShoppingCartPage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ShoppingCartItem[]>([])
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        getUserShoppingCartData()
    }

    const getUserShoppingCartData = () => {
        const userName = store.getState().auth.userName
        console.log(userName)
        const cart = getShoppingCart(userName ? userName : '').then(res => {
            setUsername(userName ? userName : '')
            setData(res.data.Items? res.data.Items : [])
        })
    }
    return (
        <Paper>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item className="ms-3 mt-2">
                    <Typography component="h1" variant="h5">
                        {username}'s Shopping Cart
                    </Typography>
                </Grid>
                <Grid item className="me-3 mt-2">
                    <Button variant="outlined" color="primary" onClick={() => {navigate('/')}}>
                        Continue Shopping
                    </Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>                       
                            <TableCell />
                            <TableCell />
                            <TableCell />
                        </TableRow>                     
                    </TableHead>
                    <TableBody>
                        {
                            data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={1} align="center">
                                        <Typography variant="h6">Your shopping cart is empty</Typography>
                                    </TableCell>
                                </TableRow>
                            ): (
                                data.map((item, index) => (
                                    
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Typography variant="h6">{item.Product.Name}</Typography>                                            
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body1">Price: {item.Product.Price}</Typography>
                                            <Typography variant="body1">Quantity: {item.Quantity}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
                </TableContainer>
                
        </Paper>        
    );
};

export default ShoppingCartPage;