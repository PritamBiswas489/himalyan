import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Parallax } from 'react-parallax';
import Grid from '@mui/material/Unstable_Grid2';
import parse from 'html-react-parser';

const MainActivity = (props) => {
    const [activity, setActivity] = useState([]);
    useEffect(() => {
        setActivity(props.activity);
    }, [props]);

    const trimmedStr = (str = '', maxlen = 100) => {
        //trim the string to the maximum length
        var trimmedString = str.substr(0, maxlen);

        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
        return trimmedString;
    };

    return (
        <Box sx={{ flexGrow: 1 }} className='relative mainActivitySection'>
            <Parallax
                className='mainActivityParalax'
                bgImage='../images/main-activity-bg.jpg'
                bgImageAlt=''
                strength={200}
            >
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={3} padding={3} alignItems={'center'}>
                        <Grid item xs={12}>
                            <Paper
                                sx={{ backgroundColor: 'transparent', boxShadow: 'none', textAlign: 'center' }}
                                className='sectionTitle'
                            >
                                <Typography variant='h6_df'>Lorem Ipsum</Typography>
                                <Typography variant='h2' display='block'>
                                    Main Activity
                                </Typography>
                            </Paper>
                        </Grid>
                        {activity.map((element, index) => (
                            <Grid item xs={12} sm={6} md={3} className=''>
                                <Paper
                                    className='aboutInnerBox'
                                    component='a'
                                    href={`activity/${element.slug}`}
                                    sx={{
                                        boxShadow: 'rgba(0,0,0,.3) 0 5px 20px -5px',
                                        backgroundColor: '#fff',
                                        padding: 3,
                                        borderRadius: '16px',
                                        display: 'block',
                                        minHeight: '260px',
                                    }}
                                >
                                    <Typography>
                                        <span className='roundIcon-2'>
                                            {/* {element.icon ? ( */}
                                            <img
                                                src={`${process.env.REACT_APP_HOST_IMAGE}image/activities/icon/${element.icon}`}
                                                alt={element.icon} />
                                            {/* ) : (
                                                <img src={`../images/icon/1.png`} alt='' />
                                            )} */}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        sx={{
                                            fontSize: '22px',
                                            fontWeight: 'bold',
                                            fontFamily: 'Inter',
                                        }}
                                    >
                                        {element.name}
                                    </Typography>
                                    <Typography variant='body2'>
                                        {parse(trimmedStr(element.description, 200))}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Parallax>
        </Box>
    );
};

export default MainActivity;
