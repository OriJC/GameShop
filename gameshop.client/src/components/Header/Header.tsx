import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import './Header.less'
import { useState } from 'react'

const AppHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" flexGrow={1}>
                    <div id="icon" className="me-2">
                        <i className="bi bi-controller" ></i>
                    </div>
                    <Button
                        color="inherit"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        Admin Controller
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem color="inherit" component={Link} to="/">
                            Home
                        </MenuItem>
                        <MenuItem color="inherit" component={Link} to="/Category">
                            Category
                        </MenuItem>
                        <MenuItem color="inherit" component={Link} to="/Company">
                            Company
                        </MenuItem>
                        <MenuItem color="inherit" component={Link} to="/ProductTag">
                            Product Tag
                        </MenuItem>
                        <MenuItem color="inherit" component={Link} to="/Product">
                            Product
                        </MenuItem>
                    </Menu>  
                </Box>        
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader