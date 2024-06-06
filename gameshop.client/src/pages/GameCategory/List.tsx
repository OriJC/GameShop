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
    const handleOpenCreate = () => setOpenCreate(true)
    const handleCloseCreate = () => setOpenCreate(false)
    const handleSaveCreate = () => {
        handleCloseCreate()
    }

    // Edit Edit
    const handleOpenEdit = () => setOpenEdit(true)
    const handleCloseEdit = () => setOpenEdit(false)
    const handleSaveEdit = () => {
        handleCloseEdit()
    }

    // Delete Method
    const handleOpenDelete = () => setOpenDelete(true)
    const handleCloseDelete = () => setOpenDelete(false)
    const handleSaveDelete = () => {
        handleCloseDelete()
    }

    if (loading) {
        return (
            <div>
                Loading
            </div>
        )
    } else {
        console.log(data)
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
                        {data.map((item) => {
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleOpenEdit(item.id)}>Edit</Button>
                                    <Button color="primary" onClick={() => handleOpenEdit(item.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Create open={openCreate} onClose={handleCloseCreate} onCreate={handleSaveCreate} />
        </Paper>
    )
}

export default List;