import {
    Card,
    Button,
    Grid,
    CardHeader,
    CardContent,
    CardActions,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    OutlinedInput,
    Box,
    Chip
} from '@mui/material';
import { useState, useEffect } from 'react'
import { User } from '@/models/User'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { createUser } from '@/api/Identity/User'
import { useNavigate } from 'react-router-dom';
import { getAllRoleIdAndName } from '@/api/Identity/Role'

const Create: React.FC = () => {
    const navigate = useNavigate();
    // initData
    const [formData, setFormData] = useState<User>({
        userName: '',
        email: '',
        password: '',
        roles: []
    })
    const [roleData, setRoleData] = useState([]);
    const [error, setError] = useState(false)
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

    let validationSchema = Yup.object().shape({
        userName: Yup.string().required("Required")
            .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed (no spaces or special characters)"),
        email: Yup.string().email("Invalid email"),
        password: Yup.string()
            .min(8, "Password must at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[@$!%*?&_-]/, "Password must contain at least one special character")
            .required("Password is required"),

    })

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true)
        await getAllRoleIdAndName().then(res => {
            setRoleData(res.data)
            console.log(res.data)
        })
        setLoading(false)
    }

    const onSubmit = (values: User) => {
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
        <Grid container justifyContent="center" spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader title="Create User" />
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ dirty, isValid, values, setFieldValue }) => {
                            return (
                            <Form>
                                <CardContent>
                                    <Grid item container spacing={1} justifyContent="center" mb={1}>
                                        <Grid item xs={12}>
                                            <Field
                                                label="Name"
                                                variant="outlined"
                                                fullWidth
                                                name="userName"
                                                value={values.userName}
                                                component={TextField}
                                            />                      
                                        </Grid>
                                        </Grid>
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
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
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
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
                                        <Grid item container spacing={1} justifyContent="center" mb={1}>
                                            <Grid item md={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel id="roleLabelId">Tag</InputLabel>
                                                    <Select
                                                        labelId="roleLabelId"
                                                        id="roleId"
                                                        multiple
                                                        name="roles"
                                                        value={values.roles}
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
                                                                    const item = roleData.find(tag => tag.id === id);
                                                                    return <Chip key={id} label={item ? item.name : id} />;
                                                                })}
                                                            </Box>
                                                        )}
                                                        MenuProps={MenuProps}
                                                    >
                                                        {roleData.map((item) => (
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
export default Create;