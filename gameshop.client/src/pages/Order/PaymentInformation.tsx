import {
    Card,
    Button,
    Grid,
    CardHeader,
    CardContent,
    CardActions,
} from '@mui/material';
import { useState } from 'react'
import { PaymentInfo } from '@/models/PaymentInfo'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '@/api/Order/Order'
import { clearUserCart } from '@/api/ShoppingCart/ShoppingCart';
import store from '@/store/store'
import { retryUntilSuccess } from '@/utils/retryPromise';
const PaymentInformation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cartData = location.state;
    // initData
    const formData: PaymentInfo = {
        name: '',
        phoneNumber: '', 
        state: '',
        city: '',
        streetAddress: '',
        postalCode: ''
    }
    const [error, setError] = useState(false)

    let validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        phoneNumber: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        streetAddress: Yup.string().required("Required"),
        postalCode: Yup.string().required("Required"),
    })

    const onSubmit = async (values: PaymentInfo) => {
        const orderRequstBody = {
            cart: cartData,
            paymentInfo: values
        }

        await createOrder(orderRequstBody).then(async (res) => {
            console.log(res.data)
            const userName: string = store.getState().auth.userName ?? ''
            await retryUntilSuccess(() =>clearUserCart(userName), 10, 500).then(()=>{
                navigate('/order/orderdetail/' + res.data.id)
            })
            
        })
    }

    return (
        <Grid container justifyContent="center" spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader title="Order Payment Detail Form" />
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ dirty, isValid, values, handleChange, handleBlur }) => {
                            return (
                                <Form>
                                    <CardContent>
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
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
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item md={6}>
                                                <Field
                                                    label="State"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="state"
                                                    value={values.state}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <Field
                                                    label="City"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="city"
                                                    value={values.city}
                                                    component={TextField}
                                                />
                                            </Grid>
                                        </Grid> 
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item xs={12}>
                                                <Field
                                                    label="Street Address"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="streetAddress"
                                                    value={values.streetAddress}
                                                    component={TextField}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
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
                                                    label="Postal Code"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="postalCode"
                                                    value={values.postalCode}
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
                                            Submit
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

export default PaymentInformation;