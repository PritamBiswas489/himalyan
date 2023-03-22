import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Parallax } from 'react-parallax';

import Grid from '@mui/material/Unstable_Grid2';

const MainActivity = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='relati mainActivitySection'>
        <Parallax className='mainActivityParalax' bgImage={`${process.env.REACT_APP_URL}images/main-activity-bg.jpg`} bgImageAlt="" strength={200}>
          <Box sx={{ flexGrow: 1 }} className='ph-80'>
            <Grid container spacing={3} padding={3} alignItems={'center'}>
              <Grid item xs={12}>
                <Paper sx={{ backgroundColor: "transparent", boxShadow: "none", textAlign: "center" }} className='sectionTitle'>
                  <Typography variant="h6_df" >
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="h2" display="block" >
                    Main Activity
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="">
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{
                    boxShadow: "rgba(0,0,0,.3) 0 5px 20px -5px",
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: "16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon-2'><img src={`${process.env.REACT_APP_URL}images/about/icon-6.png`} alt="" /></span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                    }}
                  >
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="">
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{
                    boxShadow: "rgba(0,0,0,.3) 0 5px 20px -5px",
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: "16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon-2'><img src={`${process.env.REACT_APP_URL}images/about/icon-6.png`} alt="" /></span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                    }}
                  >
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="">
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{
                    boxShadow: "rgba(0,0,0,.3) 0 5px 20px -5px",
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: "16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon-2'><img src={`${process.env.REACT_APP_URL}images/about/icon-6.png`} alt="" /></span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                    }}
                  >
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="">
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{
                    boxShadow: "rgba(0,0,0,.3) 0 5px 20px -5px",
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: "16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon-2'><img src={`${process.env.REACT_APP_URL}images/about/icon-6.png`} alt="" /></span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                    }}
                  >
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="">
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{
                    boxShadow: "rgba(0,0,0,.3) 0 5px 20px -5px",
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: "16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon-2'><img src={`${process.env.REACT_APP_URL}images/about/icon-6.png`} alt="" /></span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                    }}
                  >
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="">
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{
                    boxShadow: "rgba(0,0,0,.3) 0 5px 20px -5px",
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: "16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon-2'><img src={`${process.env.REACT_APP_URL}images/about/icon-6.png`} alt="" /></span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                    }}
                  >
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Parallax>
      </Box>
    </>
  )
}

export default MainActivity
