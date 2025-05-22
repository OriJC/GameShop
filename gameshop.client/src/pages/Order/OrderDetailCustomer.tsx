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
} from '@mui/material';
import { useState, useEffect } from 'react'
import type * as Order from '@/models/Order'; 
import { getOrderById } from '@/api/Order/Order'
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingCartItem } from '@/models/ShoppingCart';
import { getProductImageByImageId } from '@/api/Product/Product';
import PlaceIcon from '@mui/icons-material/Place';
import MailIcon from '@mui/icons-material/Mail';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import './OrderPages.less';
import { removeUnderscoreBetweenWords } from '@/utils/removeUnderscoreBetweenWords';

const OrderDetail: React.FC = () => {
    const routeParams = useParams<{ orderId: string }>();
    const [data, setData] = useState<Order.OrderDetail | null>();
    const [loading, setLoading] = useState(false)
    const [itemData, setItemData] = useState<ShoppingCartItem[]>([])
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
        setLoading(true)
        fetchData()
        setLoading(false)
    }, []);

    

    const fetchData = async () => {
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
    }

    

    const handleBack = () => {
        navigate(-1)
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
                            <PlaceIcon />
                            {data?.orderHeader.streetAddress}, {data?.orderHeader.city}, {data?.orderHeader.state}
                            <br />
                            <MailIcon /> {data?.orderHeader.name}
                            <br />
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
                                            <Button variant='outlined' onClick={handleBack}>
                                                Back 
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{ fontWeight: 500, marginRight: 4, marginLeft: 15 }}>
                                                Order Status: 
                                            </span>                                           
                                            <Typography 
                                                component="span"
                                                className={`status-label status-order ${data?.orderHeader.orderStatus}`}
                                                variant='body2'
                                            >
                                                {orderStatusMap[removeUnderscoreBetweenWords(data?.orderHeader.orderStatus)]|| removeUnderscoreBetweenWords(data?.orderHeader.orderStatus)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='right' sx={{pr:2}}>
                                            <span style={{ fontWeight: 500, marginRight: 4}}>
                                                Payment Status: 
                                            </span>
                                            <Typography
                                                component="span"
                                                className={`status-label status-payment ${data?.orderHeader.paymentStatus}`}
                                                variant='body2'
                                            >
                                                {paymentStatusMap[removeUnderscoreBetweenWords(data?.orderHeader.paymentStatus)]|| removeUnderscoreBetweenWords(data?.orderHeader.paymentStatus)}
                                            </Typography>  
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