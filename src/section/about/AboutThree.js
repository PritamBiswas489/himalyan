import React from 'react';
import { Box, Typography, Card, CardContent,Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const AboutThree = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='aboutSec-2 relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3} alignItems={'center'}>
            <Grid item xs={12} md={6}>
              <Box sx={{ marginBottom: '20px' }}>
                <Typography variant='h6_df' display={'block'}>
                  Lorem Ipsum
                </Typography>
                <Typography variant="h3_abt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                </Typography>
                <Typography variant="body2"
                  sx={{
                    color: "#444",
                    fontSize:'15px',
                    marginTop:'20px'
                  }}
                >
                  orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
                </Typography>
              </Box>
              <Card sx={{ display: 'flex', boxShadow: 'none' }}>
                <Box>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <span><img src={`${process.env.REACT_APP_URL}images/about/1.png`} alt="" /></span>
                  </CardContent>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      Our Mission
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
              <Card sx={{ display: 'flex', boxShadow: 'none' }}>
                <Box>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <span><img src={`${process.env.REACT_APP_URL}images/about/2.png`} alt="" /></span>
                  </CardContent>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      Our Mission
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} className="missionImg">
              <Box sx={{ display: 'flex', justifyContent:'flex-end', boxShadow: 'none',position:'relative',zIndex:'1' }}>
                <Paper className='missionMid'>
                  <img src={`${process.env.REACT_APP_URL}images/mission/1.jpg`} alt="" />
                </Paper>
                <Paper className='missionTop'>
                  <img src={`${process.env.REACT_APP_URL}images/mission/2.jpg`} alt="" />
                </Paper>
                <Paper className='missionBtm'>
                  <img src={`${process.env.REACT_APP_URL}images/mission/3.jpg`} alt="" />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default AboutThree
