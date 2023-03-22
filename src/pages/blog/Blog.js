import React, { useEffect, useState } from 'react';
import { Box, Typography, Pagination, Stack, InputLabel, MenuItem, FormControl, Select } from '@mui/material';


import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

import { MdPlayArrow } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';

import { blogListService } from '../../service/Blog.service';
import moment from 'moment';

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [blogMeta, setBlogMeta] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        getBlog();
    }, [page]);

    const getBlog = async () => {
        const blog = await blogListService(page);
        if (blog.status === 200) {
            setBlog(blog.data.data.records);
            setBlogMeta(blog.data.data.meta);
        }
    };

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Box className='blogBanner' style={{ background: 'url(../images/blog.jpg) top center no-repeat' }}></Box>

            <Box sx={{ flexGrow: 1 }} className='ph-80 blogArea'>
                <div className='blogFilter'>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">Filter</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Grid container spacing={3} padding={3}>
                    <Grid sx={12} sm={12} md={12} lg={12}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                mx: 'auto',
                                maxWidth: '700px',
                                width: '100%',
                            }}
                        >
                            <Typography variant='h2'>Blog</Typography>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    fontFamily: 'Montserrat',
                                    fontSize: '16px',
                                }}
                            >
                                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown simply dummy text of the printing
                            </Typography>
                        </Box>
                    </Grid>
                    {blog.map((val, i) => (
                        <Grid sx={12} sm={6} md={4} lg={4}>
                            <Box className='blogList'>
                                <Box className='thumbnailContainer'>
                                    <img
                                        src={`${process.env.REACT_APP_HOST_IMAGE}image/blog/${val.thumbnail_img}`}
                                        alt=''

                                    />
                                    <span className='eventName'>{val.author_name}</span>
                                </Box>
                                <Box
                                    className='postblockContent'
                                    sx={{
                                        padding: '1.25rem',
                                    }}
                                >
                                    <Typography variant='h6'>
                                        <Link to={`/blog-details/${val.slug}`}>{val.title}</Link>
                                    </Typography>
                                    <Typography className='captionDate' variant='caption'>
                                        <SlCalender />
                                        {moment(val.created_at).format('LL')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        dangerouslySetInnerHTML={{ __html: val.content.substr(0, 300) + ' ...' }}
                                    ></Typography>
                                    <Typography variant='subtitle2'>
                                        <Link to={`/blog-details/${val.slug}`} className='readMore'>
                                            <MdPlayArrow />
                                            Read More
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                    {/* <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box className='blogList'>
                            <Box className='thumbnailContainer'>
                                <img src={`../images/blog-list.jpg`} alt='' />
                                <span className='eventName'>Event Name</span>
                            </Box>
                            <Box
                                className='postblockContent'
                                sx={{
                                    padding: "1.25rem",
                                }}
                            >
                                <Typography variant='h6'>
                                    <Link to={"#"}>Enjoying the Sensation of Cycling at Pinang Mountain Bike Park</Link>
                                </Typography>
                                <Typography className='captionDate' variant='caption'>
                                    <SlCalender />
                                    February 15, 2023
                                </Typography>
                                <Typography variant='body1'>
                                    Lorem ipsum dolor sit amet conset atetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                </Typography>
                                <Typography variant='subtitle2'>
                                    <Link to={"#"} className='readMore'>
                                        <MdPlayArrow />
                                        Read More
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box className='blogList'>
                            <Box className='thumbnailContainer'>
                                <img src={`../images/blog-list.jpg`} alt='' />
                                <span className='eventName'>Event Name</span>
                            </Box>
                            <Box
                                className='postblockContent'
                                sx={{
                                    padding: "1.25rem",
                                }}
                            >
                                <Typography variant='h6'>
                                    <Link to={"#"}>Enjoying the Sensation of Cycling at Pinang Mountain Bike Park</Link>
                                </Typography>
                                <Typography className='captionDate' variant='caption'>
                                    <SlCalender />
                                    February 15, 2023
                                </Typography>
                                <Typography variant='body1'>
                                    Lorem ipsum dolor sit amet conset atetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                </Typography>
                                <Typography variant='subtitle2'>
                                    <Link to={"#"} className='readMore'>
                                        <MdPlayArrow />
                                        Read More
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box className='blogList'>
                            <Box className='thumbnailContainer'>
                                <img src={`../images/blog-list.jpg`} alt='' />
                                <span className='eventName'>Event Name</span>
                            </Box>
                            <Box
                                className='postblockContent'
                                sx={{
                                    padding: "1.25rem",
                                }}
                            >
                                <Typography variant='h6'>
                                    <Link to={"#"}>Enjoying the Sensation of Cycling at Pinang Mountain Bike Park</Link>
                                </Typography>
                                <Typography className='captionDate' variant='caption'>
                                    <SlCalender />
                                    February 15, 2023
                                </Typography>
                                <Typography variant='body1'>
                                    Lorem ipsum dolor sit amet conset atetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                </Typography>
                                <Typography variant='subtitle2'>
                                    <Link to={"#"} className='readMore'>
                                        <MdPlayArrow />
                                        Read More
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box className='blogList'>
                            <Box className='thumbnailContainer'>
                                <img src={`../images/blog-list.jpg`} alt='' />
                                <span className='eventName'>Event Name</span>
                            </Box>
                            <Box
                                className='postblockContent'
                                sx={{
                                    padding: "1.25rem",
                                }}
                            >
                                <Typography variant='h6'>
                                    <Link to={"#"}>Enjoying the Sensation of Cycling at Pinang Mountain Bike Park</Link>
                                </Typography>
                                <Typography className='captionDate' variant='caption'>
                                    <SlCalender />
                                    February 15, 2023
                                </Typography>
                                <Typography variant='body1'>
                                    Lorem ipsum dolor sit amet conset atetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                </Typography>
                                <Typography variant='subtitle2'>
                                    <Link to={"#"} className='readMore'>
                                        <MdPlayArrow />
                                        Read More
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box className='blogList'>
                            <Box className='thumbnailContainer'>
                                <img src={`../images/blog-list.jpg`} alt='' />
                                <span className='eventName'>Event Name</span>
                            </Box>
                            <Box
                                className='postblockContent'
                                sx={{
                                    padding: "1.25rem",
                                }}
                            >
                                <Typography variant='h6'>
                                    <Link to={"#"}>Enjoying the Sensation of Cycling at Pinang Mountain Bike Park</Link>
                                </Typography>
                                <Typography className='captionDate' variant='caption'>
                                    <SlCalender />
                                    February 15, 2023
                                </Typography>
                                <Typography variant='body1'>
                                    Lorem ipsum dolor sit amet conset atetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                </Typography>
                                <Typography variant='subtitle2'>
                                    <Link to={"#"} className='readMore'>
                                        <MdPlayArrow />
                                        Read More
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box className='blogList'>
                            <Box className='thumbnailContainer'>
                                <img src={`../images/blog-list.jpg`} alt='' />
                                <span className='eventName'>Event Name</span>
                            </Box>
                            <Box
                                className='postblockContent'
                                sx={{
                                    padding: "1.25rem",
                                }}
                            >
                                <Typography variant='h6'>
                                    <Link to={"#"}>Enjoying the Sensation of Cycling at Pinang Mountain Bike Park</Link>
                                </Typography>
                                <Typography className='captionDate' variant='caption'>
                                    <SlCalender />
                                    February 15, 2023
                                </Typography>
                                <Typography variant='body1'>
                                    Lorem ipsum dolor sit amet conset atetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                </Typography>
                                <Typography variant='subtitle2'>
                                    <Link to={"#"} className='readMore'>
                                        <MdPlayArrow />
                                        Read More
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid> */}
                    {blog.length > 0 && (
                        <Grid sx={12} sm={12} md={12} lg={12}>
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    margin: '1rem 0',
                                }}
                            >
                                <Stack spacing={2}>
                                    <Pagination
                                        count={blogMeta.totalPages}
                                        color='primary'
                                        page={page}
                                        onChange={(e, val) => {
                                            setPage(val);
                                        }}
                                    />
                                </Stack>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </>
    );
};

export default Blog;
