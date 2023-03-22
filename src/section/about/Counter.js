import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';

import { Box, Typography, Card,CardContent} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CountUp from 'react-countup';
import $ from 'jquery'

const Counter = () => {
    useEffect(() => {
      var a = 0;
      $(window).scroll(function () {
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
          $('.counter-value').each(function () {
            var $this = $(this),
              countTo = $this.attr('data-count');
            $({
              countNum: $this.text()
            }).animate({
              countNum: countTo
            },
              {
                duration: 2000,
                easing: 'swing',
                step: function () {
                  $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                  $this.text(this.countNum);
                  //alert('finished');
                }
              });
          });
          a = 1;
        }
      });
    });
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='counterSection relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3} alignItems={'center'} id="counter">
            <Grid item xs={12} sm={6} md={3}>
              <Card className='counterCard' sx={{
                maxWidth:"225px"
              }}>
                <CardContent sx={{
                  textAlign:"center",
                  
                }}>
                  <Typography variant="h2_aboutus">
                    <span className="counter-value" data-count={45}>0</span>
                  </Typography>
                  <Typography sx={{
                    fontSize: 18,
                    fontWeight:"bold",
                    textTransform:"uppercase",
                    color:'#444444'
                    }}  gutterBottom>
                  Iconic<br/>Destination
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Card className='counterCard' sx={{
                maxWidth:"225px"
              }}>
                <CardContent sx={{
                  textAlign:"center",
                }}>
                  <Typography variant="h2_aboutus">
                    <span className="counter-value" data-count={18}>0</span>
                  </Typography>
                  <Typography sx={{
                    fontSize: 18,
                    fontWeight:"bold",
                    textTransform:"uppercase",
                    color:'#444444'
                    }} gutterBottom>
                    Unique<br/>Adventure
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Card className='counterCard' sx={{
                maxWidth:"225px"
              }}>
                <CardContent sx={{
                  textAlign:"center",
                }}>
                  <Typography variant="h2_aboutus">
                    <span className="counter-value" data-count={25}>0</span><span>+</span>
                  </Typography>
                  <Typography sx={{
                    fontSize: 18,
                    fontWeight:"bold",
                    textTransform:"uppercase",
                    color:'#444444'
                    }} gutterBottom>
                    Travelling<br/>Experience
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Card className='counterCard' sx={{
                maxWidth:"225px"
              }}>
                <CardContent sx={{
                  textAlign:"center",
                }}>
                  <Typography variant="h2_aboutus">
                    <span className="counter-value" data-count={50}>0</span><span>+</span>
                  </Typography>
                  <Typography sx={{
                    fontSize: 18,
                    fontWeight:"bold",
                    textTransform:"uppercase",
                    color:'#444444'
                    }} gutterBottom>
                    working<br/>menmber
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box className='waveAnimation'>
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style type="text/css" dangerouslySetInnerHTML={{__html: "\n            .wave {\n              animation: wave 8s linear infinite;\n            }\n      \n            .wave1 {\n              animation: wave1 10s linear infinite;\n            }\n      \n            .wave2 {\n              animation: wave2 12s linear infinite;\n            }\n      \n            @keyframes wave {\n              0% {\n                transform: translateX(0%);\n              }\n      \n              100% {\n                transform: translateX(100%);\n              }\n            }\n      \n            @keyframes wave1 {\n              0% {\n                transform: scaleY(1.2) translateX(0%);\n              }\n      \n              100% {\n                transform: scaleY(1.2) translateX(100%);\n              }\n            }\n      \n            @keyframes wave2 {\n              0% {\n                transform: scaleY(.8) translateX(0%);\n              }\n      \n              100% {\n                transform: scaleY(.8) translateX(100%);\n              }\n            }\n          " }} />
              <path id="sineWave" fill="#000" fillOpacity="0.1" d="M0,160 C320,300,420,300,740,160 C1060,20,1120,20,1440,160 V0 H0" />
            </defs>
            <use className="wave" href="#sineWave" />
            <use className="wave" x="-100%" href="#sineWave" />
            <use className="wave1" href="#sineWave" />
            <use className="wave1" x="-100%" href="#sineWave" />
            <use className="wave2" href="#sineWave" />
            <use className="wave2" x="-100%" href="#sineWave" />
          </svg>
        </Box>
      </Box>
    </>
  )
}

export default Counter
