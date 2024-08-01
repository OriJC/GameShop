import { useState, useEffect } from 'react';
import { getAllRole, getRoleById, updateRole, createRole, deleteRole } from '@/api/Role/Role'
import Create from '@/pages/Role/Create'
//import Edit from '@/pages/Role/Edit'
//import Delete from '@/pages/Role/Delete'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Grid, TablePagination } from '@mui/material';
import moment from 'moment';


const List: React.FC = () => {
    const [data, setData] = useState([])
    const [openCreate, setOpenCreate] = useState(false);
    //const [openEdit, setOpenEdit] = useState(false);
    //const [openDelete, setOpenDelete] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // Get Data 
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            getAllRole().then(res => {
                const formattedData = res.data.map(item =>
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

    // Create Method
    const handleOpenCreate = () => {
        setCurrentItem({})
        setOpenCreate(true)
    }
    const handleCloseCreate = () => setOpenCreate(false)
    const handleSaveCreate = (newData: Object) => {
        createRole(newData).then(() => {
            console.log("Create Role Successfully")

        }).catch(err => {
            console.log(err)
        })
        handleCloseCreate();
        window.location.reload(); 
    }

    // Edit Method
    const handleOpenEdit = (key: string) => {
        getRoleById(key).then(res => {
            console.log(res.data)
            setCurrentItem(res.data)
            setOpenEdit(true)
        }).catch(err => {
            console.log(err)
        })
    }
    const handleCloseEdit = () => setOpenEdit(false)
    const handleSaveEdit = (newData: Object) => {
        updateRole(newData.id, newData.name).then(() => {
            console.log("Update Successfully")
        }).catch(err => {
            console.log(err)
        })
        
        handleCloseEdit()
        window.location.reload(); 
    }

    // Delete Method
    const handleOpenDelete = (key: string) => {
        getRoleById(key).then(res => {
            console.log(res.data)
            setCurrentItem(res.data)
            setOpenDelete(true)
        }).catch(err => {
            console.log(err)
            handleCloseDelete()
        })
    }
    const handleCloseDelete = () => setOpenDelete(false)
    const handleSaveDelete = (key: string) => {
        console.log(key)
        deleteRole(key).then(() => {
            console.log("Delete Successfully")
        }).catch (err => {
            console.log(err)
        })
        
        handleCloseDelete()
        window.location.reload(); 
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
                        Role
                    </Typography>
                </Grid>
                <Grid item className="me-2 mt-2">
                    <Button onClick={handleOpenCreate} variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                            <TableRow key={item.key}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    {/*<Button color="primary" onClick={() => handleOpenEdit(item.key)}>Edit</Button>*/}
                                    {/*<Button color="primary" onClick={() => handleOpenDelete(item.key)}>Delete</Button>*/}
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
            <Create open={openCreate} onClose={handleCloseCreate} onCreate={handleSaveCreate} />
            {/*<Edit open={openEdit} record={currentItem} onClose={handleCloseEdit} onUpdate={handleSaveEdit} />*/}
            {/*<Delete open={openDelete} record={currentItem} onClose={handleCloseDelete} onDelete={handleSaveDelete} />*/}
        </Paper>
    )
}

export default List;