import {
    Card,
    Button,
    Grid,
    CardHeader,
    CardContent,
    CardActions,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Product from '@/models/Product';
import Company from '@/models/Company';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField, TextField } from 'formik-material-ui';
import { createProduct } from '@/api/Product/Product';
import { useNavigate } from 'react-router-dom';

const Create: React.FC = () => {
    const navigate = useNavigate();

    // Initial form data
    const [formData, setFormData] = useState<Product>({
        id: '',
        name: '',
        description: '',
        listPrice: 0,
        price: 0,
        price50: 0,
        price100: 0,
        companyId: '',
        categoryId: '',
        ProductTag: []
    });

    const [error, setError] = useState(false);
    const [companyData, setCompanyData] = useState<Company[]>();

    // Validation schema
    let validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),  // Assuming description is required
    })

    // Submit handler
    const onSubmit = (values: Product) => {
        createProduct(values).then((res) => {
            console.log(res.data);
            setTimeout(() => {
                navigate('/Product');
            }, 500);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        console.log('checking')
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
                        {({ dirty, isValid, values, handleChange, handleBlur }) => {
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
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            disabled={!dirty || !isValid}
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