import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, List, Stack, Badge, Typography, Card, Avatar, Rating } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { widgetsApi } from '../../service/Widgets.service';
import { reviewApi } from '../../service/Review.service';
import { fDateDMMMY } from '../../utils/formatTime';
import parse from 'html-react-parser';

const WhatClientSay = () => {
  const [data, setData] = useState('');
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    getWhatClientSay();
    getClientSay();
  }, []);

  const getWhatClientSay = async () => {
    const res = await widgetsApi.whatClientSay();
    if (res.status === 200 && res.data.status === 200 && res.data.success === true) {
      await setData(res.data.data);
    }
  }

  const getClientSay = async () => {
    const clientSays = await reviewApi.list();
    if (clientSays.status === 200 && clientSays.data.status === 200 && clientSays.data.success === true) {
      await setReviewList(clientSays.data.data);
    }
  }

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const ServiceExcellence = {
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    smartSpeed: 2000,
    animateOut: 'fadeOut',
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    navElement: 'div',
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      }
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='whatOurClientSay relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3} alignItems={'center'}>
            <Grid item xs={4} >
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none", textAlign: "center", padding: '50px' }} className='sectionTitle'>
                <Typography variant="h6_df" >
                  {data?.title}
                </Typography>
                <Typography variant="h2" display="block" >
                  {data?.subtitle}
                </Typography>
                <Typography variant="body2" display="block" >
                  {data ? parse(data.description) : ''}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={8} className="aboutSlider">
              <OwlCarousel className='owl-theme' {...ServiceExcellence}>
                {reviewList.map((element, index) => (
                  <div class='item'>
                    <Card sx={{ padding: "30px", borderRadius: "20px;" }} className='clientSayBox'>
                      <List component="div" sx={{ display: 'flex', alignItems: "center" }}>
                        <item>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          >
                            <Avatar alt="Travis Howard" src={`${process.env.REACT_APP_HOST_IMAGE}image/review/${element.image}`} sx={{ width: 84, height: 84 }} />
                          </Badge>
                        </item>
                        <item className="pl-15">
                          <Typography variant="h5"
                            sx={{
                              padding: "0",
                              fontFamily: "Inter",
                              fontSize: "20px",
                              color: "#003663",
                              fontWeight: "800"
                            }}
                          >
                            {element.name}
                          </Typography>

                          <Typography variant="caption" display="block"
                            sx={{
                              padding: "0",
                              fontFamily: "Inter",
                              fontSize: "13px",
                              color: "#acacac",
                              fontWeight: "600"
                            }}
                          >
                            {element.get_country.name}
                          </Typography>
                        </item>
                      </List>
                      <Typography variant="body2" color="text.secondary" sx={{ padding: 0, marginTop: 2 }}>
                        {parse(element.review)}
                      </Typography>

                      <List component="div" sx={{ display: 'flex', justifyContent: "space-between", marginTop: "20px" }}>
                        <item>
                          <Stack >
                            <Rating name="size-small" value={element.rating} defaultValue={0} size="small" readOnly precision={0.5} />
                          </Stack>
                        </item>
                        <item>
                          {fDateDMMMY(element.ratingDate)}
                        </item>
                      </List>
                    </Card>
                  </div>
                ))}
              </OwlCarousel>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default WhatClientSay
