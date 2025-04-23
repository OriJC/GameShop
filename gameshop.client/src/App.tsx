//import { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import '@/App.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AppHeader from '@/components/Header/Header.tsx';
import AppRouter from '@/routers/AppRouter.tsx';
import { Container, Box } from '@mui/material';
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
                    <AppRouter />
                </Box>
                </Container>
            </Box>
        </Router>
    );

}

export default App;