import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom'
import './Header.less'
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const menuItems = [
    {
        label: <Link to="/">Home</Link>, 
        key: '1',
    },
    {
        label: <Link to="/GameCategory">GameCategory</Link>,
        key: '2',
    },
];

const AppHeader = () => {
    return (
        <Header>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <div id="icon">
                    <i className="bi bi-controller"></i>
                </div>
                <Menu items={menuItems} theme="light" mode="horizontal" />
            </div>
        </Header>
    )
}

export default AppHeader