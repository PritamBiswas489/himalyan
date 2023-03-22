import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    InputBase,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Unstable_Grid2';

import CustomerSupport from '../../section/tour/inner/CustomerSupport';

import { FaFacebookF } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { CgGoogle } from 'react-icons/cg';
import { SlClock } from 'react-icons/sl';
import { BsCalendar2Minus } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';

import ImageIcon from '@mui/icons-material/Image';
import { blogDetailsService } from '../../service/Blog.service';
import WhyBook from '../../section/tour/inner/WhyBook';
import moment from 'moment';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const BlogDetails = () => {
    const { slug } = useParams();
    const [blogDtl, setBlogDtl] = useState({});

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#fb5d36'),
        backgroundColor: '#f97150',
        borderRadius: 6,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        '&:hover': {
            backgroundColor: '#d04726',
        },
    }));

    useEffect(() => {
        getBlogDetails();
    }, []);

    const getBlogDetails = async () => {
        const blog = await blogDetailsService(slug);
        if (blog.status === 200) {
            setBlogDtl(blog.data.data);
        }
    };

    const trimmedStr = (str = '', maxlen = 100) => {
        //trim the string to the maximum length
        var trimmedString = str.substr(0, maxlen);

        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
        return trimmedString;
    };

    return (
        <>
            <Box
                className='blogBanner ph-80'
                style={{
                    background: `url(${process.env.REACT_APP_HOST_IMAGE}image/blog/${blogDtl.banner_img}) top center no-repeat`,
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                <Grid container spacing={3} padding={3}>
                    <Box
                        sx={{
                            maxWidth: '800px',
                            width: '100%',
                            marginBottom: '3rem',
                        }}
                    >
                        <Typography
                            variant='h2'
                            sx={{
                                color: '#fff',
                                fontWeight: '600',
                            }}
                        >
                            {blogDtl.title}
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                color: '#fff',
                                fontWeight: '600',
                            }}
                        >
                            <BsCalendar2Minus
                                style={{
                                    color: '#f97150',
                                    marginRight: '5px',
                                }}
                            />{' '}
                            {moment(blogDtl.created_at).format('LL')}
                        </Typography>
                    </Box>
                </Grid>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                }}
                className='blogArea ph-80'
            >
                <Grid container spacing={3} padding={3}>
                    <Grid sx={3} sm={3} md={9} lg={9}>
                        <Box
                            sx={{
                                width: '100%',
                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                padding: '1.25rem',
                            }}
                        >
                            <Box
                                sx={{
                                    padding: '1rem 0',
                                }}
                            >
                                <div
                                    className='parentContent'
                                    dangerouslySetInnerHTML={{ __html: blogDtl?.content }}
                                ></div>
                                {/* <Box
                                    className='thumbnailContainer'
                                    sx={{
                                        margin: '1.25rem 0',
                                    }}
                                >
                                    <img
                                        src={`${process.env.REACT_APP_HOST_IMAGE}image/blog/${blogDtl.thumbnail_img}`}
                                        alt=''
                                    />
                                </Box> */}
                                {/* <div
                                    className='parentContent'
                                    dangerouslySetInnerHTML={{
                                        __html: blogDtl.content?.substr(
                                            trimmedStr(blogDtl?.content, 300).length,
                                            blogDtl.content.length
                                        ),
                                    }}
                                ></div> */}
                                {/* <Typography
                                    variant='h4'
                                    sx={{
                                        fontFamily: 'Montserrat',
                                        fontWeight: '700',
                                        fontSize: '1.8rem',
                                    }}
                                >
                                    What is Lorem Ipsum?
                                </Typography>
                                <Typography variant='body1'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic
                                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                                    with desktop publishing software like Aldus PageMaker including versions of Lorem
                                    Ipsum.
                                    <Box
                                        className='thumbnailContainer'
                                        sx={{
                                            margin: '1.25rem 0',
                                        }}
                                    >
                                        <img src={`../images/blog-list.jpg`} alt='' />
                                    </Box>
                                    It is a long established fact that a reader will be distracted by the readable
                                    content of a page when looking at its layout. The point of using Lorem Ipsum is that
                                    it has a more-or-less normal distribution of letters, as opposed to using 'Content
                                    here, content here', making it look like readable English. Many desktop publishing
                                    packages and web page editors now use Lorem Ipsum as their default model text, and a
                                    search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
                                    versions have evolved over the years, sometimes by accident, sometimes on purpose
                                    (injected humour and the like).
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: '1rem 0',
                                }}
                            >
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontFamily: 'Montserrat',
                                        fontWeight: '700',
                                        fontSize: '1.8rem',
                                    }}
                                >
                                    What is Lorem Ipsum?
                                </Typography>
                                <Typography variant='body1'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic
                                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                                    with desktop publishing software like Aldus PageMaker including versions of Lorem
                                    Ipsum.
                                    <br />
                                    <br />
                                    It is a long established fact that a reader will be distracted by the readable
                                    content of a page when looking at its layout. The point of using Lorem Ipsum is that
                                    it has a more-or-less normal distribution of letters, as opposed to using 'Content
                                    here, content here', making it look like readable English. Many desktop publishing
                                    packages and web page editors now use Lorem Ipsum as their default model text, and a
                                    search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
                                    versions have evolved over the years, sometimes by accident, sometimes on purpose
                                    (injected humour and the like).
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: '1rem 0',
                                }}
                            >
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontFamily: 'Montserrat',
                                        fontWeight: '700',
                                        fontSize: '1.8rem',
                                    }}
                                >
                                    What is Lorem Ipsum?
                                </Typography>
                                <Typography variant='body1'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic
                                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                                    with desktop publishing software like Aldus PageMaker including versions of Lorem
                                    Ipsum.
                                    <br />
                                    <br />
                                    It is a long established fact that a reader will be distracted by the readable
                                    content of a page when looking at its layout. The point of using Lorem Ipsum is that
                                    it has a more-or-less normal distribution of letters, as opposed to using 'Content
                                    here, content here', making it look like readable English. Many desktop publishing
                                    packages and web page editors now use Lorem Ipsum as their default model text, and a
                                    search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
                                    versions have evolved over the years, sometimes by accident, sometimes on purpose
                                    (injected humour and the like).
                                </Typography> */}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={12} md={3} lg={3}>
                        {/* <Box
                            sx={{
                                background: '#fff',
                                marginBottom: '1rem',
                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <Typography
                                variant='h5'
                                sx={{
                                    padding: '1rem 1rem',
                                    borderBottom: '#ccc 1px solid',
                                }}
                            >
                                Search
                            </Typography>
                            <Box
                                style={{
                                    padding: '.5rem 0',
                                }}
                            >
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
                                </Search>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                background: '#fff',
                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                marginBottom: '1rem',
                            }}
                        >
                            <Typography
                                variant='h5'
                                sx={{
                                    padding: '1rem 1rem',
                                    borderBottom: '#ccc 1px solid',
                                }}
                            >
                                Categorries
                            </Typography>
                            <Box
                                style={{
                                    padding: '.5rem 1rem',
                                }}
                            >
                                <ul>
                                    <li>
                                        <FormControlLabel control={<Checkbox />} label='Life Style' />
                                    </li>
                                    <li>
                                        <FormControlLabel control={<Checkbox />} label='Travels' />
                                    </li>
                                    <li>
                                        <FormControlLabel control={<Checkbox />} label='Life Style' />
                                    </li>
                                    <li>
                                        <FormControlLabel control={<Checkbox />} label='Travels' />
                                    </li>
                                    <li>
                                        <FormControlLabel control={<Checkbox />} label='Life Style' />
                                    </li>
                                    <li>
                                        <FormControlLabel control={<Checkbox />} label='Travels' />
                                    </li>
                                    <li>
                                        <FormControlLabel control={<Checkbox />} label='Life Style' />
                                    </li>
                                    <li>
                                        <FormControlLabel control={<Checkbox />} label='Travels' />
                                    </li>
                                </ul>
                            </Box>
                        </Box> */}

                        <Box
                            sx={{
                                background: '#fff',
                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                marginBottom: '1rem',
                            }}
                        >
                            <Typography
                                variant='h5'
                                sx={{
                                    padding: '1rem 1rem',
                                    borderBottom: '#ccc 1px solid',
                                }}
                            >
                                Recent Post
                            </Typography>
                            <Box>
                                <Link
                                    to={'/'}
                                    className='recentPost'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'Montserrat',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flex: '0 0 80px',
                                            maxWidth: '80px',
                                        }}
                                    >
                                        <span>
                                            <img src={`../images/blog-list.jpg`} alt='' />
                                        </span>
                                    </Box>
                                    <Box
                                        sx={{
                                            flex: '0 0 calc(100% - 80px)',
                                            paddingLeft: '.8rem',
                                        }}
                                    >
                                        <Typography
                                            variant='caption'
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            <BsCalendar2Minus
                                                style={{
                                                    marginRight: '5px',
                                                    color: '#f97150',
                                                }}
                                            />
                                            22 Feb
                                        </Typography>
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: 'Montserrat',
                                            }}
                                        >
                                            Lorem Ipsum is simply dummy text of the printing
                                        </Typography>
                                    </Box>
                                </Link>

                                <Link
                                    to={'/'}
                                    className='recentPost'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'Montserrat',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flex: '0 0 80px',
                                            maxWidth: '80px',
                                        }}
                                    >
                                        <span>
                                            <img src={`../images/blog-list.jpg`} alt='' />
                                        </span>
                                    </Box>
                                    <Box
                                        sx={{
                                            flex: '0 0 calc(100% - 80px)',
                                            paddingLeft: '.8rem',
                                        }}
                                    >
                                        <Typography
                                            variant='caption'
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            <BsCalendar2Minus
                                                style={{
                                                    marginRight: '5px',
                                                    color: '#f97150',
                                                }}
                                            />
                                            22 Feb
                                        </Typography>
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: 'Montserrat',
                                            }}
                                        >
                                            Lorem Ipsum is simply dummy text of the printing
                                        </Typography>
                                    </Box>
                                </Link>

                                <Link
                                    to={'/'}
                                    className='recentPost'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'Montserrat',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flex: '0 0 80px',
                                            maxWidth: '80px',
                                        }}
                                    >
                                        <span>
                                            <img src={`../images/blog-list.jpg`} alt='' />
                                        </span>
                                    </Box>
                                    <Box
                                        sx={{
                                            flex: '0 0 calc(100% - 80px)',
                                            paddingLeft: '.8rem',
                                        }}
                                    >
                                        <Typography
                                            variant='caption'
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            <BsCalendar2Minus
                                                style={{
                                                    marginRight: '5px',
                                                    color: '#f97150',
                                                }}
                                            />
                                            22 Feb
                                        </Typography>
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: 'Montserrat',
                                            }}
                                        >
                                            Lorem Ipsum is simply dummy text of the printing
                                        </Typography>
                                    </Box>
                                </Link>

                                <Link
                                    to={'/'}
                                    className='recentPost'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'Montserrat',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flex: '0 0 80px',
                                            maxWidth: '80px',
                                        }}
                                    >
                                        <span>
                                            <img src={`../images/blog-list.jpg`} alt='' />
                                        </span>
                                    </Box>
                                    <Box
                                        sx={{
                                            flex: '0 0 calc(100% - 80px)',
                                            paddingLeft: '.8rem',
                                        }}
                                    >
                                        <Typography
                                            variant='caption'
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            <BsCalendar2Minus
                                                style={{
                                                    marginRight: '5px',
                                                    color: '#f97150',
                                                }}
                                            />
                                            22 Feb
                                        </Typography>
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: 'Montserrat',
                                            }}
                                        >
                                            Lorem Ipsum is simply dummy text of the printing
                                        </Typography>
                                    </Box>
                                </Link>

                                <Link
                                    to={'/'}
                                    className='recentPost'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'Montserrat',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flex: '0 0 80px',
                                            maxWidth: '80px',
                                        }}
                                    >
                                        <span>
                                            <img src={`../images/blog-list.jpg`} alt='' />
                                        </span>
                                    </Box>
                                    <Box
                                        sx={{
                                            flex: '0 0 calc(100% - 80px)',
                                            paddingLeft: '.8rem',
                                        }}
                                    >
                                        <Typography
                                            variant='caption'
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            <BsCalendar2Minus
                                                style={{
                                                    marginRight: '5px',
                                                    color: '#f97150',
                                                }}
                                            />
                                            22 Feb
                                        </Typography>
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: 'Montserrat',
                                            }}
                                        >
                                            Lorem Ipsum is simply dummy text of the printing
                                        </Typography>
                                    </Box>
                                </Link>

                                <Link
                                    to={'/'}
                                    className='recentPost'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'Montserrat',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flex: '0 0 80px',
                                            maxWidth: '80px',
                                        }}
                                    >
                                        <span>
                                            <img src={`../images/blog-list.jpg`} alt='' />
                                        </span>
                                    </Box>
                                    <Box
                                        sx={{
                                            flex: '0 0 calc(100% - 80px)',
                                            paddingLeft: '.8rem',
                                        }}
                                    >
                                        <Typography
                                            variant='caption'
                                            style={{
                                                color: '#666',
                                            }}
                                        >
                                            <BsCalendar2Minus
                                                style={{
                                                    marginRight: '5px',
                                                    color: '#f97150',
                                                }}
                                            />
                                            22 Feb
                                        </Typography>
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: 'Montserrat',
                                            }}
                                        >
                                            Lorem Ipsum is simply dummy text of the printing
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                        <WhyBook />
                        <CustomerSupport />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default BlogDetails;
