import {
    Card,
    Button,
    Grid,
    CardHeader,
    CardContent,
    CardActions,
    Box,
    CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Product } from '@/models/Product';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { getProductById } from '@/api/Product/Product';
import { getAllCompanyName } from '@/api/Company/Company'
import { getAllCategory } from '@/api/Category/Category'
import { getAllProductTag } from '@/api/ProductTag/ProductTag'
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Company from '@/models/Company';
import { Category } from '@/models/Category';


interface ProductTag {
    id: string;
    name: string;
}

const Detail: React.FC = () => {
    const navigate = useNavigate();

    // Initial form data
    const [formData, setFormData] = useState<Product>({
        product: {
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
            imageFileId: ''
        },
        imageContentType: '',
        imageData: '',
        key : ''
    });

    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [categoryData, setCategoryData] = useState<Category[]>([])
    const [, setproductTagsIdsData] = useState<ProductTag[]>([])
    const routeParams = useParams<{ productId: string }>();

    const [preview, setPreview] = useState<string | null>(null)
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

        let id = routeParams.productId ?? ''
        await getProductById(id).then(res => {
            const imageSrc = 'data:' + res.data.contentType + ';base64,' + res.data.image
            setFormData(res.data.product)
            setPreview(imageSrc)

        })
        setLoading(false)
    }


    const handleClickBack = () => {
        navigate(-1)
    }

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Grid container justifyContent="center" spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader title="Product Detail" />
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
                                                    value={values.product.name}
                                                    component={FormikTextField}
                                                    disabled
                                                />
                                                <Field
                                                    label="Category"
                                                    value={categoryData.filter(item => item.id == values.product.categoryId).map(item=>item.name)}
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
                                                    value={companyData.filter(item => item.id == values.product.companyId).map(item => item.name)}
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
                                                    value={values.product.description}
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
                                                    value={values.product.listPrice}
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
                                                    value={values.product.price}
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
                                                    value={values.product.price50}
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
                                                    value={values.product.price100}
                                                    component={TextField}
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item md={12}>
                                                <Field
                                                    label="Inventory"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="inventory"
                                                    value={values.product.inventory}
                                                    component={FormikTextField}
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                        
                                        
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="outlined"

                                            onClick={handleClickBack}
                                            startIcon={<ArrowBackIosNewIcon />}
                                        >
                                            Back
                                        </Button>

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

export default Detail;