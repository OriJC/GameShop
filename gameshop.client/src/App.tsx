//import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './pages/Home'


function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;