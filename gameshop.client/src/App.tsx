//import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AppHeader from './components/Header/Header.tsx';
import Home from './pages/Home'
import GameCategoryRoute from './pages/GameCategory/GameCategoryRoute.tsx'
import { Container, Box } from '@mui/material';

function App() {
    return (
        <Router>
            <AppHeader />
            <Container maxWidth="lg" style={{ padding: '0 50px' }}>
                <Box sx={{ margin: '24px 16px', padding: 3, minHeight: 280 }} className="site-layout-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/GameCategory/*" element={<GameCategoryRoute />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );

}

export default App;