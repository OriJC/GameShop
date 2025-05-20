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
import { getAllOrder } from '@/api/Order/Order'
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'
import { OrderDetail } from '@/models/Order';



const List: React.FC = () => {
    const [data, setData] = useState<OrderDetail[]>([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    // Get Data 
    useEffect(() => { 
        fetchData()
    }, []);


    const fetchData = () => {
        setLoading(true)
        getAllOrder().then(res => {
            const formattedData: OrderDetail[] = res.data.map(item =>
            ({
                ...item
            }))
            setData(formattedData)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0)
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
                        Order
                    </Typography>
                </Grid>
                <Grid item className="me-2 mt-2">
                    <Button component={Link} to="/Company/Create" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>City, State</TableCell>
                            <TableCell align={'right'} sx={{ paddingRight: '150px' }} >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Link to={`/order/orderDetail/${item.id}`}>
                                        {item.orderHeader.name}
                                    </Link></TableCell>
                                <TableCell>{item.orderHeader.paymentStatus}
                                </TableCell>
                                <TableCell>{item.orderHeader?.city}, {item.orderHeader.state}</TableCell>
                                <TableCell align={'right'} sx={{ paddingRight: '50px' }}>
                                    <Button color="primary" variant="contained" component={Link} sx={{ marginRight:'5px' }} to={`/order/edit/${item.id}`}>Edit</Button>
                                    <Button color="warning" variant="contained" component={Link} to={`/company/delete/${item.id}`}>Delete</Button>
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