import {
    Card,
    Button,
    Grid,
    CardContent,
    CardMedia,
    OutlinedInput,
    Box,
    Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Product from '@/models/Product';
import Company from '@/models/Company';
import { getAllProduct, getAllProductIncludingImage } from '@/api/Product/Product';
import { getAllCompanyName } from '@/api/Company/Company'
import { getAllCategory } from '@/api/Category/Category'
import { getAllProductTag } from '@/api/ProductTag/ProductTag'
import { useNavigate, useParams } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { base64ToFile } from '@/utils/base64Translate'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [companyData, setCompanyData] = useState([]);
    const [categoryData, setCategoryData] = useState([])
    const [productTagsIdsData, setproductTagsIdsData] = useState([])
    const [productData, setProductData] = useState<Product[]>([])

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true)
        await getAllCompanyName().then(res => {
            setCompanyData(res.data)
        })
        await getAllCategory().then(res => {
            setCategoryData(res.data)
        })
        await getAllProductTag().then(res => {
            setproductTagsIdsData(res.data)
        })

        await getAllProductIncludingImage().then(res => {
            const formattedData: Product[] = res.data.map(item =>
            ({
                ...item,
                key: item.product.id,
            }))
            setProductData(formattedData)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
        setLoading(false)
    }

    const handleGoToProduct = (id) => {
        navigate(`/Product/detail/${id}`);
    }
    return (
        <Grid container spacing={1}>
            {
                productData.map((item) => (
                    <Grid item md={3} key={item.product.id}>
                        <Card
                            sx={{
                                maxWidth: 350,
                                margin: "0 auto",
                                padding: "0.1em",
                            }}
                            onClick={() => handleGoToProduct(item.product.id)}
                        >
                            <CardMedia
                                component="img"
                                height="250"
                                alt={"alt"}
                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                image={'data:' + item.iamgeContentType + ';base64,' + item.imageData}
                                title={item.product.name}
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.product.name}   
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    As low as:
                                    <Box component="span" sx={{ fontWeight: 'bold', ml: 1 }}>${item.product.price100}</Box>  
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <Box component="span" sx={{ fontWeight: 'bold', textDecoration: 'line-through', ml: 1 }}>List Price: ${item.product.listPrice}</Box>
                                </Typography>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
               
        </Grid>
    )
}

export default Home