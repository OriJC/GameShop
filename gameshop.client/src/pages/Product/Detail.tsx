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
    Chip
} from '@mui/material';
import { useState, useEffect } from 'react';
import Product from '@/models/Product';
import Company from '@/models/Company';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { getProductById } from '@/api/Product/Product';
import { getAllCompanyName } from '@/api/Company/Company'
import { getAllCategory } from '@/api/Category/Category'
import { getAllProductTag } from '@/api/ProductTag/ProductTag'
import { useNavigate, useParams } from 'react-router-dom';

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
        productTagsIds: []
    });

    const [error, setError] = useState(false);
    const [companyData, setCompanyData] = useState([]);
    const [categoryData, setCategoryData] = useState([])
    const [productTagsIdsData, setproductTagsIdsData] = useState([])
    const routeParams = useParams<{ productId: string }>();

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
            console.log('data', res.data)
            setFormData(res.data)
        })
    }


    return (
        <Grid container justifyContent="center" spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader title="Product's Detail" />
                    <Formik
                        enableReinitialize
                        initialValues={formData}
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
                                                            console.log(formData.companyId)
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
                                    <CardActions>
                                        <Button
                                            disabled={!dirty || !isValid}
                                            variant="contained"
                                            color="primary"
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

export default Create;