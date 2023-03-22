import React from 'react';
import { styled } from '@mui/material/styles';

import { Box, Typography,} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const AboutSecTwo = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='aboutSec-2 relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3} alignItems={'center'}>
            <Grid item xs={12} md={4}>
              <Typography variant='h6_df' display={'block'}>
                Lorem Ipsum
              </Typography>
              
                <Typography variant="h3_abt">Lorem ipsum dolor sit amet, consectetur</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant='body1'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default AboutSecTwo
