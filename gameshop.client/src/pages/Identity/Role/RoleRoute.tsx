//import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from '@/pages/Identity/Role/Create';
//import Edit from '@/pages/Company/Edit'
//import Delete from '@/pages/Company/Delete'
//import Detail from '@/pages/Company/Detail'
import List from '@/pages/Identity/Role/List';

const RoleRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            {/*<Route path="create" element={<Create />} />*/}
            {/*<Route path="detail/:companyId" element={<Detail /> } />*/}
            {/*<Route path="edit/:companyId" element={<Edit />} />*/}
            {/*<Route path="delete/:companyId" element={<Delete />} />*/}
        </Routes>
    );
}

export default RoleRoute;