import React from 'react';
import { Box, Typography,} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import parse from 'html-react-parser';

const AboutSecTwo = (props) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='aboutSec-2 relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3} alignItems={'center'}>
            <Grid item xs={12} md={4}>
              <Typography variant='h6_df' display={'block'}>
                {props.region?.middle_content_title}
              </Typography>
              
                <Typography variant="h3_abt">{props.region?.middle_content_subtitle}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant='body1'>
                {props.region ? parse(props.region.middle_content_description) : ''}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default AboutSecTwo