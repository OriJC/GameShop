//import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AppHeader from './components/Header/Header.tsx';
import Home from './pages/Home/Home'
import CategoryRoute from './pages/Category/CategoryRoute.tsx'
import CompanyRoute from './pages/Company/CompanyRoute.tsx'
import ProductTagRoute from "./pages/ProductTag/ProductTagRoute.tsx";
import ProductRoute from "./pages/Product/ProductRoute.tsx";
import { Container, Box } from '@mui/material';
import UserRoute from "./pages/Identity/User/UserRoute.tsx";

function App() {
    return (
        <Router>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: '#f0f0f0'
                }}
            >
                <AppHeader />
                <Container maxWidth="lg"
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                <Box sx={{ margin: '24px ', minHeight: 280 }} className="site-layout-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Category/*" element={<CategoryRoute />} />
                        <Route path="/Company/*" element={<CompanyRoute />} />
                        <Route path="/ProductTag/*" element={<ProductTagRoute />} />
                        <Route path="/Product/*" element={<ProductRoute />} />
                        <Route path="/User/*" element={<UserRoute />} />
                    </Routes>
                </Box>
                </Container>
            </Box>
        </Router>
    );

}

export default App;