import {
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
    CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import Product from '@/models/Product';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { deleteProduct, getProductById } from '@/api/Product/Product';
import { getAllCompanyName } from '@/api/Company/Company'
import { getAllCategory } from '@/api/Category/Category'
import { getAllProductTag } from '@/api/ProductTag/ProductTag'
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Create: React.FC = () => {
    const navigate = useNavigate();

    // Initial form data
    const [formData, setFormData] = useState<Product>({
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
        inventory: 1
    });

    const [error, setError] = useState(false);
    const [companyData, setCompanyData] = useState([]);
    const [categoryData, setCategoryData] = useState([])
    const [productTagsIdsData, setproductTagsIdsData] = useState([])
    const routeParams = useParams<{ productId: string }>();
    const [coverImage, setCoverImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(true)

    // Style
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };



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
        await getProductById(id).then(res => {
            const imageSrc = 'data:' + res.data.contentType + ';base64,' + res.data.image
            setFormData(res.data.product)
            setPreview(imageSrc)

        })
        setLoading(false)
    }

    const handleDelete = () => {

        deleteProduct(formData.id).then((res) => {
            console.log(res.data);
            setTimeout(() => {
                navigate('/Product');
            }, 500);
        }).catch((error) => {
            console.log(error);
        });
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
                    <CardHeader title="Update Product Form" />
                    <Formik
                        enableReinitialize
                        initialValues={formData}
                    >
                        {({ dirty, isValid, values, handleChange, handleBlur, setFieldValue }) => {
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
                                                    value={categoryData.filter(item => item.id == values.categoryId).map(item => item.name)}
                                                    variant="outlined"
                                                    fullWidth
                                                    id="categoryData"
                                                    name="categoryData"
                                                    component={FormikTextField}
                                                    disabled
                                                    sx={{ mt: 2 }}
                                                />
                                                <Field
                                                    label="Company"
                                                    value={companyData.filter(item => item._id == values.companyId).map(item => item.Name)}
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
                                                        sx={{ mt: 2, ml: 'auto', mr: 15, mb: 2, width: '100%', maxWidth: 150, height: 'auto', display: 'block' }}
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
                                        <Grid item container spacing={1} justify="center" mb={1}>
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
                                        <Grid item container spacing={1} justify="center" mb={1}>
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
                                        <Field
                                            label="Inventory"
                                            variant="outlined"
                                            fullWidth
                                            name="inventory"
                                            value={values.inventory}
                                            component={FormikTextField}
                                            disabled
                                        />
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item md={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel id="company-label">Company</InputLabel>
                                                    <Field
                                                        label="Company"
                                                        name="companyId"
                                                        value={values.companyId}
                                                        component={Select}
                                                        disabled
                                                    >
                                                        {companyData.map((item) => (
                                                            <MenuItem key={item._id} value={item._id} style={{ textAlign: 'left' }} >
                                                                {item.Name}
                                                            </MenuItem>
                                                        ))}

                                                    </Field>
                                                </FormControl>

                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item md={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel id="productTagLabelId">Tag</InputLabel>
                                                    <Select
                                                        labelId="productTagLabelId"
                                                        id="productTag"
                                                        multiple
                                                        name="productTagsIds"
                                                        value={values.productTagsIds}
                                                        disabled
                                                        input={<OutlinedInput label="Tag" />}

                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {selected.map((id) => {
                                                                    const item = productTagsIdsData.find(tag => tag.id === id);
                                                                    return <Chip key={id} label={item ? item.name : id} />;
                                                                })}
                                                            </Box>
                                                        )}
                                                    >
                                                        {productTagsIdsData.map((item) => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions >
                                        <Button
                                            variant="outlined"
                                            sx={{ ml: 'auto', mr: 1, mb: 1}}
                                            onClick={handleClickBack}
                                            startIcon={<ArrowBackIosNewIcon />}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            sx={{ ml: 1, mr: 1, mb: 1 }}
                                            variant="contained"
                                            color="warning"
                                            onClick={handleDelete}
                                        >
                                            Delete
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

export default Create;