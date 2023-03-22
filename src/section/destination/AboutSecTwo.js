import React from 'react';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const AboutSecTwo = ({ destination }) => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='aboutSec-2 relative'>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={3} padding={3} alignItems={'center'}>
                        <Grid item xs={12} md={4}>
                            <Typography variant='h6_df' display={'block'}>
                                {destination?.content?.main_title}
                            </Typography>

                            <Typography variant='h3_abt'>{destination?.content?.main_sub_title}</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography
                                variant='body1'
                                dangerouslySetInnerHTML={{
                                    __html: destination?.content?.main_description,
                                }}
                            ></Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default AboutSecTwo;
