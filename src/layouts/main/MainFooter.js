import * as React from 'react';
import { styled } from '@mui/material/styles';

import { Box, Typography, Avatar, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { pagesApi } from '../../service/Pages.service';
import parse from 'html-react-parser';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#fb5d36'),
    backgroundColor: '#f97150',
    borderRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    '&:hover': {
        backgroundColor: '#d04726',
    },
}));

const Footer = () => {
    const [data, setData] = React.useState('');
    React.useEffect(() => {
        getFooter();
    }, []);

    const getFooter = async () => {
        const res = await pagesApi.footer();
        if (res.status === 200 && res.data.status === 200 && res.data.success === true) {
            await setData(res.data.data);
        }
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='mainFooter relative'>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={3} padding={3}>
                        <Grid item xs={12} md={2}>
                            <Box>
                                <img
                                    style={{
                                        width: '100%',
                                        display: 'block',
                                    }}
                                    src={`${process.env.REACT_APP_HOST_IMAGE}image/footerPage/columnOne/${data?.columnOneLogo}`}
                                    alt=''
                                />
                                <Typography
                                    variant='body2'
                                    p={0}
                                    m={0}
                                    mt={3}
                                    sx={{
                                        fontFamily: 'Inter',
                                        fontSize: '13px',
                                        color: '#fff',
                                    }}
                                >
                                    {data ? parse(data.columnOneTitle) : ''}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={0} padding={0}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant='h5'
                                        p={0}
                                        m={0}
                                        sx={{
                                            fontFamily: 'Inter',
                                            fontSize: '15px',
                                            color: '#fff',
                                            fontWeight: '800',
                                        }}
                                    >
                                        Useful link:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <List sx={{ width: '100%' }}>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <Link to='/destination'>
                                                    <ListItemText secondary='DESTINATIONS' className='fLink' />
                                                </Link>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <Link to='/activity'>
                                                    <ListItemText secondary='ACTIVITIES' className='fLink' />
                                                </Link>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <Link to='/about'>
                                                    <ListItemText secondary='ABOUT US' className='fLink' />
                                                </Link>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <Link to='/contact'>
                                                    <ListItemText secondary='CONTACT US' className='fLink' />
                                                </Link>
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <List sx={{ width: '100%' }}>
                                        {data && data.columnThree ? (
                                            <>
                                                {JSON.parse(data.columnThree).map((element, index) => (
                                                    <ListItem disablePadding key={index}>
                                                        <ListItemButton>
                                                            <Link to={`/${element.link}`}>
                                                                <ListItemText
                                                                    secondary={element.text}
                                                                    className='fLink'
                                                                />
                                                            </Link>
                                                        </ListItemButton>
                                                    </ListItem>
                                                ))}
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <List sx={{ width: '100%' }}>
                                        {data && data.columnFour ? (
                                            <>
                                                {JSON.parse(data.columnFour).map((element, index) => (
                                                    <ListItem disablePadding key={index}>
                                                        <ListItemButton>
                                                            <Link to={`/${element.link}`}>
                                                                <ListItemText
                                                                    secondary={element.text}
                                                                    className='fLink'
                                                                />
                                                            </Link>
                                                        </ListItemButton>
                                                    </ListItem>
                                                ))}
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={2} className='contactObjectfit'>
                            <Typography
                                variant='h5'
                                disablePadding
                                sx={{
                                    padding: '0',
                                    fontFamily: 'Inter',
                                    fontSize: '15px',
                                    color: '#fff',
                                    fontWeight: '800',
                                    marginBottom: '15px',
                                }}
                            >
                                Contact
                            </Typography>
                            <ListItem
                                disablePadding
                                style={{
                                    marginBottom: 1.2,
                                    color: '#fff',
                                    alignItems: 'start',
                                }}
                            >
                                <Avatar
                                    alt='Remy Sharp'
                                    src={`${process.env.REACT_APP_HOST_IMAGE}image/footerPage/contact/${data?.addressIcon}`}
                                    sx={{ width: 20, height: 20, marginRight: '10px' }}
                                />
                                <Typography>
                                    {data.address ? data.address[0] : ''}
                                    <br></br>
                                    {data.address ? data.address[1] : ''}
                                    <br></br>
                                    {data.address ? data.address[2] : ''}
                                    <br></br>
                                    {data.address ? data.address[3] : ''}
                                </Typography>
                            </ListItem>
                            <ListItem
                                disablePadding
                                sx={{
                                    marginBottom: 1.2,
                                    color: '#fff',
                                    alignItems: 'start',
                                }}
                            >
                                <Avatar
                                    alt='Remy Sharp'
                                    src={`${process.env.REACT_APP_HOST_IMAGE}image/footerPage/contact/${data?.contactIcon}`}
                                    sx={{ width: 20, height: 20, marginRight: '10px' }}
                                />
                                {data?.contact}
                            </ListItem>
                            <ListItem
                                disablePadding
                                sx={{
                                    marginBottom: 1.2,
                                    color: '#fff',
                                    alignItems: 'start',
                                }}
                            >
                                <Avatar
                                    alt='Remy Sharp'
                                    variant='square'
                                    src={`${process.env.REACT_APP_HOST_IMAGE}image/footerPage/contact/${data?.emailIcon}`}
                                    sx={{ width: 20, height: 20, marginRight: '10px' }}
                                />
                                {data?.email}
                            </ListItem>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={0} padding={3} alignItems={'center'} pt='0' pb={0}>
                        <Grid item xs={12} md={2}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                sx={{
                                    color: '#fff',
                                }}
                            >
                                Follow Us:
                            </Typography>
                            <Box className='noobjectFit'>
                                <List component={Stack} direction='row' className='dudiAct'>
                                    {data && data.get_follow_us ? (
                                        <>
                                            {data.get_follow_us.map((element, index) => (
                                                <ListItem
                                                    key={index}
                                                    sx={{
                                                        color: '#fff',
                                                        padding: '0',
                                                        '&:hover': { color: '#f97150' },
                                                    }}
                                                >
                                                    <Link to='#' onClick={() => window.open(element.link)}>
                                                        <Avatar
                                                            variant='square'
                                                            alt=''
                                                            src={`${process.env.REACT_APP_HOST_IMAGE}image/footerPage/followus/${element.icon}`}
                                                            sx={{ width: 24, height: 24 }}
                                                        />
                                                    </Link>
                                                </ListItem>
                                            ))}
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </List>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                sx={{
                                    color: '#fff',
                                }}
                            >
                                {data?.newsLetterTitle}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: '#fff',
                                }}
                            >
                                {data ? parse(data.newsLetterDescription) : ''}
                                {/* {data ? parse(data.newsLetterDescription).slice(0, 150) : ''} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <ColorButton variant='contained' className='LearnMoreBtn'>
                                {data?.newsLetterbutton}
                            </ColorButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid
                        container
                        spacing={0}
                        padding={3}
                        alignItems={'center'}
                        pb='0'
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Grid item xs={12} md={'auto'}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                sx={{
                                    color: '#fff',
                                }}
                            >
                                We are Proud Member of:
                            </Typography>
                            <Stack direction='row' spacing={2} className='ProudjectFit'>
                                {data && data.get_we_are_proud ? (
                                    <>
                                        {data.get_we_are_proud.map((element, index) => (
                                            <Avatar
                                                alt=''
                                                src={`${process.env.REACT_APP_HOST_IMAGE}image/footerPage/weareproud/${element.icon}`}
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    ''
                                )}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={'auto'}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                sx={{
                                    color: '#fff',
                                }}
                            >
                                {data?.weAcceptedText}:
                            </Typography>
                            <Box>
                                <img
                                    src={`${process.env.REACT_APP_HOST_IMAGE}image/footerPage/weaccepted/${data?.weAcceptedImage}`}
                                    alt={data?.weAcceptedImage}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid
                        container
                        spacing={0}
                        padding={3}
                        alignItems={'center'}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Grid item xs={12} md={'auto'}>
                            <Typography
                                variant='body2'
                                gutterBottom
                                sx={{
                                    color: '#fff',
                                }}
                            >
                                © 2022 by Himalayan Leisure inc Pvt Ltd by Aqualeaf It Solution Pvt. Ltd.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={'auto'}>
                            <Stack direction='row' spacing={2}>
                                {data && data.get_s_s_l ? (
                                    <>
                                        {data.get_s_s_l.map((element, index) => (
                                            <Avatar
                                                variant='square'
                                                alt='Remy Sharp'
                                                src={`${process.env.REACT_APP_HOST_IMAGE}image/footerPage/ssl/${element.image}`}
                                                sx={{ width: 110, height: 38 }}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    ''
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Footer;
