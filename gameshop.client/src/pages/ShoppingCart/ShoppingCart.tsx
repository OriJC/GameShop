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
    Box,
    Stack
} from '@mui/material';
import { useState, useEffect } from 'react';
import Product from '@/models/Product';
import { ShoppingCart, ShoppingCartItem } from '@/models/ShoppingCart';
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { useNavigate } from 'react-router-dom';
import store from '@/store/store'
import { getShoppingCart, updateItemQuantity, RemoveItemFromCart, getShoppingCartInfo } from '@/api/ShoppingCart/ShoppingCart';
import  './ShoppingCart.less'
import { getProductImageByImageId } from '@/api/Product/Product';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const ShoppingCartPage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ShoppingCartItem[]>([])
    const [username, setUsername] = useState<string>("")
    const [open, setOpen] = useState(false);
    const [dialogId, setDialogId] = useState('')
    const [cart, setCart] = useState<ShoppingCart>()
    const handleClickOpen = (itemId: string) => {
        setOpen(true);
        setDialogId(itemId)
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
        setCart(res.data)
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
        setUsername(userName || '')
        setData(items)
        
    }

    const updateShoppingItemQuantity = async (item: ShoppingCartItem, action: number) => {
        let newQuantity = item.quantity + action
        const userName = store.getState().auth.userName
        if (newQuantity <= 0){
            handleClickOpen(item.id)
            /*RemoveItemFromCart(userName || '', item.id).then((res) => {
                if(res.status === 200){
                    setData((prevData) => {
                        return prevData.filter((prevItem) => prevItem.id !== item.id)
                    })
                }
            }).catch((error) => {
                console.log(error)
            })*/
        }
        else{
                updateItemQuantity(userName || '', item.id, newQuantity).then((res) => {
                    if(res.status === 200){
                        setData((prevData) => {
                            return prevData.map((prevItem) => {
                                let totalPrice = 0
                                if (newQuantity > 100)
                                    totalPrice= newQuantity * prevItem.product.price100
                                else if (newQuantity <= 100 && newQuantity > 50)
                                    totalPrice= newQuantity * prevItem.product.price50
                                else if (newQuantity <= 50 && newQuantity > 10)
                                    totalPrice= newQuantity * prevItem.product.price
                                else 
                                    totalPrice= newQuantity * prevItem.product.listPrice
                                if(prevItem.id === item.id){

                                    return {...prevItem, quantity: newQuantity, totalPrice: totalPrice}
                                }
                                return prevItem
                            })
                        })
                        const cart = getShoppingCartInfo(userName || '').then(res =>{
                                setCart(prev => {
                                if (!prev) return prev; 
                                    return {
                                        ...prev,
                                        totalPrice: res.data.totalPrice
                                    };
                                });     
                        }).catch(error =>{
                            console.log(error)
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }    
    }

    const handleRemoveItem = () => {
        const userName = store.getState().auth.userName
        console.log('Removing:', dialogId)
        if(userName != null)
        {
            RemoveItemFromCart(userName, dialogId).then((res) => {
                if(res.status === 200){
                    fetchData()
                }
            })
        }
        handleClose()
            
    }

    const handleGo = async() => {

        navigate('/order/paymentInfo', {state: cart})
    }


    return (
        <Paper>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="alert-dialog-title" 
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Comfirm to remove this item from shopping Cart?"}
                </DialogTitle>
                <DialogContent id="alert-dialog-description">
                    Press Confirm this item from shopping cart
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>DisAgree</Button>
                    <Button onClick={handleRemoveItem} autoFocus>Agree</Button>
                </DialogActions>
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
                                            <img src={'data:' + item.imageString.contentType + ';base64,' + item.imageString.imageContent} alt={item.product.name} style={{ width: '100px', height: '100px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {item.product.name}
                                            </Typography>   
                                            <br />
                                            <Typography variant="body1">
                                                ${item.totalPrice}
                                            </Typography>                                   
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-end" sx={{mr:2}}>
                                                <Button variant="contained" className="itemNumberButton" onClick={() => updateShoppingItemQuantity(item, -1)}>
                                                    <RemoveOutlinedIcon />
                                                </Button>
                                                <Box sx={{width: 30, display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                                                    <Typography variant="body1" sx={{align: 'center'}}>
                                                        {item.quantity}
                                                    </Typography>
                                                </Box>
                                                
                                                <Button variant="contained" className="itemNumberButton" onClick={() => updateShoppingItemQuantity(item, 1)}>
                                                    <AddOutlinedIcon />
                                                </Button>
                                            </Stack>                                         
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align='right' sx={{pr:2}}>
                                <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-end" sx={{mr:2}}>
                                    <Typography>
                                        Total Price: ${cart?.totalPrice? cart?.totalPrice : 0}
                                    </Typography>
                                    <Button className="checkoutButton" onClick={handleGo} disabled={data.length===0}>
                                        <Typography>
                                            Checkout
                                        </Typography>
                                    </Button>
                                </Stack>    
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
                
        </Paper>        
    );
};

export default ShoppingCartPage;