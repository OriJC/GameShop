//import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './List';
import Create from './Create';
import Edit from './Edit';
import Delete from './Delete';

const GameCategoryRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:GameCategoryId" element={<Edit />} />
            <Route path="delete/:GameCategoryId" element={<Delete />} />
        </Routes>
    );
}

export default GameCategoryRoute;