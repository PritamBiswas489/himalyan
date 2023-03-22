import React, { useState, useEffect } from 'react';
import { Link, useNavigate, redirect } from 'react-router-dom';
import {
    AppBar,
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
    Paper,
    Popover,
    Grid,
    Box,
    Menu,
    MenuItem,
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { styled } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { color, width } from '@mui/system';
import { menuApi } from '../../service/Menu.service';
import { settingApi } from '../../service/Setting.service';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';
import PopupState, { bindTrigger, bindPopover, bindHover } from 'material-ui-popup-state';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import { pagesApi } from '../../service/Pages.service';

const drawerWidth = 300;

const styles = {
    textColor: {
        color: '#fff',
        fontWeight: 'bold',
        padding: '3px 20px',
    },

    menuColor: {
        color: '#fff',
        fontWeight: 'bold',
    },

    menuColorDefault: {
        color: '#000',
        fontWeight: 'bold',
    },
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    padding: '15px',
}));

function Header(props) {
    const { window } = props;
    const navigate = useNavigate();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuList, setMenuList] = useState([]);
    const [menuSlug, setMenuSlug] = useState();
    const [childMenu, setChildMenu] = useState();
    const [childSubMenuName, setChildSubMenuName] = useState();
    const [childSubMenu, setChildSubMenu] = useState();
    const [beforeHeader, setBeforeHeader] = useState('');
    const [tracking, setTracking] = useState('');
    const [headerloading, setHeaderLoading] = useState(true);
    const [footer, setFooter] = useState('');
    const [menuTagName, setMenuTagName] = useState('');

    const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        getMenu();
        getSetting();
        getFooter();
    }, []);

    const getFooter = async () => {
        const res = await pagesApi.footer();
        if (res.status === 200 && res.data.status === 200 && res.data.success === true) {
            await setFooter(res.data.data);
        }
    };

    const getSetting = async () => {
        const setting = await settingApi.setting();
        if (setting.status === 200 && setting.data.status === 200 && setting.data.success === true) {
            await setBeforeHeader(setting.data.data.beforeHeader);
            await setTracking(setting.data.data.tracking);
            await setHeaderLoading(false);
        }
    };
    const getMenu = async () => {
        const menu = await menuApi.menu();
        if (menu.status === 200 && menu.data.success === true && menu.data.status === 200) {
            await setMenuList(menu.data.data);
            await setMenuSlug(menu.data.data.destination[0].slug);
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handlePopoverOpen = async (event, childMenu) => {
        setChildMenu(childMenu);
        if (childMenu === "destination") {
            await setChildSubMenuName(menuList.destination[0].name);
            await setMenuSlug(menuList.destination[0].slug);
            await setChildSubMenu(typeof menuList.destination[0].activities === 'undefined' ? '' : menuList.destination[0].activities);
            await setMenuTagName(menuList.destination[0].tagName);
        }
    };

    const handlePopoverClose = () => {
        setChildMenu('');
        setChildSubMenu('');
        setChildSubMenuName('');
    };

    const handleChildSubMenu = async (element, name, slug, tagName) => {
        await setChildSubMenuName(name);
        await setMenuSlug(slug);
        await setChildSubMenu(typeof element === 'undefined' ? '' : element);
        await setMenuTagName(tagName);
    };

    const handlePageRedirect = async (element) => {
        if (element === 'destination') {
            navigate(`/${element}`);
        }
        if (element === 'activities') {
            navigate('/activity');
        }
        if (element === 'style') {
            navigate(`/${element}`);
        }
    };

    const handleLogout = async () => {
        localStorage.clear();
        navigate(`/home`);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography component='a' href='/' sx={{ my: 2 }}>
                <img src={`${process.env.REACT_APP_URL}images/logo.png`} alt='' />
            </Typography>
            <Divider />
            <List>
                <ListItem key={1} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link style={styles.menuColor} to='/destination'>
                            <ListItemText primary='DESTINATIONS' /> <ArrowDropDownIcon />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem key={2} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link style={styles.menuColor} to='/activity'>
                            <ListItemText primary='ACTIVITIES' />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem key={3} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link style={styles.menuColor} to='/'>
                            <ListItemText primary='STYLES' />
                        </Link>
                    </ListItemButton>
                </ListItem>
                {/* <ListItem style={styles.menuColor} key={4} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link style={styles.menuColor} to='/about'>
                            <ListItemText primary='ABOUT US' />
                        </Link>
                    </ListItemButton>
                </ListItem> */}
                <ListItem key={5} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link style={styles.menuColor} to='/blog'>
                            <ListItemText primary='Blog' />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem key={6} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link style={styles.menuColor} to='/faq'>
                            <ListItemText primary='FAQ' />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem key={7} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link style={styles.menuColor} to='/contact'>
                            <ListItemText primary='CONTACT US' />
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
    return (
        <>
            <Helmet>
                <script id='test'>{beforeHeader ?? ''}</script>
            </Helmet>
            <Box sx={{ display: 'flex' }}>
                <AppBar
                    className='siteNav'
                    component='nav'
                    sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        position: 'absolute',
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            edge='start'
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component='a' href='/' sx={{ flexGrow: 1 }}>
                            <img src={`${process.env.REACT_APP_URL}images/logo.png`} alt='' />
                        </Typography>
                        <PopupState variant='popover' popupId='demo-popup-popover'>
                            {(popupState) => (
                                <Box variant='contained' sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    {Object.keys(menuList).map((element, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                onClick={() => handlePageRedirect(element)}
                                                onMouseEnter={(event) => handlePopoverOpen(event, element)}
                                                dataset='test'
                                                style={styles.textColor}
                                                {...bindHover(popupState)}
                                            >
                                                {element}
                                                <ArrowDropDownIcon />
                                            </Button>
                                        );
                                    })}
                                    <Button
                                        key={4}
                                        onMouseEnter={(event) => handlePopoverOpen('', 'support')}
                                        dataset='test'
                                        style={styles.textColor}
                                        {...bindHover(popupState)}
                                    >
                                        {/* <Link style={styles.textColor} to='/support'> */}
                                        Support
                                        <ArrowDropDownIcon />
                                        {/* </Link> */}
                                    </Button>
                                    <Button key={5}>
                                        <Link style={styles.textColor} to='/blog'>
                                            Blog
                                        </Link>
                                    </Button>
                                    <Button key={6}>
                                        <Link style={styles.textColor} to='/faq'>
                                            FAQ
                                        </Link>
                                    </Button>
                                    <Button key={7}>
                                        <Link style={styles.textColor} to='/contact'>
                                            CONTACT US
                                        </Link>
                                    </Button>
                                    <Button key={8} sx={{ color: '#fff', fontWeight: 'bold', fontSize: '15px' }}>
                                        <LocalPhoneIcon /> {footer?.contact}
                                    </Button>
                                    <Button key={9} sx={{ color: '#fff', fontSize: '50px' }}>
                                        <Person2Icon
                                            sx={{ width: '50px' }}
                                            onMouseEnter={(event) => handlePopoverOpen(event, 'user')}
                                            {...bindHover(popupState)}
                                        />
                                    </Button>
                                    <HoverPopover
                                        className='megamenuOuter'
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        anchorPosition={{ top: 80, left: 0 }}
                                        style={{
                                            top: '20px',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                alignItems: 'start',
                                            }}
                                            className={childMenu === 'destination' ? 'megaMenu' : 'smallMenu'}
                                        >
                                            {childMenu === 'destination' ? (
                                                <>
                                                    <Box className='megaMenuLeft'>
                                                        <List component='nav' aria-label='secondary mailbox folder'>
                                                            {menuList[childMenu].map((element, index) => (
                                                                <ListItemButton key={index}
                                                                    onClick={() => {
                                                                        handleChildSubMenu(
                                                                            element.activities,
                                                                            element.name,
                                                                            element.slug,
                                                                            element.tagName
                                                                        );
                                                                    }}
                                                                >
                                                                    <ListItemText
                                                                        primaryTypographyProps={{
                                                                            fontSize: 15,
                                                                            fontWeight: '600',
                                                                            fontFamily: 'Montserrat',
                                                                        }}
                                                                        primary={element.name}
                                                                    />
                                                                </ListItemButton>
                                                            ))}
                                                        </List>
                                                    </Box>
                                                    <Box className='megaMenuRight'>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Grid container spacing={{ xs: 2, md: 3 }}>
                                                                <Grid xs={12}>
                                                                    <Item>
                                                                        <Link to={`/${menuTagName === 'destination' ? `destination/` : `region/`}${menuSlug}`}>
                                                                            <Button
                                                                                sx={{
                                                                                    color: '#fff',
                                                                                    background: '#f97150',
                                                                                    fontFamily: 'Montserrat',
                                                                                    fontWeight: '600',
                                                                                }}
                                                                                variant='contained'
                                                                                endIcon={<ArrowForwardIcon />}
                                                                            >
                                                                                Plan Your Trip to {childSubMenuName.split('- ').slice(-1)[0]}
                                                                            </Button>
                                                                        </Link>
                                                                    </Item>
                                                                </Grid>
                                                                {childSubMenuName ? (
                                                                    <>
                                                                        {childSubMenu ? (
                                                                            <>
                                                                                {childSubMenu.map((activities, index) => (
                                                                                    <Grid xs={6}>
                                                                                        <Item>
                                                                                            <Box>
                                                                                                <Typography
                                                                                                    sx={{
                                                                                                        fontWeight:'bold',
                                                                                                        fontFamily:'Montserrat',
                                                                                                        fontSize:'15px',
                                                                                                    }}
                                                                                                >
                                                                                                    {activities.name}
                                                                                                </Typography>
                                                                                                <List component='' aria-label='' >
                                                                                                    {activities.tour.map((tour,index) => (
                                                                                                        <ListItemButton sx={{padding:'0',}}>
                                                                                                            <Link className='mmLink' style={ styles.menuColorDefault } to={`/${menuSlug}/${tour.slug}`} >
                                                                                                                <ListItemText primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', }} >
                                                                                                                    {tour.title}{' '}
                                                                                                                    <small>{tour.duration}{' '}Days</small>
                                                                                                                </ListItemText>
                                                                                                            </Link>
                                                                                                        </ListItemButton>
                                                                                                    ))}
                                                                                                </List>
                                                                                            </Box>
                                                                                        </Item>
                                                                                    </Grid>
                                                                                ))}
                                                                            </>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {menuList[childMenu][0]['activities'].map(
                                                                            (activities, index) => (
                                                                                <Grid xs={6}>
                                                                                    <Item>
                                                                                        <Box>
                                                                                            <Typography
                                                                                                sx={{
                                                                                                    fontWeight: 'bold',
                                                                                                    fontFamily:
                                                                                                        'Montserrat',
                                                                                                    fontSize: '15px',
                                                                                                }}
                                                                                            >
                                                                                                {activities.name}
                                                                                            </Typography>
                                                                                            <List
                                                                                                component=''
                                                                                                aria-label=''
                                                                                            >
                                                                                                {activities.tour.map((tour, index) => (
                                                                                                    <ListItemButton
                                                                                                        sx={{
                                                                                                            padding: '0',
                                                                                                        }}
                                                                                                    >
                                                                                                        <Link className='mmLink' style={ styles.menuColorDefault } to={`/${menuSlug}/${tour.slug}`} >
                                                                                                            <ListItemText
                                                                                                                primaryTypographyProps={{
                                                                                                                    fontSize: 13,
                                                                                                                    fontWeight: 'medium',
                                                                                                                }}
                                                                                                            >
                                                                                                                {tour.title}{' '}
                                                                                                                <small>{tour.duration}{' '}Days</small>
                                                                                                            </ListItemText>
                                                                                                        </Link>
                                                                                                    </ListItemButton>
                                                                                                ))}
                                                                                            </List>
                                                                                        </Box>
                                                                                    </Item>
                                                                                </Grid>
                                                                            )
                                                                        )}
                                                                    </>
                                                                )}
                                                            </Grid>
                                                        </Box>
                                                    </Box>
                                                </>
                                            ) : childMenu === 'activities' ? (
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    className='menuInner-2'
                                                    style={{ padding: '15px' }}
                                                >
                                                    {menuList[childMenu].map((element, index) => (
                                                        <Grid xs={6} key={index}>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/activity/${element.slug}`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            {element.name}
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            ) : childMenu === 'user' ? (
                                                <Grid style={{ padding: '5px' }}>
                                                    {localStorage.getItem('token') ? (
                                                        <Item style={{ padding: '0px' }}>
                                                            <Box>
                                                                <Typography
                                                                    className='mmLink'
                                                                    sx={{
                                                                        fontSize: 13,
                                                                        fontWeight: '600',
                                                                        fontFamily: 'Montserrat',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    onClick={handleLogout}
                                                                >
                                                                    LogOut
                                                                </Typography>
                                                            </Box>
                                                        </Item>
                                                    ) : (
                                                        <>
                                                            <Item style={{ padding: '0px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/auth/login`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Login
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                            <Item style={{ padding: '0px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/auth/register`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Register
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </>
                                                    )}
                                                </Grid>
                                            ) : (
                                                childMenu === 'support' && (
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        className='menuInner-2'
                                                        style={{ padding: '15px' }}
                                                    >
                                                        <Grid xs={6}>
                                                            <Typography
                                                                variant='h6'
                                                                sx={{
                                                                    fontSize: '0.95rem',
                                                                    fontWeight: '800',
                                                                }}
                                                            >
                                                                COMPANY RELATED
                                                            </Typography>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/about`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            About
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/team-list`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Team
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/our-services`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Our Services
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/financial-security`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Financial Security
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/partner-with-us`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Partner With Us
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography
                                                                variant='h6'
                                                                sx={{
                                                                    fontSize: '0.95rem',
                                                                    fontWeight: '800',
                                                                }}
                                                            >
                                                                GENERAL QUERIES
                                                            </Typography>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/destination-guide`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Destination Guide
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`#`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Tripadvicer Reviews
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid>
                                                        {/* <Grid xs={6}>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/about`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            About
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/our-services`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Our Services
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/financial-security`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Financial Security
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/partner-with-us`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Partner With Us
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/team`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Team
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`/support/destination-guide`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Destination Guide
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Item style={{ padding: '5px 10px' }}>
                                                                <Box>
                                                                    <Link
                                                                        className='mmLink'
                                                                        style={styles.menuColorDefault}
                                                                        to={`#`}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 13,
                                                                                fontWeight: '600',
                                                                                fontFamily: 'Montserrat',
                                                                            }}
                                                                        >
                                                                            Tripadvicer Reviews
                                                                        </Typography>
                                                                    </Link>
                                                                </Box>
                                                            </Item>
                                                        </Grid> */}
                                                    </Grid>
                                                )
                                            )}
                                        </Box>
                                    </HoverPopover>
                                </Box>
                            )}
                        </PopupState>
                    </Toolbar>
                </AppBar>
                <Box component='nav'>
                    <Drawer
                        container={container}
                        variant='temporary'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
        </>

        // <div>
        //   <Typography
        //     aria-owns={open ? 'mouse-over-popover' : undefined}
        //     aria-haspopup="true"
        //     onMouseEnter={handlePopoverOpen}
        //     onMouseLeave={handlePopoverClose}
        //   >
        //     Hover with a Popover.
        //   </Typography>
        //   <Popover
        //     id="mouse-over-popover"
        //     sx={{
        //       pointerEvents: 'none',
        //     }}
        //     open={open}
        //     anchorEl={anchorEl}
        //     anchorOrigin={{
        //       vertical: 'bottom',
        //       horizontal: 'left',
        //     }}
        //     transformOrigin={{
        //       vertical: 'top',
        //       horizontal: 'left',
        //     }}
        //     onClose={handlePopoverClose}
        //     disableRestoreFocus
        //   >
        //     <Typography sx={{ p: 1 }}>I use Popover.</Typography>
        //   </Popover>
        // </div>
    );
}

export default Header;
