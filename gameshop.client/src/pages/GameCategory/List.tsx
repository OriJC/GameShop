import React, { useState, useEffect } from 'react';
import { getAllGameCategory } from '@/api/GameCategory/GameCategory'

const List = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllGameCategory().then(res => {
            console.log(res)
        })
    })
    return (
        <p>This is GameCategory List Page</p>
    );       
}

export default List;