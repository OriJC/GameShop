import {
    Card,
    Button,
    Grid,
    CardHeader,
    CardContent,
    CardActions,
} from '@mui/material';
import { useState } from 'react'
import { LoginModel } from '@/models/User'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { login } from '@/api/Identity/Authentication'
import { useNavigate } from 'react-router-dom';
import store from '@/store/store';
import { setAuth } from '@/store/authSlice'


const Login: React.FC = () => {
    const navigate = useNavigate();
    // initData
    const [formData, setFormData] = useState<LoginModel>({
        userName: '',
        password: ''
    })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)


    let validationSchema = Yup.object().shape({
        userName: Yup.string().required("Required")
            .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed (no spaces or special characters)"),
        password: Yup.string()
            .min(8, "Password must at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[@$!%*?&_-]/, "Password must contain at least one special character")
            .required("Password is required"),

    })

    const onSubmit = (values: LoginModel) => {
        login(values).then((res) => {
            console.log(res.data)
            store.dispatch(setAuth(
                {
                    token: res.data.token,
                    username: formData.userName
                } 
            ))
            console.log('Get and set token successfully')
            // redirect to last page
            navigate('/')
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Grid container justify="center" spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader title="Login" />
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ dirty, isValid, values, setFieldValue }) => {
                            return (
                                <Form>
                                    <CardContent>
                                        <Grid item container spacing={1} justify="center" mb={1}>
                                            <Grid item xs={12}>
                                                <Field
                                                    label="User Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="userName"
                                                    value={values.userName}
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
                                            Login
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
export default Login;