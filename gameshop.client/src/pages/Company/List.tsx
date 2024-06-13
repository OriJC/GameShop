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
import { getAllCompany, getCompanyById, updateCompany, createCompany, deleteCompany } from '@/api/Company/Company'
import { useState, useEffect } from 'react';
import Company from '@/models/Company'
import Create from '@/pages/Company/Create'
//import Edit from '@/pages/GameCategory/Edit'
//import Delete from '@/pages/GameCategory/Delete'
import moment from 'moment';
import { Link } from 'react-router-dom'



const List: React.FC = () => {
    const [data, setData] = useState<Company[]>([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    // Get Data 
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            getAllCompany().then(res => {
                const formattedData: Company[] = res.data.map(item =>
                ({
                    ...item,
                    key: item.id,
                }))
                setData(formattedData)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
        }
        fetchData()
    }, []);

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
                        Company
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
                            <TableCell>Created Time</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                            <TableRow key={item.key}>
                                <TableCell>
                                    <Link to={`/company/detail/${item.id}`}>
                                        {item.name}
                                    </Link></TableCell>
                                <TableCell>{moment(item.createdDate).isValid()
                                    ? moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')
                                    : ''}</TableCell>
                                <TableCell>{item.address.state}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => console.log(item.key)}>Edit</Button>
                                    <Button color="primary" onClick={() => console.log(item.key)}>Delete</Button>
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
            />
        </Paper>
    )
}

export default List;