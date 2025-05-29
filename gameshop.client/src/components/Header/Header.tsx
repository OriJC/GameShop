import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import './Header.less'
import { useState, useEffect } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import store from '@/store/store'
import { useSelector } from 'react-redux'
import { setAuth } from '@/store/authSlice';

type AnchorEls = Record<string, HTMLElement | null>

interface RootState {
    auth: {
        isLogin: boolean
    }
}
const AppHeader = () => {
    const navigate = useNavigate();
    
    const [anchorEls, setAnchorEls] = useState<AnchorEls>({});
    const isLogin = useSelector((state: RootState) => state.auth.isLogin)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        setAnchorEls((prev) => ({
            ...prev,
            [id]: event.currentTarget,
        }));
    };

    const handleClose = (id: string) => {
        setAnchorEls((prev) => ({
            ...prev,
            [id]: null,
        }));
    };

    useEffect(() => {
    }, []);

    const handleLogout = () => {
        store.dispatch(setAuth(
            {
                token: '',
                userName: '',
                isLogin: false
            } 
        ))
    }

    const handleLogIn = () => {
        navigate('/Login')
        console.log('Login')
    }


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
                        Admin
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
                        User
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEls['User']}
                        keepMounted
                        open={Boolean(anchorEls['User'])}
                        onClose={() => handleClose('User')}
                    >
                        {/* this two features are almost done in back-end*/}   
                        {/* <MenuItem color="inherit" component={Link} to="/User">
                            User
                        </MenuItem>
                        <MenuItem color="inherit" component={Link} to="/Role">
                            Role
                        </MenuItem> */}
                        <MenuItem color="inherit" component={Link} to="/Order">
                            Order
                        </MenuItem>
                    </Menu>
                    

                </Box> 
                {
                    isLogin &&
                    <Button color="inherit" component={Link} to="/ShoppingCart"><ShoppingCartIcon /></Button>
                }
                {   !isLogin
                    ?<Button color="inherit" onClick={handleLogIn}>Login</Button>    
                    :<Button color="inherit" onClick={handleLogout}>Logout</Button>       
                }                
                     
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader