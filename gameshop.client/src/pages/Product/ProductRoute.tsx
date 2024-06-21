//import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from '@/pages/Company/Create'
import Edit from '@/pages/Company/Edit'
import Delete from '@/pages/Company/Delete'
import Detail from '@/pages/Company/Detail'
import List from './List';

const ProductRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<List />} />

        </Routes>
    );
}

export default ProductRoute;