//import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './List';

const CategoryRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<List />} />
        </Routes>
    );
}

export default CategoryRoute;