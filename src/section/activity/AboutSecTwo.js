import React from 'react';
import { styled } from '@mui/material/styles';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import parse from 'html-react-parser';

const AboutSecTwo = ({ content }) => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='aboutSec-2 relative'>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={3} padding={3} alignItems={'center'}>
                        <Grid item xs={12} md={4}>
                            <Typography variant='h6_df' display={'block'}>
                                {content?.content?.main_title}
                            </Typography>
                            <Typography variant='h3_abt'>{content?.content?.main_sub_title}</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant='body1'>{parse(content?.content?.content ?? '')}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default AboutSecTwo;
