import {
    Card,
    Button,
    Typography,
    Grid,
    Container,
    CardHeader,
    CardContent,
    CardActions,
    Select,
    InputLabel
} from '@mui/material';
import { useState } from 'react'
import Company from '@/models/Company'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { createCompany } from '@/api/Company/Company'
import { useNavigate } from 'react-router-dom';

const Create: React.FC = () => {
    const navigate = useNavigate();
    // initData
    const formData: Company = {
        name: '',
        address: {
            state: '',
            city: '',
            street: '',
            zipCode: ''
        },
        phoneNumber: '',
        email: ''
    }
    const [error, setError] = useState(false)

    let validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email")
    })

    const onSubmit = (values: Company) => {
        createCompany(values).then((res) => {
            console.log(res.data)
            setTimeout(() => {
                navigate('/Company');
            }, 500)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Grid container justify="center" spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader title="Create Company Form" />
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ dirty, isValid, values, handleChange, handleBlur }) => {
                            return (
                                <Form>
                                    <CardContent>
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item xs={12}>
                                                <Field
                                                    label="Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="name"
                                                    value={values.name}
                                                    component={TextField}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item md={6}>
                                                <Field
                                                    label="State"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="address.state"
                                                    value={values.address.state}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <Field
                                                    label="City"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="address.city"
                                                    value={values.address.city}
                                                    component={TextField}
                                                />
                                            </Grid>
                                        </Grid> 
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item md={6}>
                                                <Field
                                                    label="Street"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="address.street"
                                                    value={values.address.street}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <Field
                                                    label="ZipCode"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="address.zipCode"
                                                    value={values.address.zipCode}
                                                    component={TextField}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item md={6}>
                                                <Field
                                                    label="PhoneNumber"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="phoneNumber"
                                                    value={values.phoneNumber}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <Field
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="email"
                                                    value={values.email}
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
                            )
                        }}
                    </Formik>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Create;