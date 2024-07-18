//import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from '@/pages/Product/Create'
import Edit from '@/pages/Product/Edit'
//import Delete from '@/pages/Product/Delete'
//import Detail from '@/pages/Product/Detail'
import List from './List';

const ProductRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:productId" element={<Edit />} />
        </Routes>
    );
}

export default ProductRoute;