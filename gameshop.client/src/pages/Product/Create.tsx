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
import Company from '@/models/Company';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { createProduct } from '@/api/Product/Product';
import { getAllCompanyName } from '@/api/Company/Company'
import { getAllCategory } from '@/api/Category/Category'
import { getAllProductTag } from '@/api/ProductTag/ProductTag'
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
    // Validation schema
    let validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),// Assuming description is required
        price: Yup.number().min(1, 'Price must be at least 1').max(100000, 'Price must be at most 100000').required("Required"),
        listPrice: Yup.number().min(1, 'Price must be at least 1').max(100000, 'Price must be at most 100000').required("Required"),
        price50: Yup.number().min(1, 'Price must be at least 1').max(100000, 'Price must be at most 100000').required("Required"),
        price100: Yup.number().min(1, 'Price must be at least 1').max(100000, 'Price must be at most 100000').required("Required"),
        inventory: Yup.number().min(1, 'Price must be at least 1').max(1000000, 'Price must be at most 1000000').required("Required"),
    })


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
        setLoading(false)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    // Submit handler
    const onSubmit = (values: Product) => {
        if (!coverImage || !values) return

        let productData = new FormData()
        for (const key in values) {
            if(values[key] !== '')
                productData.append(key, values[key])
        }
        productData.append('file', coverImage)
        //productData.append('id', '')
        //productData.append('createdDate', null)
        productData.append('ImageFileId', 'string')
        console.log(productData)
        if (!values.id) {
            productData.delete('id')
        }
        if (!values.createdDate) {
            productData.delete('createdDate')
        }
        if (!values.ProductTagIds) {
            productData.delete('productTagsIds')
            values.productTagsIds.forEach((tagId, index) => {
                productData.append(`productTagsIds[${index}]`, tagId);
            });
        }
        

        //for (const pair of productData.entries()) {
        //    console.log(pair[0], pair[1]);
        //}
        console.log(productData)
        createProduct(productData).then((res) => {
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
                    <CardHeader title="Create Product Form" />
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ dirty, isValid, values, handleChange, handleBlur, setFieldValue }) => {
                            return (
                                <Form>
                                    <CardContent>
                                        <Grid container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item xs={12}>
                                                <Field
                                                    label="Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="name"
                                                    value={values.name}
                                                    component={FormikTextField}
                                                />
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
                                                />
                                            </Grid>
                                        </Grid> 
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item md={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel>Category</InputLabel>
                                                    <Field
                                                        label="Category"
                                                        name="categoryId"
                                                        value={values.categoryId}
                                                        component={Select}
                                                        
                                                        onChange={(e) => {  
                                                            let selectedValue = e.target.value
                                                            setFieldValue('categoryId', selectedValue); // Update Formik state
                                                            setFormData({ ...formData, categoryId: selectedValue });
                                                            console.log(formData.categoryId)
                                                        }}
                                                    >
                                                        {categoryData.map((item) => (
                                                            <MenuItem key={item.id} value={item.id} style={{ textAlign: 'left' }} >
                                                                {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    
                                                    </Field>
                                                </FormControl>

                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item md={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel id="company-label">Company</InputLabel>
                                                    <Field
                                                        label="Company"
                                                        name="companyId"
                                                        value={values.companyId}
                                                        component={Select}

                                                        onChange={(e) => {
                                                            let selectedValue = e.target.value
                                                            setFieldValue('companyId', selectedValue); // Update Formik state
                                                            setFormData({ ...formData, companyId: selectedValue });
                                                        }}
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
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            const updatedValue = typeof value === 'string' ? value.split(',') : value;

                                                            // Update Formik state with IDs
                                                            setFieldValue(e.target.name, updatedValue);
                                                            
                                                        }}
                                                        input={<OutlinedInput label="Chip" />}
                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {selected.map((id) => {
                                                                    const item = productTagsIdsData.find(tag => tag.id === id);
                                                                    return <Chip key={id} label={item ? item.name : id} />;
                                                                })}
                                                            </Box>
                                                        )}
                                                        MenuProps={MenuProps}
                                                    >
                                                        {productTagsIdsData.map((item) => (
                                                            <MenuItem
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item xs={12}>
                                                <Field
                                                    label="Inventory"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="inventory"
                                                    value={values.inventory}
                                                    component={FormikTextField}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item xs={12}>
                                                <label htmlFor="container-file-input">
                                                    <input
                                                        accept="image/*"
                                                        id="container-file-input"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                        
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        component="span"
                                                        startIcon={<CloudUploadIcon />}
                                                        sx={{ mt: 2 }}
                                                    >
                                                        Choose Image
                                                    </Button>
                                                </label>
                                                {preview && (
                                                    <Box
                                                        component="img"
                                                        src={preview}
                                                        alt="Preview"
                                                        sx={{ mt: 2, width: '100%', maxWidth: 100, height: 'auto', display: 'flex', justifyContent: 'flex-end', }}
                                                    />
                                                )}
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="outlined"
                                            sx={{ ml: 'auto', mb: 1 }}
                                            onClick={handleClickBack}
                                            startIcon={<ArrowBackIosNewIcon />}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            sx={{ ml: 1, mr: 1, mb: 1 }}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Create
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