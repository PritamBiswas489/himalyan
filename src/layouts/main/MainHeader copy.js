import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Popper,
  Grow,
  Paper,
  MenuList,
  ClickAwayListener
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const styles = {
    textColor: {
      color: "#fff",
      fontWeight: 'bold',
      padding: '3px 20px',
    },

    menuColor: {
      color: "#fff",
      fontWeight: 'bold',
    },
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'}}>
      <Typography
        component="a"
        href="/" sx={{ my: 2 }}>
        <img src={`${process.env.REACT_APP_URL}images/logo.png`} alt="" />
      </Typography>
      <Divider />
      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link style={styles.menuColor} to="/destination"><ListItemText primary="DESTINATIONS" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem key={2} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link style={styles.menuColor} to="/activity"><ListItemText primary="ACTIVITIES" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem key={3} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link style={styles.menuColor} to="/"><ListItemText primary="STYLES" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem style={styles.menuColor} key={4} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link style={styles.menuColor} to="/about"><ListItemText primary="ABOUT US" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem key={5} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link style={styles.menuColor} to="/faq"><ListItemText primary="FAQ" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem key={6} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link style={styles.menuColor} to="/contact"><ListItemText primary="CONTACT US" /></Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
   const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  const handleLogout = async (event) => {
    localStorage.removeItem('token');
    handleClose(event);
    navigate('/');
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{backgroundColor:"transparent", boxShadow:"none", position: "absolute"}} >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
             component="a"
             href="/"
            sx={{ flexGrow: 1}}
          >
            <img src={`${process.env.REACT_APP_URL}images/logo.png`} alt="" />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button key={1}>
              <Link style={styles.textColor} to="/destination">DESTINATIONS</Link>
            </Button>
            <Button key={2}>
              <Link style={styles.textColor} to="/activity">ACTIVITIES</Link>
            </Button>
            <Button key={3}>
              <Link style={styles.textColor} to="/">STYLES</Link>
            </Button>
            <Button key={4}>
              <Link style={styles.textColor} to="/about">ABOUT US</Link>
            </Button>
            <Button key={5}>
              <Link style={styles.textColor} to="/faq">FAQ</Link>
            </Button>
            <Button key={6}>
              <Link style={styles.textColor} to="/contact">CONTACT US</Link>
            </Button>
            <Button key={7} sx={{ color: '#fff',fontWeight:'bold',fontSize:'15px'}}>
              <LocalPhoneIcon/> +44356354343
            </Button>
            <Button key={8} sx={{ color: '#fff',fontSize:'50px'}} ref={anchorRef} onClick={handleToggle}>
              <Person2Icon sx={{width:'50px'}}/>
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        {localStorage.getItem('token')? (
                          <>
                            {/* <MenuItem><Link to="/auth/register">Register</Link></MenuItem> */}
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </>
                        ):(
                          <>
                            <MenuItem><Link to="/auth/register">Register</Link></MenuItem>
                            <MenuItem><Link to="/auth/login">Login</Link></MenuItem>
                          </>
                        )}
                        
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>


            {/* <Button key={8} sx={{ color: '#fff',fontSize:'50px'}} onClick={handleClick}>
              <Person2Icon sx={{width:'50px'}}/>
            </Button> */}
            {/* <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        // PaperProps={{
        //   elevation: 0,
        //   sx: {
        //     overflow: 'visible',
        //     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        //     mt: 1.5,
        //     '& .MuiAvatar-root': {
        //       width: 32,
        //       height: 32,
        //       ml: -0.5,
        //       mr: 1,
        //     },
        //     '&:before': {
        //       content: '""',
        //       display: 'block',
        //       position: 'absolute',
        //       top: 0,
        //       right: 14,
        //       width: 10,
        //       height: 10,
        //       bgcolor: 'background.paper',
        //       transform: 'translateY(-50%) rotate(45deg)',
        //       zIndex: 0,
        //     },
        //   },
        // }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
    </Box>
  );
}

export default Header;
