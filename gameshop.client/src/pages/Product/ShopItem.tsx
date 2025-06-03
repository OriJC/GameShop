import {
    Card,
    Button,
    Grid,
    CardHeader,
    CardContent,
    CardActions,
    Box,
    CircularProgress,
    Typography,
    TextField as Textarea,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { ProductInfo } from '@/models/Product';
import store from '@/store/store'
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { getProductById } from '@/api/Product/Product';
import { getAllCompanyName } from '@/api/Company/Company'
import { getAllCategory } from '@/api/Category/Category'
import { getAllProductTag } from '@/api/ProductTag/ProductTag'
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addShoppingCartItemToCart } from '@/api/ShoppingCart/ShoppingCart';
import Company from '@/models/Company';
import { Category } from '@/models/Category';


interface ProductTag {
    id: string;
    name: string;
}

const ShopItem: React.FC = () => {
    const navigate = useNavigate();

    // Initial form data
    const [formData, setFormData] = useState<ProductInfo>({
        id: '',
        name: '',
        description: '',
        createdDate: null,
        listPrice: 1,
        price: 1,
        price50: 1,
        price100: 1,
        companyId: '',
        categoryId: '',
        productTagsIds: [],
        inventory: 1,
        imageFileId: '',
    });

    const [quantity, setQuantity] = useState(1);
    const [showPrice, setShowPrice] = useState(0)
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [, setproductTagsIdsData] = useState<ProductTag[]>([]);
    const routeParams = useParams<{ productId: string }>();

    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(true)



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

        let id = routeParams.productId
        await getProductById(id??'').then((res) => {
            const imageSrc = 'data:' + res.data.contentType + ';base64,' + res.data.image
            setFormData(res.data.product)
            setPreview(imageSrc)
            calculatePrice(1, res.data.product)
        })
        
        setLoading(false)
    }


    const handleClickBack = () => {
        navigate(-1)
    }

    const handleInputChange = (e: any) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > formData.inventory) {
            value = formData.inventory;
        }
        setQuantity(value);
        calculatePrice(value)
    }

    const calculatePrice = (count: number, product = formData) => {
        console.log(formData.price)
        if (count >= 100)
            setShowPrice(count * product.price100)
        else if (count < 100 && count >= 50)
            setShowPrice(count * product.price50)
        else if (count < 50 && count > 10)
            setShowPrice(count * product.price)
        else 
            setShowPrice(count * product.listPrice)
    }

    const addItemToCart = async() => {
        const userName = store.getState().auth.userName
        if (userName != null){
            await addShoppingCartItemToCart(userName, formData.id, quantity)
            navigate('/ShoppingCart')
        }
        else {
            console.log('No user name found in local store')
        }

    }
        
    if (loading) {
        return <CircularProgress />;
    }
    else
    return (
        <Grid container justifyContent="center" spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader title="Product" />
                    <Formik
                        enableReinitialize
                        initialValues={formData}
                        onSubmit={() => {}}
                    >
                        {({ values }) => {
                            return (
                                <Form>
                                    <CardContent>
                                        <Grid container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item xs={6}>
                                                <Field
                                                    label="Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="name"
                                                    value={values.name}
                                                    component={FormikTextField}
                                                    disabled
                                                />
                                                <Field
                                                    label="Category"
                                                    value={categoryData.filter(item => item.id == values.categoryId).map(item=>item.name)}
                                                    variant="outlined"
                                                    fullWidth
                                                    id="categoryData"
                                                    name="categoryData"
                                                    component={FormikTextField}
                                                    disabled
                                                    sx={{ mt: 2}}
                                                />
                                                <Field
                                                    label="Company"
                                                    value={companyData.filter(item => item.id == values.companyId).map(item => item.name)}
                                                    variant="outlined"
                                                    fullWidth
                                                    id="companyData"
                                                    name="companyData"
                                                    component={FormikTextField}
                                                    disabled
                                                    sx={{ mt: 2 }}
                                                />
                                                    

                                            </Grid>
                                            <Grid item xs={6}>
                                                {preview && (
                                                    <Box
                                                        component="img"
                                                        src={preview}
                                                        alt="Preview"
                                                        sx={{ mt: 2, ml: 'auto', mr: 15, mb: 2, width: '100%', maxWidth: 150, height: 'auto', display: 'block'}}
                                                    />
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item xs={12}>
                                                <Field
                                                    label="Description"
                                                    name="description"
                                                    value={values.description}
                                                    component={FormikTextField}
                                                    multiline
                                                    minRows={3}
                                                    maxRows={6}
                                                    fullWidth
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item md={6}>
                                                <Field
                                                    label="List Price"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="listPrice"
                                                    value={values.listPrice}
                                                    component={TextField}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <Field
                                                    label="Price(1~50)"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="price"
                                                    value={values.price}
                                                    component={TextField}
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item md={6}>
                                                <Field
                                                    label="Price(51~100)"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="price50"
                                                    value={values.price50}
                                                    component={TextField}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <Field
                                                    label="Price(>100)"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="price100"
                                                    value={values.price100}
                                                    component={TextField}
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item md={9}>
                                                <Field
                                                    label="Inventory"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="inventory"
                                                    value={values.inventory}
                                                    component={FormikTextField}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item md={3} sx={{mt: 1, ms:1}}>
                                                <Typography variant="h6" sx={{ minWidth: 32, textAlign: "center" }}>
                                                    Current Price: {showPrice}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        
                                        
                                    </CardContent>
                                    <CardActions
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%",
                                            p: 2
                                        }}
                                    >
                                        <Box
                                            sx={{   
                                                   
                                                    ml: 1 ,
                                                }}
                                        >
                                            <Button
                                                variant="outlined"
                                                sx ={{ ml: 1, mb: 2 }}
                                                onClick={handleClickBack}
                                                startIcon={<ArrowBackIosNewIcon />}
                                            >
                                                Back
                                        </Button>
                                        </Box>
                                        
                                        <Box
                                            sx={{   
                                                    display: 'flex', 
                                                    alignItems: 'center',                                                    
                                                    gap: 1, 
                                                    mb: 2, 
                                                    mr: 1 ,
                                                }}
                                        >
                                            <Textarea
                                                type="number"
                                                value={quantity}
                                                onChange={handleInputChange}
                                                inputProps={{ min: 1, max: formData.inventory, style: {textAlign: 'center', width: "60px"} }}
                                                sx={{ width: '80px'}}
                                                size="small"
                                                disabled={formData.inventory <= 0}
                                            />
                                            <Button onClick={addItemToCart}>
                                                <AddShoppingCartIcon />
                                            </Button>
                                        </Box>
                                    </CardActions>
                                </Form>
                            );
                        }}
                    </Formik>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ShopItem;