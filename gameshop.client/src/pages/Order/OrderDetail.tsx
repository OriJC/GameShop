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
    Stack,
    Button,
    Box
} from '@mui/material';
import { useState, useEffect } from 'react'
import type * as Order from '@/models/Order'; 
import { getOrderById } from '@/api/Order/Order'
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingCartItem } from '@/models/ShoppingCart';
import { getProductImageByImageId } from '@/api/Product/Product';

const OrderDetail: React.FC = () => {
    const routeParams = useParams<{ orderId: string }>();
    const [data, setData] = useState<Order.OrderDetail | null>();
    const [loading, setLoading] = useState(false)
    const [itemData, setItemData] = useState<ShoppingCartItem[]>([])
    const navigate = useNavigate();
    // initData
    

    useEffect(() => {
        fetchData()
    }, []);

    if (loading) {
        return (
            <div>
                Loading
            </div>
        )
    }

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

    const removeUnderscoreBetweenWords = (str: string | undefined) =>{
        if(str == undefined) return ''
        let prev;
            do {
                prev = str;
                str = str.replace(/_?([A-Z0-9]+)_([A-Z0-9]+)_?/g, (match, p1, p2) => {
                return p1 + ' ' + p2;
                });
            } while (str !== prev);
            return str.trim();
        }
    return (
        <Grid container spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader
                        title={removeUnderscoreBetweenWords(data?.orderHeader.paymentStatus)}
                        titleTypographyProps={{ align: 'center', variant: 'h4' }}
                    />
                        
                    <CardContent>

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
                                                        <Typography variant="h6">
                                                            {item.product.name}
                                                        </Typography>   
                                                        <br />
                                                        <Typography variant="body1">
                                                            ${item.totalPrice}
                                                        </Typography>                                   
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
                                                    Total Price: ${data?.price}
                                                </Typography>
                                                <Button className="checkoutButton">
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
  
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default OrderDetail;