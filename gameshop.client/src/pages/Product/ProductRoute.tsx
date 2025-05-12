//import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from '@/pages/Product/Create'
import Edit from '@/pages/Product/Edit'
import Delete from '@/pages/Product/Delete'
import Detail from '@/pages/Product/Detail'
import List from '@/pages/Product/List';
import ShopItem from "@/pages/Product/ShopItem";

const ProductRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="create" element={<Create />} />
            <Route path="detail/:productId" element={<Detail />} />
            <Route path="edit/:productId" element={<Edit />} />
            <Route path="delete/:productId" element={<Delete />} />
            <Route path="shopitem/:productId" element={<ShopItem />} />
        </Routes>
    );
}

export default ProductRoute;