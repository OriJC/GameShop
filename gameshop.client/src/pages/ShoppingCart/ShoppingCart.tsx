import {
    Paper,
    Typography,
    Card,
    Button,
    Grid,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle,
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
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { useNavigate } from 'react-router-dom';
import store from '@/store/store'
import { getShoppingCart, updateItemQuantity, RemoveItemFromCart } from '@/api/ShoppingCart/ShoppingCart';
import  './ShoppingCart.less'
import { getProductImageByImageId } from '@/api/Product/Product';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const ShoppingCartPage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ShoppingCartItem[]>([])
    const [username, setUsername] = useState<string>("")
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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

    const updateShoppingItemQuantity = async (item: ShoppingCartItem, action: number) => {
        let newQuantity = item.quantity + action
        const userName = store.getState().auth.userName
        if (newQuantity === 0)
        {
            RemoveItemFromCart(userName || '', item.id).then((res) => {
                if(res.status === 200){
                    setData((prevData) => {
                        return prevData.filter((prevItem) => prevItem.id !== item.id)
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        updateItemQuantity(userName || '', item.id, newQuantity).then((res) => {
            if(res.status === 200){
                setData((prevData) => {
                    return prevData.map((prevItem) => {
                        if(prevItem.id === item.id){
                            return {...prevItem, quantity: newQuantity}
                        }
                        return prevItem
                    })
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <Paper>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="alert-dialog-title" 
                aria-describedby="alert-dialog-description"
            >
            </Dialog>
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
                                            <Button variant="contained" className="itemNumberButton" onClick={() => updateShoppingItemQuantity(item, -1)}>
                                                <RemoveOutlinedIcon />
                                            </Button>
                                            <Typography variant="body1">
                                                {item.quantity}
                                            </Typography>
                                            <Button variant="contained" onClick={() => updateShoppingItemQuantity(item, 1)}>
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