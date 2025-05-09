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
import { getProductImageByImageId } from '@/api/Product/Product';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

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

    const getUserShoppingCartData = async() => {
        const userName = store.getState().auth.userName
        const res = await getShoppingCart(userName || '')
        let items : ShoppingCartItem[] = res.data.items || []

        items = await Promise.all(
            items.map(async (item) => {
                if(item.product?.imageFileId){
                    try {
                        const imageString = await getProductImageByImageId(item.product.imageFileId)
                        return {...item, imageString: imageString.data}
                    }catch (error) {
                        return {...item, imageString: ''}
                    }
                }
                return {...item, imageString: ''}
            })
        )
        console.log(items)
        setUsername(userName || '')
        setData(items)
        
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
                    <Button variant="contained" color="primary" onClick={() => {navigate('/')}}>
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
                                            <img src={'data:' + item.imageString?.contentType + ';base64,' + item.imageString?.imageContent} alt={item.product.name} style={{ width: '100px', height: '100px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {item.product.name}
                                            </Typography>   
                                            <br />
                                            <Typography variant="body1">
                                                ${item.product.price}
                                            </Typography>                                   
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="contained" color="secondary" onClick={() => {}}>
                                                <RemoveOutlinedIcon />
                                            </Button>
                                            <Typography variant="body1">
                                                {item.quantity}
                                            </Typography>
                                            <Button variant="contained" color="secondary" onClick={() => {}}>
                                                <AddOutlinedIcon />
                                            </Button>
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