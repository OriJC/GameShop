import {
    Card,
    Button,
    Typography,
    Grid,
    Container,
    CardHeader,
    CardContent,
    CardActions,
    InputLabel
} from '@mui/material';
import { useState } from 'react'
import User from '@/models/User'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { createUser } from '@/api/Identity/User'
import { useNavigate } from 'react-router-dom';

const Delete: React.FC = () => {
    const navigate = useNavigate();
    // initData
    const formData: User = {
        name: '',
        email: '',
        password: ''
    }
    const [error, setError] = useState(false)

    let validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email"),
        password: ''
    })

    const onSubmit = (values: Company) => {
        createUser(values).then((res) => {
            console.log(res.data)
            setTimeout(() => {
                navigate('/');
            }, 500)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Grid container justify="center" spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader title="Create User" />
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ dirty, isValid, values }) => {
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
                                            <Grid item xs={12}>
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
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item xs={12}>
                                                <Field
                                                    label="Password"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="password"
                                                    value={values.password}
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
    )
}
export default Delete;