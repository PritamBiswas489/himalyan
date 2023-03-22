// import * as React from 'react';
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';

import { Box, Paper, Typography, Stack, Avatar } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import Button from '@mui/material/Button';

import { Bloodtype } from '@mui/icons-material';

import AboutSecTwo from '../../section/about/AboutSecTwo';
import Counter from '../../section/about/Counter';
import AboutThree from '../../section/about/AboutThree';
import ServiceExcellence from '../../section/about/ServiceExcellence';
import MainActivity from '../../section/about/MainActivity';
import WhatClientSay from '../../section/about/WhatClientSay';
import WeAreMember from '../../section/about/WeAreMember';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#fb5d36'),
  backgroundColor: '#f97150',
  borderRadius: 30,
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 10,
  paddingBottom: 10,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#d04726',
  },
}));

const About = () => {
  return (
    <>
      <Box className='aboutBan relative'>
        <Parallax bgImage="../images/about/about-ban.jpg" bgImageAlt="" strength={100}>
          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            height: '600px',
            maxWidth: '1170px',
            width: '100%',
            margin: '0 auto',
          }} className='aboutBanSlogan relative ph-80'
          >
            <Grid container spacing={0} padding={3} alignItems={"center"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: '100%',
              }}
            >
              <Grid item xs={12} md={8}>
                <Typography variant="h2"
                  sx={{
                    fontSize: "50px",
                    fontWeight: 'bold',
                    padding: '0',
                    color: '#f97150',
                  }}
                >
                  About Us
                </Typography>
                <Typography variant="body2"
                  sx={{
                    color: "#fff",
                    fontSize: '15px',
                  }}
                >
                  orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
                </Typography>
              </Grid>

              <Grid item xs={12} md={4} display={'flex'} justifyContent={'flex-end'}>
                <ColorButton variant="contained" className="LearnMoreBtn">Contact Us</ColorButton>
              </Grid>
            </Grid>
          </Box>
        </Parallax>
      </Box>
      <AboutSecTwo />
      <Counter />
      <AboutThree />
      <ServiceExcellence />
      <MainActivity />
      <WhatClientSay />
      <WeAreMember />
    </>
  )
}

export default About
