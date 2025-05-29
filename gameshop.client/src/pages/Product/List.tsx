import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Grid,
    TablePagination
} from '@mui/material';
import { getAllProduct } from '@/api/Product/Product'
import { getAllCompanyName } from '@/api/Company/Company'
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'
import Company from '../../models/Company';
import { Product, ProductInfo } from '@/models/Product'



const List: React.FC = () => {
    const [data, setData] = useState<ProductInfo[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [companyData, setCompanyData] = useState<Company[]>([])
    // Get Data 
    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true)
        try{
            const [productRes, companyRes] = await Promise.all([
                getAllProduct(),
                getAllCompanyName()
            ])
            const formattedProduct: ProductInfo[] = productRes.data.map((item: ProductInfo) => ({
                ...item,
                key: item.id,
            }))

            const formattedCompany: Company[] = companyRes.data.map((item: Company) => ({
                ...item,
                key: item.id,
            }))
            setData(formattedProduct)
            setCompanyData(formattedCompany)
        } catch (error){
            console.log(error)
        }
        
        setLoading(false)
    }

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0)
    }

    const handleCompanyTableCell = (item: ProductInfo) => {
        const company = companyData.find(company => company.id === item.companyId)
        if (!company) {
            return <TableCell></TableCell>
        }
        return (
            <a href={`/company/detail/${company.id}`} target="_blank" rel="noopener noreferrer">
                {company.name}
            </a>     
        )
    }


    if (loading) {
        return (
            <div>
                Loading
            </div>
        )
    }
    return (
        <Paper>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item className="ms-3 mt-2">
                    <Typography component="h1" variant="h5">
                        Product
                    </Typography>
                </Grid>
                <Grid item className="me-2 mt-2">
                    <Button component={Link} to="/Product/Create" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Created Time</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell align={'right'} sx={{ paddingRight: '150px' }} >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Link to={`/Product/detail/${item.id}`}>
                                        {item.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{moment(item.createdDate).isValid()
                                    ? moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')
                                    : ''}
                                </TableCell>
                                <TableCell>
                                    {handleCompanyTableCell(item)}
                                </TableCell>
                                <TableCell align={'right'} sx={{ paddingRight: '50px' }}>
                                    <Button color="primary" variant="contained" component={Link} sx={{ marginRight:'5px' }} to={`/Product/edit/${item.id}`}>Edit</Button>
                                    <Button color="warning" variant="contained" component={Link} to={`/Product/delete/${item.id}`}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ '& .css-pdct74-MuiTablePagination-selectLabel': { margin: 0 }, '& .css-levciy-MuiTablePagination-displayedRows': { margin: 0 } }}
            />
        </Paper>
    )
}

export default List;