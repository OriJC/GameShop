import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home/Home'
import CategoryRoute from '@/pages/Category/CategoryRoute.tsx'
import CompanyRoute from '@/pages/Company/CompanyRoute.tsx'
import ProductTagRoute from "@/pages/ProductTag/ProductTagRoute.tsx";
import ProductRoute from "@/pages/Product/ProductRoute.tsx";
import UserRoute from "@/pages/Identity/User/UserRoute.tsx";
import RoleRoute from "@/pages/Identity/Role/RoleRoute.tsx";
import Login from "../pages/Home/Login";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Category/*" element={<CategoryRoute />} />
            <Route path="/Company/*" element={<CompanyRoute />} />
            <Route path="/ProductTag/*" element={<ProductTagRoute />} />
            <Route path="/Product/*" element={<ProductRoute />} />
            <Route path="/User/*" element={<UserRoute />} />
            <Route path="/Role/*" element={<RoleRoute />} />
            <Route path="/Login" element={<Login /> } />
        </Routes>
    )
}

export default AppRouter