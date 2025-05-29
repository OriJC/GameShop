import {
    Card,
    Grid,
    CardHeader,
    CardContent,
    Typography
} from '@mui/material';
import { useState, useEffect } from 'react'
import Company from '@/models/Company'
import { getCompanyById } from '@/api/Company/Company'
import { useNavigate, useParams } from 'react-router-dom';

const Detail: React.FC = () => {
    const formData: Company = {
        name: '',
        address: {
            state: '',
            city: '',
            street: '',
            zipCode: ''
        },
        phoneNumber: '',
        email: '',
        id: ''
    }
    const routeParams = useParams<{ companyId: string }>();
    const [data, setData] = useState<Company | null>(formData);
    const [loading, setLoading] = useState(false)
    // initData
    

    useEffect(() => {
        let id = routeParams.companyId
        if(id != null)
        {
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
        }       
    }, []);

    if (loading) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <Grid container spacing={1}>
            <Grid item md={12}>
                <Card>
                    <CardHeader
                        title={'Company Detail'}
                        titleTypographyProps={{ align: 'center', variant: 'h4' }}
                    />
                        
                    <CardContent>

                        <Grid item container spacing={1} justifyContent="center" mb={1}>
                            <Grid item md={6}>
                                <Typography variant="h3" color="text.secondary">
                                    {data?.name}
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {data?.address.city}, {data?.address.state}
                                </Typography>
                            </Grid>
                            <Grid item md={6} style={{ textAlign: 'left', paddingLeft: '50px' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Email: {data?.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Phone Number: {data?.phoneNumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Street: {data?.address.street}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Zip Code: {data?.address.zipCode}
                                </Typography>
                            </Grid>
                        </Grid> 
  
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Detail;