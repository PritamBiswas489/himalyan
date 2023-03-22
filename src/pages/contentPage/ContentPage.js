import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Rating, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import WhyBook from '../../section/tour/inner/WhyBook';
import CustomerSupport from '../../section/tour/inner/CustomerSupport';

import WhatClientSay from '../../section/about/WhatClientSay';
import WeAreMember from '../../section/about/WeAreMember';

import { Link, useParams } from 'react-router-dom';
import { getContentService } from '../../service/support.service';
import { widgetsApi } from '../../service/Widgets.service';

const ContentPage = () => {
    const { slug } = useParams();
    const [content, setContent] = useState({});
    const [recommendedTour, setRecommendedTour] = useState([]);
    const [setting, setSetting] = useState('');
    useEffect(() => {
        getContent();
        getRecommendedTour();
    }, []);

    const getContent = async () => {
        const content = await getContentService(slug);
        if (content.status === 200) {
            setContent(content.data.data);
        }
    };

    const getRecommendedTour = async () => {
        const recommendedtour = await widgetsApi.recommendedTour();
        if (recommendedtour.status === 200 && recommendedtour.data.status === 200 && recommendedtour.data.success === true) {
            await setSetting(recommendedtour.data.setting);
            await setRecommendedTour(recommendedtour.data.data);
        }

    }
    return (
        <>
            <Box
                className='contentPageBann'
                style={{
                    background: `url(${process.env.REACT_APP_HOST_IMAGE}image/support/${content?.banner_image}) top center no-repeat`,
                    position: 'relative',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        fontFamily: 'Montserrat',
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        color: '#fff',
                        position: 'absolute',
                        bottom: '40px',
                        left: '50px',
                    }}
                >
                    {content?.title}
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} className='ph-80 contentPageArea'>
                <Grid container spacing={3} padding={3}>
                    <Grid sx={12} sm={12} md={9} lg={8}>
                        <Box
                            sx={{
                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                padding: '1.25rem',
                            }}
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    fontFamily: 'Montserrat',
                                    fontSize: '1.75rem',
                                    fontWeight: '700',
                                }}
                            >
                                {content?.title}
                            </Typography>
                            <Typography
                                variant='body1'
                                dangerouslySetInnerHTML={{ __html: content?.description }}
                            ></Typography>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={12} md={3} lg={4}>
                        <Box className='rightPart'>
                            <WhyBook />
                            <Box mt={2} className='whyBookUs'>
                                <Card
                                    sx={{
                                        border: '#f97150 1px solid',
                                        boxShadow: 'none',
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant='h6'
                                        sx={{
                                            padding: '5px 10px',
                                            textAlign: 'center',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            background: '#f97150',
                                        }}
                                    >
                                        Recommended Tour
                                    </Typography>
                                    <CardContent style={{ padding: '15px 20px' }}>
                                        {recommendedTour.map((element, index) => {
                                            let price = 0;
                                            if (setting) {
                                                const currentDate = new Date();
                                                const discountStartDate = new Date(setting.discountStartDate);
                                                const discountEndDate = new Date(setting.discountEndDate);
                                                if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && setting.globalDiscount > element.get_tour.discount) {
                                                    price = element.get_tour.price - Number(((element.get_tour.price * setting.globalDiscount) / 100).toFixed(2));
                                                } else {
                                                    price = element.get_tour.price - Number(((element.get_tour.price * element.get_tour.discount) / 100).toFixed(2));
                                                }
                                            } else {
                                                price = element.get_tour.price - Number(((element.get_tour.price * element.get_tour.discount) / 100).toFixed(2));
                                            }
                                            return (<Box className='recommendedTourBox' key={index}>
                                                <Link
                                                    to={`/${element.get_tour.get_destination.slug}/${element.get_tour.slug}`}
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <Box
                                                        className='rtbleft'
                                                        sx={{
                                                            flex: '0 0 100px',
                                                            maxWidth: '100px',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <span>
                                                            <img src={`${process.env.REACT_APP_HOST_IMAGE}image/tour/bannerThumb/${element.get_tour.bannerThumb}`} alt='' />
                                                        </span>
                                                        <span className='bestSeller'>Best Seller</span>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            flexGrow: '1',
                                                            paddingLeft: '10px',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant='h6'
                                                            sx={{
                                                                fontFamily: 'Montserrat',
                                                                fontSize: '1rem',
                                                                fontWeight: '700',
                                                            }}
                                                        >
                                                            {element.get_tour.title}
                                                        </Typography>
                                                        <Stack spacing={1}>
                                                            <Rating
                                                                name='half-rating-read'
                                                                value={element.get_tour.average_rating}
                                                                defaultValue={0}
                                                                precision={0.5}
                                                                size='small'
                                                                readOnly
                                                            />
                                                        </Stack>
                                                        <Typography
                                                            variant='subtitle1'
                                                            sx={{
                                                                fontFamily: 'Montserrat',
                                                                fontSize: '.8rem',
                                                                fontWeight: '700',
                                                                padding: '0',
                                                                marginTop: '.3rem',
                                                            }}
                                                        >
                                                            {element.get_tour.price === price ? '' : <p className='lineThrough ltProrerties-2'>From <span>${element.get_tour.price}</span></p>}
                                                            USD {price}
                                                        </Typography>
                                                    </Box>
                                                </Link>
                                            </Box>)
                                        })}
                                        {/* <Box className='recommendedTourBox'>
                                            <Link
                                                to={'/'}
                                                style={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <Box
                                                    className='rtbleft'
                                                    sx={{
                                                        flex: '0 0 100px',
                                                        maxWidth: '100px',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <span>
                                                        <img src={'images/package/2.jpg'} alt='' />
                                                    </span>
                                                    <span className='bestSeller'>Best Seller</span>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flexGrow: '1',
                                                        paddingLeft: '10px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h6'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '1rem',
                                                            fontWeight: '700',
                                                        }}
                                                    >
                                                        What is Lorem Ipsum
                                                    </Typography>
                                                    <Stack spacing={1}>
                                                        <Rating
                                                            name='half-rating-read'
                                                            defaultValue={2.5}
                                                            precision={0.5}
                                                            size='small'
                                                            readOnly
                                                        />
                                                    </Stack>
                                                    <Typography
                                                        variant='subtitle1'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '.8rem',
                                                            fontWeight: '700',
                                                            padding: '0',
                                                            marginTop: '.3rem',
                                                        }}
                                                    >
                                                        Form <span>$360</span>
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        </Box>
                                        <Box className='recommendedTourBox'>
                                            <Link
                                                to={'/'}
                                                style={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <Box
                                                    className='rtbleft'
                                                    sx={{
                                                        flex: '0 0 100px',
                                                        maxWidth: '100px',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <span>
                                                        <img src={'images/package/2.jpg'} alt='' />
                                                    </span>
                                                    <span className='bestSeller'>Best Seller</span>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flexGrow: '1',
                                                        paddingLeft: '10px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h6'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '1rem',
                                                            fontWeight: '700',
                                                        }}
                                                    >
                                                        What is Lorem Ipsum
                                                    </Typography>
                                                    <Stack spacing={1}>
                                                        <Rating
                                                            name='half-rating-read'
                                                            defaultValue={2.5}
                                                            precision={0.5}
                                                            size='small'
                                                            readOnly
                                                        />
                                                    </Stack>
                                                    <Typography
                                                        variant='subtitle1'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '.8rem',
                                                            fontWeight: '700',
                                                            padding: '0',
                                                            marginTop: '.3rem',
                                                        }}
                                                    >
                                                        Form <span>$360</span>
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        </Box>
                                        <Box className='recommendedTourBox'>
                                            <Link
                                                to={'/'}
                                                style={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <Box
                                                    className='rtbleft'
                                                    sx={{
                                                        flex: '0 0 100px',
                                                        maxWidth: '100px',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <span>
                                                        <img src={'images/package/2.jpg'} alt='' />
                                                    </span>
                                                    <span className='bestSeller'>Best Seller</span>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flexGrow: '1',
                                                        paddingLeft: '10px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h6'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '1rem',
                                                            fontWeight: '700',
                                                        }}
                                                    >
                                                        What is Lorem Ipsum
                                                    </Typography>
                                                    <Stack spacing={1}>
                                                        <Rating
                                                            name='half-rating-read'
                                                            defaultValue={2.5}
                                                            precision={0.5}
                                                            size='small'
                                                            readOnly
                                                        />
                                                    </Stack>
                                                    <Typography
                                                        variant='subtitle1'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '.8rem',
                                                            fontWeight: '700',
                                                            padding: '0',
                                                            marginTop: '.3rem',
                                                        }}
                                                    >
                                                        Form <span>$360</span>
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        </Box>
                                        <Box className='recommendedTourBox'>
                                            <Link
                                                to={'/'}
                                                style={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <Box
                                                    className='rtbleft'
                                                    sx={{
                                                        flex: '0 0 100px',
                                                        maxWidth: '100px',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <span>
                                                        <img src={'images/package/2.jpg'} alt='' />
                                                    </span>
                                                    <span className='bestSeller'>Best Seller</span>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flexGrow: '1',
                                                        paddingLeft: '10px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h6'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '1rem',
                                                            fontWeight: '700',
                                                        }}
                                                    >
                                                        What is Lorem Ipsum
                                                    </Typography>
                                                    <Stack spacing={1}>
                                                        <Rating
                                                            name='half-rating-read'
                                                            defaultValue={2.5}
                                                            precision={0.5}
                                                            size='small'
                                                            readOnly
                                                        />
                                                    </Stack>
                                                    <Typography
                                                        variant='subtitle1'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '.8rem',
                                                            fontWeight: '700',
                                                            padding: '0',
                                                            marginTop: '.3rem',
                                                        }}
                                                    >
                                                        Form <span>$360</span>
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        </Box>
                                        <Box className='recommendedTourBox'>
                                            <Link
                                                to={'/'}
                                                style={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <Box
                                                    className='rtbleft'
                                                    sx={{
                                                        flex: '0 0 100px',
                                                        maxWidth: '100px',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <span>
                                                        <img src={'images/package/2.jpg'} alt='' />
                                                    </span>
                                                    <span className='bestSeller'>Best Seller</span>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flexGrow: '1',
                                                        paddingLeft: '10px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h6'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '1rem',
                                                            fontWeight: '700',
                                                        }}
                                                    >
                                                        What is Lorem Ipsum
                                                    </Typography>
                                                    <Stack spacing={1}>
                                                        <Rating
                                                            name='half-rating-read'
                                                            defaultValue={2.5}
                                                            precision={0.5}
                                                            size='small'
                                                            readOnly
                                                        />
                                                    </Stack>
                                                    <Typography
                                                        variant='subtitle1'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '.8rem',
                                                            fontWeight: '700',
                                                            padding: '0',
                                                            marginTop: '.3rem',
                                                        }}
                                                    >
                                                        Form <span>$360</span>
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        </Box>
                                        <Box className='recommendedTourBox'>
                                            <Link
                                                to={'/'}
                                                style={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <Box
                                                    className='rtbleft'
                                                    sx={{
                                                        flex: '0 0 100px',
                                                        maxWidth: '100px',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <span>
                                                        <img src={'images/package/2.jpg'} alt='' />
                                                    </span>
                                                    <span className='bestSeller'>Best Seller</span>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flexGrow: '1',
                                                        paddingLeft: '10px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h6'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '1rem',
                                                            fontWeight: '700',
                                                        }}
                                                    >
                                                        What is Lorem Ipsum
                                                    </Typography>
                                                    <Stack spacing={1}>
                                                        <Rating
                                                            name='half-rating-read'
                                                            defaultValue={2.5}
                                                            precision={0.5}
                                                            size='small'
                                                            readOnly
                                                        />
                                                    </Stack>
                                                    <Typography
                                                        variant='subtitle1'
                                                        sx={{
                                                            fontFamily: 'Montserrat',
                                                            fontSize: '.8rem',
                                                            fontWeight: '700',
                                                            padding: '0',
                                                            marginTop: '.3rem',
                                                        }}
                                                    >
                                                        Form <span>$360</span>
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        </Box> */}
                                    </CardContent>
                                </Card>
                            </Box>
                            <CustomerSupport />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <WhatClientSay />
            <WeAreMember />
        </>
    );
};

export default ContentPage;
