import { useState, useEffect } from 'react';
import { getAllGameCategory, getGameCategoryById, updateGameCategory, createGameCategory, deleteGameCategory } from '@/api/GameCategory/GameCategory'
import Create from '@/pages/GameCategory/Create'
import Edit from '@/pages/GameCategory/Edit'
import Delete from '@/pages/GameCategory/Delete'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import moment from 'moment';

interface GameCategory {
    key: string
    name: string;
    createdDate: string;
}


const List: React.FC = () => {
    const [data, setData] = useState([])
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [loading, setLoading] = useState(true);

    // Get Data 
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            getAllGameCategory().then(res => {
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

    // Create Method
    const handleOpenCreate = () => {
        setCurrentItem({})
        setOpenCreate(true)
    }
    const handleCloseCreate = () => setOpenCreate(false)
    const handleSaveCreate = (newdData: Object) => {
        createGameCategory(newData).then(() => {
            console.log("Create Game Category Successfully")

        }).catch(err => {
            console.log(err)
        })
        handleCloseCreate();
        window.location.reload(); 
    }

    // Edit Method
    const handleOpenEdit = (key: string) => {
        getGameCategoryById(key).then(res => {
            console.log(res.data)
            setCurrentItem(res.data)
            setOpenEdit(true)
        }).catch(err => {
            console.log(err)
        })
    }
    const handleCloseEdit = () => setOpenEdit(false)
    const handleSaveEdit = (newData) => {
        updateGameCategory(newData.id, newData.name).then(() => {
            console.log("Update Successfully")
        }).catch(err => {
            console.log(err)
        })
        
        handleCloseEdit()
        window.location.reload(); 
    }

    // Delete Method
    const handleOpenDelete = (key: string) => {
        getGameCategoryById(key).then(res => {
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
        deleteGameCategory(key).then(() => {
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
            <Button onClick={handleOpenCreate}>Create</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Created Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.key}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleOpenEdit(item.key)}>Edit</Button>
                                    <Button color="primary" onClick={() => handleOpenDelete(item.key)}>Delete</Button>
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