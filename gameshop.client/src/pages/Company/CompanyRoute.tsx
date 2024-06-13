//import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from '@/pages/Company/Create'
import Detail from '@/pages/Company/Detail'
import List from './List';

const CompanyRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="create" element={<Create />} />
            <Route path="detail/:companyId" element={<Detail /> } />
            {/*<Route path="edit/:GameCategoryId" element={<Edit />} />*/}
            {/*<Route path="delete/:GameCategoryId" element={<Delete />} />*/}
        </Routes>
    );
}

export default CompanyRoute;