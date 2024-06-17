import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './Header.less'


const AppHeader = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" flexGrow={1}>
                    <div id="icon" className="me-2">
                        <i className="bi bi-controller" ></i>
                    </div>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/Category">
                        Category
                    </Button>
                    <Button color="inherit" component={Link} to="/Company">
                        Company
                    </Button>
                    <Button color="inherit" component={Link} to="/ProductTag">
                        Product Tag
                    </Button>
                </Box>        
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader