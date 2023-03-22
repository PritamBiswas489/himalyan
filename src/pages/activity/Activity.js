import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import { Box, Paper, Typography, Stack, Avatar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import Button from '@mui/material/Button';
import { Bloodtype } from '@mui/icons-material';

import AboutSecTwo from '../../section/activity/AboutSecTwo';
import Counter from '../../section/activity/Counter';
import AboutThree from '../../section/activity/AboutThree';
import ServiceExcellence from '../../section/activity/ServiceExcellence';
import MainActivity from '../../section/activity/MainActivity';
import WhatClientSay from '../../section/activity/WhatClientSay';
import WeAreMember from '../../section/activity/WeAreMember';
import { activityApi, activityContentService } from '../../service/Activity.service';
import parse from 'html-react-parser';
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

const Activity = () => {
    const [activityList, setActivityList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});

    useEffect(() => {
        getActivitys();
        getActivityContent();
    }, []);

    const getActivitys = async () => {
        const listActivity = await activityApi.listActivity();
        if (listActivity.status === 200 && listActivity.data.status === 200 && listActivity.data.success === true) {
            await setActivityList(listActivity.data.data);
            await setLoading(false);
        }
    };
    const getActivityContent = async () => {
        const result = await activityContentService();
        if (result.status === 200) {
            setContent(result.data.data);
        }
    };
    return (
        <>
            {loading ? (
                ''
            ) : (
                <>
                    <Box className='aboutBan relative'>
                        <Parallax
                            bgImage={`${process.env.REACT_APP_HOST_IMAGE}image/activities/${content?.content?.banner_img}`}
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
                                                padding: '0',
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
                                            {parse(content?.content?.sub_title ?? '')}
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
                    <Counter />
                    <AboutThree content={content} />
                    <ServiceExcellence />
                    <MainActivity activity={activityList} />
                    <WhatClientSay />
                    <WeAreMember />
                </>
            )}
        </>
    );
};

export default Activity;
