import * as React from 'react';
// import {Box} from '@mui/material';
import { Parallax } from 'react-parallax';
import { Box, Paper, Stack, List, ListItem, Rating } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const BestSeller = (props) => {
  let price = 0;
  if (props.home.get_tour_of_the_month) {
    if (props.setting) {
      const currentDate = new Date();
      const discountStartDate = new Date(props.setting.discountStartDate);
      const discountEndDate = new Date(props.setting.discountEndDate);
      if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && props.setting.globalDiscount > props.home.get_tour_of_the_month.discount) {
        price = props.home.get_tour_of_the_month.price - Number(((props.home.get_tour_of_the_month.price * props.setting.globalDiscount) / 100).toFixed(2));
      } else {
        price = props.home.get_tour_of_the_month.price - Number(((props.home.get_tour_of_the_month.price * props.home.get_tour_of_the_month.discount) / 100).toFixed(2));
      }
    } else {
      price = props.home.get_tour_of_the_month.price - Number(((props.home.get_tour_of_the_month.price * props.home.get_tour_of_the_month.discount) / 100).toFixed(2));
    }
  }
  return (
    <>
      <Box className='sellerSection relative'>
        <Parallax className='sellerParalax' bgImage={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/tourOfTheMonth/${props.home?.tourOfTheMonthBannerImage}`} bgImageAlt="" strength={300}>
          <Box className='bestSellerLeft'>
            <span><img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/tourOfTheMonth/${props.home?.tourOfTheMonthLogo}`} alt="" /></span>
          </Box>
          <Box className='bestSellerRight'>
            <span>{props.home?.tourOfTheMonthText}</span>
          </Box>
        </Parallax>
      </Box>
      <Box sx={{ flexGrow: 1 }} className='bestSellerDescArea relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3} p={0} className='bestSellerRoundImg bsri-1'>
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }} component="div" className="bsrImgWrap">
                <img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/tourOfTheMonth/${props.home?.tourOfTheMonthTourImageOne}`} alt="" />
              </Paper>
            </Grid>
            <Grid item xs={4} p={0} className='bestSellerRoundImg bsri-2'>
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }} component="div" className="bsrImgWrap">
                <img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/tourOfTheMonth/${props.home?.tourOfTheMonthTourImageTwo}`} alt="" />
              </Paper>
            </Grid>
            <Grid item xs={3} p={0} className='bestSellerRoundImg bsri-3'>
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }} component="div" className="bsrImgWrap">
                <img src={`${process.env.REACT_APP_HOST_IMAGE}image/homePage/tourOfTheMonth/${props.home?.tourOfTheMonthTourImageThree}`} alt="" />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} className='bestSellerDescBtm relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3} display="flex" direction="column" justifyContent="center">
            <Grid xs={12} className='BestSellerRoundImg'>
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none", textAlign: "center", maxWidth: "880px", margin: "0 auto", color: "#3f3f3f" }} component="h2" className="">
                {props.home.get_tour_of_the_month?.title}
              </Paper>
            </Grid>
            <Grid item xs={12} container direction="row" justifyContent="center" className='ratingArea'>
              <List component={Stack} container direction="row" justifyContent="center" alignItems="center" >
                <ListItem sx={{ padding: "0 5px" }} >
                  <Stack >
                    <Rating name="size-small" defaultValue={0} value={props.home.get_tour_of_the_month ? props.home.get_tour_of_the_month.average_rating : 0} size="small" readOnly precision={0.5} />
                  </Stack>
                </ListItem>
                <ListItem sx={{ padding: "0 5px" }}>
                  <span>5.0 </span>of <strong>&nbsp;{props.home.get_tour_of_the_month?.get_review.length} Reviews</strong>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} mt={1} container direction="row" justifyContent="center" className='bestSellerActi'>
              <Box className='dudiAct'
                style={{
                  width: '100%',
                  maxWidth: '900px',
                }}
              >
                <ul className='d-flex align-items-center flex-wrap justify-content-center'>
                  <li><span><img src="../images/icon/duration.svg" alt="" /></span> {props.home.get_tour_of_the_month?.duration} {props.home.get_tour_of_the_month?.duration > 1 ? 'days' : 'day'}</li>
                  <li><span><img src="../images/icon/difficulty.svg" alt="" /></span> {props.home.get_tour_of_the_month?.get_difficulty.name}</li>
                  <li><span><img src="../images/icon/activity.svg" alt="" /></span>{props.home.get_tour_of_the_month?.get_activities.name}</li>
                </ul>
                {/* <List component={Stack} direction="row" >
                  <ListItem sx={{ fontWeight: "bold" }}>
                    <span><img src="../images/icon/duration.svg" alt="" /></span> {props.home.get_tour_of_the_month?.duration} {props.home.get_tour_of_the_month?.duration > 1 ? 'days' : 'day'}
                  </ListItem>
                  <ListItem sx={{ fontWeight: "bold" }}>
                    <span><img src="../images/icon/difficulty.svg" alt="" /></span> {props.home.get_tour_of_the_month?.get_difficulty.name}
                  </ListItem>
                  <ListItem sx={{ fontWeight: "bold" }}>
                    <span><img src="../images/icon/activity.svg" alt="" /></span>{props.home.get_tour_of_the_month?.get_activities.name}
                  </ListItem>
                </List> */}
              </Box>
            </Grid>
            <Grid item xs={12} mt={1} container direction="row" justifyContent="center" className='oldNewRate'>
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }} component="h4" className="">
                {props.home.get_tour_of_the_month && props.home.get_tour_of_the_month.price !== null ? <>
                  {props.home.get_tour_of_the_month && props.home.get_tour_of_the_month.price === price ? '' : <small>From ${props.home.get_tour_of_the_month?.price}</small>}</>:''}
                <span>USD {price}</span>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
export default BestSeller