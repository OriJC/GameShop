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
    FormControl,
    InputLabel,
    DatePicker
} from '@mui/material';
import { useState } from 'react'
import Company from '@/models/Company'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

const Create: React.FC = () => {

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
        emailAddress: ''
    };
    const [error, setError] = useState(false)

    let validationSchema = Yup.object().shape({
        name: Yup.string().required("Required")
    })

    const onSubmit = (values) => {
        console.log(values)
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
                                        <Grid item container spacing={1} justify="center">
                                            <Grid item md={12}>
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
                                    </CardContent>
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