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
import { Container, Box } from '@mui/material';

function App() {
    return (
        <Router>
            <AppHeader />
            <Container maxWidth="lg" style={{ padding: '0' }}>
                <Box sx={{ margin: '24px ', minHeight: 280 }} className="site-layout-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Category/*" element={<CategoryRoute />} />
                        <Route path="/Company/*" element={<CompanyRoute />} />
                        <Route path="/ProductTag/*" element={<ProductTagRoute />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );

}

export default App;