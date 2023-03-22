import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Paper
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import { createTheme } from '@mui/material/styles';
import TourSlider from './inner/TourSlider';

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
};

theme.typography.h3_package = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.4rem',
  },
};

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const TourpackageInner = (props) => {
  const [tour, setTour] = useState(props.tour);
  return (
    <Box className='ourWork relative' >
      <Parallax bgImage="../images/tour-package.jpg" bgImageAlt="" strength={200}>
        <Box sx={{ flexGrow: 1, }} className='ourWorkInner ourWorkInnPage'>
          <Grid container spacing={3} padding={3}>
            <Grid item xs={12}>
              <Box className='sectionTitle'>
                <h5>Checkout</h5>
                <h2>Releted Tour</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
              </Box>
            </Grid>
            {
              props.tour ?
                (
                  <Grid item xs={12}>
                    <TourSlider tour={props.tour} />
                  </Grid>
                ) : ''
            }

          </Grid>
        </Box>
      </Parallax>
    </Box>
  )
}

export default TourpackageInner
