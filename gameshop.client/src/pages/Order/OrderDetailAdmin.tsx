import {
    Card,
    Grid,
    CardHeader,
    CardContent,
    Typography,
    Table,
    TableContainer,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Button,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Skeleton,
    Snackbar,
    Alert
} from '@mui/material';
import { useState, useEffect } from 'react'
import type * as Order from '@/models/Order'; 
import { getOrderById, updateOrder } from '@/api/Order/Order'
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingCartItem } from '@/models/ShoppingCart';
import { getProductImageByImageId } from '@/api/Product/Product';
import PlaceIcon from '@mui/icons-material/Place';
import MailIcon from '@mui/icons-material/Mail';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

const OrderDetail: React.FC = () => {
    const routeParams = useParams<{ orderId: string }>();
    const [data, setData] = useState<Order.OrderDetail | null>();
    const [loading, setLoading] = useState(false)
    const [itemData, setItemData] = useState<ShoppingCartItem[]>([])
    const [updateLogOpen, setUpdateLogOpen] = useState(false)
    const navigate = useNavigate();
    
    const orderStatusMap: {[key: string]: string} = {
        PENDING: 'Pending',
        PROCESSING: 'Processing',
        SHIPPED: 'Shipped',
        COMPLETED: 'Completed',
        CANCELLED: 'Cancelled'
    };

    const paymentStatusMap: {[key: string]: string} = {
        PENDING_PAYMENT: 'Pending Payment',
        PAID: 'Paid',
        REFUNDED: 'Refunded',
        FAILED: 'Failed'
    };
    

    useEffect(() => {
        
        fetchData()
        
    }, []);

    const handleChangeOrderStatus = (event: SelectChangeEvent) => {
        const value = event.target.value
        setData((prev)=>{
            if (!prev) return prev;
            return {
                ...prev,
                orderHeader: {
                    ...prev.orderHeader,
                    orderStatus: value,
                },
            }
        });
    }

    const handleChangePaymentStatus = (event: SelectChangeEvent) => {
        const value = event.target.value
        setData((prev)=>{
            if (!prev) return prev;
            return {
                ...prev,
                orderHeader: {
                    ...prev.orderHeader,
                    paymentStatus: value,
                },
            }
        });
    }

    const fetchData = async () => {
        setLoading(true)
        let orderId = routeParams.orderId ?? ''
        await getOrderById(orderId).then(async (res) => {
            setData(res.data)
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
            setItemData(items)
        })
        setLoading(false)
    }

    

    const handleBack = () => {
        navigate(-1)
    }

    const handleUpdateStatus = async() => {
        if(data!=undefined)
        {
            updateOrder(data).then(res=>{
                console.log(res.data)
            }).catch(err=>{
                console.log(err)
            }).finally(() => {
                setUpdateLogOpen(true)
            })
        }
        
    }

    if (loading) {
        return (
            <div>
                Loading
            </div>
        )
    }
    else
    return (
        <Grid container spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader
                        title={'Order ID: ' + data?.orderId}
                        titleTypographyProps={{ align: 'center', variant: 'h4' }}
                    />
                        
                    <CardContent>
                        <Typography variant="body1" sx={{textAlign: 'center'}}>
                            <PlaceIcon />{data?.orderHeader.streetAddress}, {data?.orderHeader.city}, {data?.orderHeader.state}
                            <br />
                            <MailIcon /> {data?.orderHeader.name}     
                            <PhoneEnabledIcon /> {data?.orderHeader.phoneNumber}
                        </Typography>  
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>                       
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                    </TableRow>                     
                                </TableHead>
                                <TableBody>
                                    {
                                        itemData?.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={1} align="center">
                                                    <Typography variant="h6">Your shopping cart is empty</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ): (
                                            itemData.map((item, index) => (
                                                
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <img src={'data:' + item.imageString.contentType + ';base64,' + item.imageString.imageContent} alt={item.product.name} style={{ width: '100px', height: '100px' }} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="h6" sx={{pl: 2}}>
                                                            {item.product.name} 
                                                        </Typography>                                                                                           
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body1" sx={{textAlign: 'right', pr: 'auto'}}>
                                                            x {item.quantity}
                                                        </Typography>   
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body1" sx={{textAlign: 'right'}}>
                                                            ${item.totalPrice}
                                                        </Typography>   
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )
                                    }
                                    <TableRow>
                                        <TableCell>
                                            <Button 
                                                variant='contained' 
                                                sx={{mt: 2, ml:1}} 
                                                onClick={handleUpdateStatus}
                                            >
                                                Save
                                            </Button>
                                            <Button variant='contained' sx={{mt: 2, ml:1}} onClick={handleBack}>
                                                Back
                                            </Button>
                                            <Snackbar
                                                open={updateLogOpen}
                                                autoHideDuration={3000}
                                                onClose={() => setUpdateLogOpen(false)}
                                                anchorOrigin={{vertical: 'bottom', horizontal:'left'}}
                                            >
                                                <Alert severity="success" sx={{ width: '100%' }}>
                                                    Update Successfully！
                                                </Alert>
                                            </Snackbar>
                                        </TableCell>
                                        <TableCell sx={{ width: 200, minWidth: 200, maxWidth: 200 }}>
                                            <InputLabel id='orderStatus-label'>
                                                Order Status
                                            </InputLabel>
                                            {
                                                data?.orderHeader.orderStatus?(
                                                    <Select
                                                        labelId='orderStatus-label'
                                                        value={data?.orderHeader.orderStatus}
                                                        label='orderStatus'
                                                        onChange={handleChangeOrderStatus}
                                                    >
                                                        {Object.entries(orderStatusMap).map(([key, label]) => (
                                                            <MenuItem key={key} value={key} style={{ textAlign: 'left' }} >
                                                                {label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                ) : (
                                                    <Skeleton variant='rectangular' width={180} height={40} />
                                                )
                                            }
                                            
                                        </TableCell>
                                        <TableCell sx={{ width: 200, minWidth: 200, maxWidth: 200 }}>
                                            <InputLabel id='paymentStatus-label'>
                                                Payment Status
                                            </InputLabel>
                                            {
                                                data?.orderHeader.paymentStatus?(
                                                    <Select
                                                        labelId='paymentStatus-label'
                                                        value={data?.orderHeader.paymentStatus}
                                                        label='paymentStatus'
                                                        onChange={handleChangePaymentStatus}
                                                    >
                                                        {Object.entries(paymentStatusMap).map(([key, label]) => (
                                                            <MenuItem key={key} value={key} style={{ textAlign: 'left' }} >
                                                                {label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                ) : (
                                                    <Skeleton variant='rectangular' width={180} height={40} />
                                                )
                                            }
                                            
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{textAlign: 'right'}}>
                                                Total Price: ${data?.price}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
  
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default OrderDetail;