import  { useState, useEffect } from 'react';
import { getAllGameCategory } from '@/api/GameCategory/GameCategory'
import { Table, Button, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment';
interface GameCategory {
    key: string
    name: string;
    createdDate: string;
}

const columns: ColumnsType<GameCategory> =
[
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Create Date',
    dataIndex: 'createdDate',
    key: 'name',
     render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
            <Button onClick={() => handleEdit(record.key)}>Edit</Button>
            <Button onClick={() => handleDelete(record.key)}>Delete</Button>
      </Space>
    ),
  },
    ]

const handleEdit = (key: string) => {
    console.log('Edit item with key:', key);
};

const handleDelete = (key: string) => {
    console.log('Delete item with key:', key);
};

const List: React.FC = () => {
    const [data, setData] = useState(null);
    //const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllGameCategory().then(res => {
            const formattedData = res.data.map(item =>
            ({
                ...item,
                key: item.id,
            }))
            setData(formattedData)
            console.log(formattedData)
        }).catch(err => {
            setError(err)
            console.log(err)
        })
    }, [])
    
    return (
        <Table columns={columns} dataSource={data} />
    );       
}

export default List;