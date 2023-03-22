import React from 'react';
import { Box, Typography, Card, CardContent, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import parse from 'html-react-parser';

const AboutThree = ({ content }) => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='aboutSec-2 relative'>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={3} padding={3} alignItems={'center'}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ marginBottom: '20px' }}>
                                <Typography variant='h6_df' display={'block'}>
                                    {content?.content?.section2_title}
                                </Typography>

                                <Typography variant='h3_abt'>{content?.content?.section2_sub_title}</Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: '#444',
                                        fontSize: '15px',
                                        marginTop: '20px',
                                    }}
                                >
                                    {parse(content?.content?.section2_content ?? '')}
                                </Typography>
                            </Box>

                            <Card sx={{ display: 'flex', boxShadow: 'none' }} className='missionVission'>
                                <Box className='mvLeft'>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <span>
                                            <img
                                                src={`${process.env.REACT_APP_HOST_IMAGE}image/activities/${content?.content?.section2_img4}`}
                                                alt=''
                                            />
                                        </span>
                                    </CardContent>
                                </Box>
                                <Box className='mvRight'
                                    sx={{ display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component='div' variant='h5'>
                                            {parse(content?.content?.section2_item1_title ?? '')}
                                        </Typography>
                                        <Typography variant='subtitle1' color='text.secondary' component='div'>
                                            {parse(content?.content?.section2_item1_content ?? '')}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                            <Card sx={{ display: 'flex', boxShadow: 'none' }} className='missionVission'>
                                <Box className='mvLeft'>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <span>
                                            <img
                                                src={`${process.env.REACT_APP_HOST_IMAGE}image/activities/${content?.content?.section2_img5}`}
                                                alt=''
                                            />
                                        </span>
                                    </CardContent>
                                </Box>
                                <Box className='mvRight'
                                    sx={{ display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component='div' variant='h5'>
                                            {parse(content?.content?.section2_item2_title ?? '')}
                                        </Typography>
                                        <Typography variant='subtitle1' color='text.secondary' component='div'>
                                            {parse(content?.content?.section2_item2_content ?? '')}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} className='missionImg'>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    boxShadow: 'none',
                                    position: 'relative',
                                    zIndex: '1',
                                }}
                            >
                                <Paper className='missionMid'>
                                    <img
                                        src={`${process.env.REACT_APP_HOST_IMAGE}image/activities/${content?.content?.section2_img1}`}
                                        alt=''
                                    />
                                </Paper>
                                <Paper className='missionTop'>
                                    <img
                                        src={`${process.env.REACT_APP_HOST_IMAGE}image/activities/${content?.content?.section2_img2}`}
                                        alt=''
                                    />
                                </Paper>
                                <Paper className='missionBtm'>
                                    <img
                                        src={`${process.env.REACT_APP_HOST_IMAGE}image/activities/${content?.content?.section2_img3}`}
                                        alt=''
                                    />
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default AboutThree;
