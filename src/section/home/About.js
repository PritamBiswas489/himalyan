import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Stack, List, ListItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import parse from 'html-react-parser';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#fb5d36'),
  backgroundColor: '#f97150',
  borderRadius: 30,
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 10,
  paddingBottom: 10,
  fontWeight: "bold",
  '&:hover': {
    backgroundColor: '#d04726',
  },
}));

const About = (props) => {
  const options = {
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2000,
    animateOut: 'fadeOut',
    loop: false,
    margin: 20,
    nav: true,
    dots: false,
    navElement: 'div',
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 2
      }
    }
  }
  function chunkArrayInGroups(arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  }
  // console.log('type of = ', chunkArrayInGroups(props.home.get_featured_card, 2));
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='popularTours relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3}>
            <Grid item xs={12} md={6} className='aboutInner'>
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }} className="popularToursBox">
                <Typography variant="subtitle1"
                  sx={{
                    fontFamily: "Amertha PERSONAL USE ONLY",
                    color: "#f97150",
                    fontSize: "30px",
                    padding: "0",
                  }}
                >
                  {props.home?.aboutusTitle}
                </Typography>
                <Typography variant="h3_hoabout" gutterBottom >
                  {props.home?.aboutusSubTitle}
                </Typography>
                <Typography gutterBottom variant='body1' mt={1}
                  sx={{
                    fontFamily: "Inter"
                  }}
                >
                  {props.home ?
                    <>
                      {parse(props.home.aboutusDescription).length > 0 ? parse(props.home.aboutusDescription)[0].props.children.slice(0, 500) : parse(props.home.aboutusDescription).props.children.slice(0, 500)}
                    </> : ''}
                </Typography>
                <ColorButton variant="contained" className="LearnMoreBtn"
                  sx={{
                    marginTop: "30px",
                  }}
                >
                  {props.home?.aboutusButtonText} <ArrowForwardIcon />
                </ColorButton>
                <List component={Stack} direction="row" className='aboutIcons' sx={{ marginTop: "30px" }}>
                  <ListItem disablePadding sx={{ pr: '0' }}>
                    {props.home?.asRecommendedText}:
                  </ListItem>
                  <ListItem disablePadding>
                    <img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/recommendedImage/${props.home?.asRecommendedImageOne}`} alt="" />
                  </ListItem>
                  <ListItem disablePadding>
                    <img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/recommendedImage/${props.home?.asRecommendedImageTwo}`} alt="" />
                  </ListItem>
                  <ListItem disablePadding>
                    <img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/recommendedImage/${props.home?.asRecommendedImagethree}`} alt="" />
                  </ListItem>
                  <ListItem disablePadding>
                    <img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/recommendedImage/${props.home?.asRecommendedImageFour}`} alt="" />
                  </ListItem>
                  <ListItem disablePadding>
                    <img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/recommendedImage/${props.home?.asRecommendedImageFive}`} alt="" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} container>
              <OwlCarousel className='owl-theme aboutSlider' {...options}>
                {props.home.get_featured_card ? (
                  <>
                    {chunkArrayInGroups(props.home.get_featured_card, 2).map((_element, _index) => (
                      <>
                        <div class='item' key={_index}>
                          {_element.map((element, index) => (
                            <Paper className="aboutInnerBox" component="a"
                              sx={{
                                boxShadow: "none",
                                backgroundColor: '#fef1ee',
                                padding: 3,
                                borderRadius: "16px",
                              }}
                              onClick={() => window.open(element.link)}
                            >
                              <Typography >
                                <span className='roundIcon'><img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/featureCard/${element.icon}`} alt="" /></span>
                              </Typography>
                              <Typography variant="h4"
                                sx={{
                                  fontSize: "22px",
                                  fontWeight: "bold",
                                  fontFamily: "Inter",
                                }}
                              >
                                {element.name}
                              </Typography>
                              <Typography variant="body2">
                                {parse(element.description)}
                              </Typography>
                            </Paper>
                          ))}
                        </div>
                      </>
                    ))}
                    {/* {props.home.get_featured_card.map((element, index) => (
                    <>
                      <div class='item' key={index}>
                        <Paper className="aboutInnerBox" component="a" href="/"
                          sx={{ 
                            boxShadow:"none",
                            backgroundColor:'#fef1ee',
                            padding:3,
                            borderRadius:"16px",
                          }}
                        >
                          <Typography >
                            <span className='roundIcon'><img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/featureCard/${element.icon}`} alt="" /></span>
                          </Typography>
                          <Typography variant="h4"
                            sx={{
                              fontSize:"22px",
                              fontWeight:"bold",
                              fontFamily:"Inter",
                            }}
                          >
                            {element.name}
                          </Typography>
                          <Typography variant="body2">
                            {parse(element.description)}
                          </Typography>
                        </Paper>
                        <Paper className="aboutInnerBox pinkBg" component="a" href="/"
                          sx={{ 
                            boxShadow:"none",
                            backgroundColor:'#fef1ee',
                            padding:3,
                            borderRadius:"16px",
                          }}
                        >
                          <Typography >
                            <span className='roundIcon'><img src="../images/about/icon-5.png" alt="" /> </span>
                          </Typography>
                          <Typography variant="h4"
                            sx={{
                              fontSize:"22px",
                              fontWeight:"bold",
                              fontFamily:"Inter",
                            }}
                          >
                            h4. Heading
                          </Typography>
                          <Typography variant="body2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                          </Typography>
                        </Paper>
                      </div>
                    </>
                  ))} */}
                  </>
                ) : ''}
                {/* <div class='item'>
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{ 
                    boxShadow:"none",
                    backgroundColor:'#fef1ee',
                    padding:3,
                    borderRadius:"16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon'><img src="../images/about/icon-5.png" alt="" /></span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize:"22px",
                      fontWeight:"bold",
                      fontFamily:"Inter",
                    }}
                  >
                    h4. Heading
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                  </Typography>
                </Paper>
                <Paper className="aboutInnerBox pinkBg" component="a" href="/"
                  sx={{ 
                    boxShadow:"none",
                    backgroundColor:'#fef1ee',
                    padding:3,
                    borderRadius:"16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon'><img src="../images/about/icon-5.png" alt="" /> </span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize:"22px",
                      fontWeight:"bold",
                      fontFamily:"Inter",
                    }}
                  >
                    h4. Heading
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                  </Typography>
                </Paper>
              </div> */}
                {/* <div class='item'>
                <Paper className="aboutInnerBox pinkBg" component="a" href="/"
                  sx={{ 
                    boxShadow:"none",
                    backgroundColor:'#fef1ee',
                    padding:3,
                    borderRadius:"16px",
                  }} 
                >
                  <Typography >
                    <span className='roundIcon'><img src="../images/about/icon-5.png" alt="" /> </span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize:"22px",
                      fontWeight:"bold",
                      fontFamily:"Inter",
                    }}
                  >
                    h4. Heading
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                  </Typography>
                </Paper>
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{ 
                    boxShadow:"none",
                    backgroundColor:'#fef1ee',
                    padding:3,
                    borderRadius:"16px",
                  }} 
                >
                  <Typography >
                    <span className='roundIcon'><img src="../images/about/icon-5.png" alt="" /> </span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize:"22px",
                      fontWeight:"bold",
                      fontFamily:"Inter",
                    }}
                  >
                    h4. Heading
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                  </Typography>
                </Paper>
              </div> */}
                {/* <div class='item'>
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{ 
                    boxShadow:"none",
                    backgroundColor:'#fef1ee',
                    padding:3,
                    borderRadius:"16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon'><img src="../images/about/icon-5.png" alt="" /> </span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize:"22px",
                      fontWeight:"bold",
                      fontFamily:"Inter",
                    }}
                  >
                    h4. Heading
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                  </Typography>
                </Paper>
                <Paper className="aboutInnerBox pinkBg" component="a" href="/"
                  sx={{ 
                    boxShadow:"none",
                    backgroundColor:'#fef1ee',
                    padding:3,
                    borderRadius:"16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon'><img src="../images/about/icon-5.png" alt="" /> </span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize:"22px",
                      fontWeight:"bold",
                      fontFamily:"Inter",
                    }}
                  >
                    h4. Heading
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                  </Typography>
                </Paper>
              </div> */}
                {/* <div class='item'>
                <Paper className="aboutInnerBox pinkBg" component="a" href="/"
                  sx={{ 
                    boxShadow:"none",
                    backgroundColor:'#fef1ee',
                    padding:3,
                    borderRadius:"16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon'><img src="../images/about/icon-5.png" alt="" /> </span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize:"22px",
                      fontWeight:"bold",
                      fontFamily:"Inter",
                    }}
                  >
                    h4. Heading
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                  </Typography>
                </Paper>
                <Paper className="aboutInnerBox" component="a" href="/"
                  sx={{ 
                    boxShadow:"none",
                    backgroundColor:'#fef1ee',
                    padding:3,
                    borderRadius:"16px",
                  }}
                >
                  <Typography >
                    <span className='roundIcon'><img src="../images/about/icon-5.png" alt="" /> </span>
                  </Typography>
                  <Typography variant="h4"
                    sx={{
                      fontSize:"22px",
                      fontWeight:"bold",
                      fontFamily:"Inter",
                    }}
                  >
                    h4. Heading
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                  </Typography>
                </Paper>                  
              </div> */}
              </OwlCarousel>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default About