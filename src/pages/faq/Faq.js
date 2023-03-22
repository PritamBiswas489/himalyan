import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import { Box, Paper, Typography, Stack, Avatar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import Button from '@mui/material/Button';

import AboutSecTwo from '../../section/faq/AboutSecTwo';
import QuickNavigation from '../../section/faq/QuickNavigation';
import WhatClientSay from '../../section/faq/WhatClientSay';
import WeAreMember from '../../section/faq/WeAreMember';
import { faqContentService } from '../../service/faq.service';
import { Link } from 'react-router-dom';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#fb5d36'),
    backgroundColor: '#f97150',
    borderRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#d04726',
    },
}));

const Faq = () => {
    const [content, setContent] = useState({});
    useEffect(() => {
        getFaqContent();
    }, []);

    const getFaqContent = async () => {
        const result = await faqContentService();
        if (result.status === 200) {
            setContent(result.data.data);
        }
    };
    return (
        <>
            <Box className='aboutBan relative'>
                <Parallax
                    bgImage={`${process.env.REACT_APP_HOST_IMAGE}image/faq/${content?.content?.banner_img}`}
                    bgImageAlt=''
                    strength={100}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            height: '600px',
                            maxWidth: '1170px',
                            width: '100%',
                            margin: '0 auto',
                        }}
                        className='aboutBanSlogan relative ph-80'
                    >
                        <Grid
                            container
                            spacing={0}
                            padding={3}
                            alignItems={'center'}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <Grid item xs={12} md={8}>
                                <Typography
                                    variant='h2'
                                    sx={{
                                        fontSize: '50px',
                                        fontWeight: 'bold',
                                        color: '#f97150',
                                    }}
                                >
                                    {content?.content?.title}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: '#fff',
                                        fontSize: '15px',
                                    }}
                                >
                                    {content?.content?.sub_title}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={4} display={'flex'} justifyContent={'flex-end'}>
                                <Link to={`/contact`} className='themeButton'>
                                    Contact Us
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Parallax>
            </Box>
            <AboutSecTwo content={content} />
            <QuickNavigation />
            <WhatClientSay />
            <WeAreMember />
        </>
    );
};

export default Faq;
