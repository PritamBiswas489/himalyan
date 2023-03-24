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
    const [blogRecentPosts, setRecentPosts] = useState([]);
    
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
            setRecentPosts(blog.data.blog_recent);
            //console.log(blog.data.blog_recent.data);
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
                                 
                               
                                
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={12} md={3} lg={3}>
                       

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

                            {blogRecentPosts.map((dldet)=><Link
                                    key={dldet.slug}
                                    to={`/blog-details/${dldet.slug}`}
                                    target="_blank"
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
                                            <img src={`${process.env.REACT_APP_HOST_IMAGE}image/blog/${dldet.thumbnail_img}`} alt='' />
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
                                            {moment(dldet.created_at).format('LL')}
                                        </Typography>
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: 'Montserrat',
                                            }}
                                        >
                                            {dldet.title}
                                        </Typography>
                                    </Box>
                                </Link>
                                )}


                            

                                
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
