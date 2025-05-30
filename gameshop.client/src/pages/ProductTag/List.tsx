import { useState, useEffect } from 'react';
import { getAllProductTag, getProductTagById, updateProductTag, createProductTag, deleteProductTag } from '@/api/ProductTag/ProductTag'
import Create from '@/pages/ProductTag/Create'
import Edit from '@/pages/ProductTag/Edit'
import Delete from '@/pages/ProductTag/Delete'
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
    Grid
} from '@mui/material';
import moment from 'moment';

interface ProductTag {
    id: string;
    name: string;
    createdDate? : string
}


const List: React.FC = () => {
    const [data, setData] = useState([])
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [currentItem, setCurrentItem] = useState<ProductTag>({id: '', name: ''});
    const [loading, setLoading] = useState(true);

    // Get Data 
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            getAllProductTag().then(res => {
                const formattedData = res.data.map((item: ProductTag) =>
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

    // Create Method
    const handleOpenCreate = () => {
        setCurrentItem({id: '', name: ''})
        setOpenCreate(true)
    }
    const handleCloseCreate = () => setOpenCreate(false)
    const handleSaveCreate = (newData: {name: string}) => {
        createProductTag(newData.name).then(() => {
            console.log("Create Game Category Successfully")

        }).catch(err => {
            console.log(err)
        })
        handleCloseCreate();
        window.location.reload(); 
    }

    // Edit Method
    const handleOpenEdit = (key: string) => {
        getProductTagById(key).then(res => {
            console.log(res.data)
            setCurrentItem(res.data)
            setOpenEdit(true)
        }).catch(err => {
            console.log(err)
        })
    }
    const handleCloseEdit = () => setOpenEdit(false)
    const handleSaveEdit = (newData: ProductTag) => {
        console.log(newData)
        updateProductTag(newData.id, newData.name).then(() => {
            console.log("Update Successfully")
        }).catch(err => {
            console.log(err)
        })
        
        handleCloseEdit()
        window.location.reload(); 
    }

    // Delete Method
    const handleOpenDelete = (key: string) => {
        getProductTagById(key).then(res => {
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
        deleteProductTag(key).then(() => {
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
                        Product Tag
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
                            <TableCell>Created Time</TableCell>
                            <TableCell align={'right'} sx={{ paddingRight: '145px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item: ProductTag) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{(item.createdDate
                                        ? moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')
                                        : '')}</TableCell>
                                <TableCell align={'right'} sx={{ paddingRight: '50px' }}>
                                    <Button color="primary" variant="contained" onClick={() => handleOpenEdit(item.id)}>Edit</Button>
                                    <Button color="warning" variant="contained" onClick={() => handleOpenDelete(item.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Create open={openCreate} onClose={handleCloseCreate} onCreate={handleSaveCreate} />
            <Edit open={openEdit} record={currentItem} onClose={handleCloseEdit} onUpdate={handleSaveEdit} />
            <Delete open={openDelete} record={currentItem} onClose={handleCloseDelete} onDelete={handleSaveDelete} />
        </Paper>
    )
}

export default List;