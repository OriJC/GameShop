//import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AppHeader from './components/Header/Header.tsx';
import Home from './pages/Home'
import GameCategoryRoute from './pages/GameCategory/GameCategoryRoute.tsx'
import { Layout } from 'antd'


const { Content } = Layout
function App() {
    return (
        <Router>
            <AppHeader />
            <Content style={{ padding: '0 50px'}}>
                <div className="site-layout-content" 
                    style={{ margin: '24px 16px', padding: 24, minHeight: 280}}
                >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/GameCategory/*" element={<GameCategoryRoute />} />
                </Routes>
                </div>
            </Content>
        </Router>
    );

}

export default App;