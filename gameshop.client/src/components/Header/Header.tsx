import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom'
import './Header.less'
import { Layout, Menu } from 'antd';

const { Header } = Layout;


const AppHeader = () => {
    return (
        <Header>
            

            <Menu theme="dark" mode="horizontal">
                <div id="icon">
                    <i className="bi bi-controller"></i>
                </div>
                <Menu.Item key = "1">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key = "2">
                    <Link to="/GameCategory">GameCategory</Link>
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default AppHeader