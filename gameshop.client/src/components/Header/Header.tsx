import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import './Header.less'
import { useState } from 'react'

const AppHeader = () => {
    const [anchorEls, setAnchorEls] = useState({});
    const handleClick = (event, id) => {
        setAnchorEls((prev) => ({
            ...prev,
            [id]: event.currentTarget,
        }));
    };

    const handleClose = (id) => {
        setAnchorEls((prev) => ({
            ...prev,
            [id]: null,
        }));
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
                        onClick={(e) => handleClick(e, 'Admin')}
                    >
                        Admin Controller
                    </Button>
                    
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEls['Admin']}
                        keepMounted
                        open={Boolean(anchorEls['Admin'])}
                        onClose={() => handleClose('Admin')}
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

                    <Button
                        color="inherit"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, 'User')}
                    >
                        User Controller
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEls['User']}
                        keepMounted
                        open={Boolean(anchorEls['User'])}
                        onClose={() => handleClose('User')}
                    >
                        <MenuItem color="inherit" component={Link} to="/User">
                            User
                        </MenuItem>
                        <MenuItem color="inherit" component={Link} to="/Role">
                            Role
                        </MenuItem>
                    </Menu>
                    

                </Box>        
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader