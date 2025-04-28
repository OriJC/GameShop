import {
    Card,
    Button,
    Grid,
    CardHeader,
    CardContent,
    CardActions,
} from '@mui/material';
import { useState, useEffect } from 'react'
import Company from '@/models/Company'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { deleteCompany } from '@/api/Company/Company'
import { useNavigate, useParams } from 'react-router-dom';
import { getCompanyById } from '@/api/Company/Company'

const Delete: React.FC = () => {
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
    const routeParams = useParams<{ companyId: string }>();
    const [data, setData] = useState<Company | null>(formData);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let id = routeParams.companyId
        setLoading(true)
        const fetchCompany = async () => {
            getCompanyById(id).then(res => {
                setData(res.data)
                console.log(res.data)
            }).catch(error => {
                console.log(error)
            })
        };
        setLoading(false)
        fetchCompany();
    }, []);

    const onSubmit = (values: Company) => {
        deleteCompany(values.id).then((res) => {
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
                        enableReinitialize
                        initialValues={data}
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
                                                    disabled
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
                                                    disabled
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
                                                    disabled
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
                                                    disabled
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
                                                    disabled
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
                                                    disabled
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
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            type="submit"
                                        >
                                            Delete
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

export default Delete;