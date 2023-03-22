import * as React from 'react';
import { Box, Paper, Typography, Rating, Stack, List, ListItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import TourSlider from './TourSlider';
import parse from 'html-react-parser';

const Tourpackage = (props) => {
  const [home, setHome] = React.useState('');
  const [loader, setLoader] = React.useState(true);
  const [bestSellingOnePrice, setBestSellingOnePrice] = React.useState('');
  const [bestSellingTwoPrice, setBestSellingTwoPrice] = React.useState('');
  React.useEffect(() => {
    if (props.home) {
      setHome(props.home);
      if (props.home.get_best_selling_one) {
        let price = 0;
        if (props.setting) {
          const currentDate = new Date();
          const discountStartDate = new Date(props.setting.discountStartDate);
          const discountEndDate = new Date(props.setting.discountEndDate);
          if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && props.setting.globalDiscount > props.home.get_best_selling_one.discount) {
            price = props.home.get_best_selling_one.price - Number(((props.home.get_best_selling_one.price * props.setting.globalDiscount) / 100).toFixed(2));
            setBestSellingOnePrice(price);
          } else {
            price = props.home.get_best_selling_one.price - Number(((props.home.get_best_selling_one.price * props.home.get_best_selling_one.discount) / 100).toFixed(2));
            setBestSellingOnePrice(price);
          }
        } else {
          price = props.home.get_best_selling_one.price - Number(((props.home.get_best_selling_one.price * props.home.get_best_selling_one.discount) / 100).toFixed(2));
          setBestSellingOnePrice(price);
        }
      }
      if (props.home.get_best_selling_two) {
        let price = 0;
        if (props.setting) {
          const currentDate = new Date();
          const discountStartDate = new Date(props.setting.discountStartDate);
          const discountEndDate = new Date(props.setting.discountEndDate);
          if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && props.setting.globalDiscount > props.home.get_best_selling_two.discount) {
            price = props.home.get_best_selling_two.price - Number(((props.home.get_best_selling_two.price * props.setting.globalDiscount) / 100).toFixed(2));
            setBestSellingTwoPrice(price);
          } else {
            price = props.home.get_best_selling_two.price - Number(((props.home.get_best_selling_two.price * props.home.get_best_selling_two.discount) / 100).toFixed(2));
            setBestSellingTwoPrice(price);
          }
        } else {
          price = props.home.get_best_selling_two.price - Number(((props.home.get_best_selling_two.price * props.home.get_best_selling_two.discount) / 100).toFixed(2));
          setBestSellingTwoPrice(price);
        }
      }
      setLoader(false);
    }
  }, [props])
  return (
    <>
      {loader ? '' : (
        <Box className='ourWork relative'>
          <Parallax bgImage="../images/tour-package.jpg" bgImageAlt="" strength={200}>
            <Box sx={{ flexGrow: 1 }} className='ourWorkInner'>
              <Grid container >
                <Grid item xs={12}>
                  <Box className='sectionTitle p-b-40'>
                    <h5>{props.home?.recommendedPackageTitle}</h5>
                    <h2>{props.home?.recommendedPackageSubTitle}</h2>
                    {props.home ? parse(props.home.recommendedPackagedescription) : ''}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} container spacing={3} padding={3}>
                  <Paper
                    sx={{
                      p: 0,
                      margin: 'auto',
                      flexGrow: 1,
                      borderRadius: 4,
                      position: 'relative',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                      boxShadow: 'none !important',
                    }}
                  >
                    <Grid container spacing={2} padding={0}>
                      <Grid item xs={12} sm={5}>
                        <div className='tourPacLeft' style={{ background: `url(${props.home.get_best_selling_one ? `${process.env.REACT_APP_HOST_IMAGE}image/tour/bannerThumb/${props.home.get_best_selling_one.bannerThumb}` : ''}) center center no-repeat` }}>
                          <div class="dolerPp">
                            {props.home.get_best_selling_one.price === bestSellingOnePrice || props.home.get_best_selling_one.price === null? <h6>From</h6> : <h6>From <span>${props.home.get_best_selling_one.price}</span></h6>}
                            <h5>USD {bestSellingOnePrice}</h5>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={7} container
                        sx={{
                          position: "relative"
                        }}
                      >
                        <Box
                          sx={{
                            padding: "50px 40px 60px 20px",
                            width: '100%',
                          }}
                        >
                          <Typography variant="subtitle1" className='batch'
                            sx={{
                              color: "#fff",
                            }} >Best Selling Package</Typography>
                          <Typography variant="h3_package" gutterBottom component="a" href="/"
                            sx={{
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >{props.home.get_best_selling_one?.title}</Typography>

                          <Box className='height-100'>
                            <Typography variant="body2" gutterBottom mt={1}>
                              {/* {props.home ? `${parse(props.home.get_best_selling_one.description).length > 0 ? parse(props.home.get_best_selling_one.description)[0].props.children.slice(0, 150) :parse(props.home.get_best_selling_one.description).props.children.slice(0, 150) }` : ''} */}
                              {props.home ?
                                <>
                                  {parse(props.home.get_best_selling_one.description).length > 0 ? parse(props.home.get_best_selling_one.description)[0].props.children.slice(0, 165) : parse(props.home.get_best_selling_one.description).props.children.slice(0, 165)}
                                </> : ''}
                            </Typography>
                          </Box>

                          <ul className='d-flex justify-content-between dudiAct'>
                            <li><span><img src="../images/icon/duration.svg" alt="" /></span>{props.home.get_best_selling_one?.duration} {props.home.get_best_selling_one?.duration > 1 ? 'days' : 'day'}</li>
                            <li><span><img src="../images/icon/difficulty.svg" alt="" /></span> {props.home.get_best_selling_one?.get_difficulty.name}</li>
                            <li><span><img src="../images/icon/activity.svg" alt="" /></span>{props.home.get_best_selling_one?.get_activities.name}</li>
                          </ul>
                          <Box mt={1} className='rateRevMd-1'>
                            <ul className='d-flex align-items-center justify-content-between'>
                              <li>
                                <Rating name="size-small" defaultValue={0} value={props.home.get_best_selling_one ? props.home.get_best_selling_one.average_rating : 0} size="small" readOnly precision={0.5} />
                              </li>
                              <li>
                                <span>5.0 &nbsp;</span>of <strong> &nbsp;{props.home.get_best_selling_one?.get_review.length} Reviews</strong>
                              </li>
                            </ul>
                            {/* <List component={Stack} direction="row">
                              <ListItem disablePadding sx={{ pr: '0' }}>
                                <Stack spacing={1}>
                                  
                                </Stack>
                              </ListItem>
                              <ListItem disablePadding>
                                
                              </ListItem>
                            </List> */}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={6} container spacing={3} padding={3}>
                  <Paper
                    sx={{
                      p: 0,
                      margin: 'auto',
                      flexGrow: 1,
                      borderRadius: 4,
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                      boxShadow: 'none !important',
                    }}
                  >
                    <Grid container spacing={2} padding={0}>
                      <Grid item xs={12} sm={5}>
                        <div className='tourPacLeft' style={{ background: `url(${props.home.get_best_selling_two ? `${process.env.REACT_APP_HOST_IMAGE}image/tour/bannerThumb/${props.home.get_best_selling_two.bannerThumb}` : ''}) center center no-repeat` }}>
                          <div class="dolerPp">
                            {props.home.get_best_selling_two.price === bestSellingTwoPrice || props.home.get_best_selling_two.price === null? <h6>From</h6> : <h6>From <span>${props.home.get_best_selling_two.price}</span></h6>}
                             
                            <h5>USD {bestSellingTwoPrice}</h5>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={7} container
                        sx={{
                          position: "relative"
                        }}
                      >
                        <Box
                          sx={{
                            padding: "50px 40px 60px 20px",
                            width: '100%',
                          }}
                        >
                          <Typography variant="subtitle1" className='batch'
                            sx={{
                              color: "#fff",
                            }} >Best Selling Package</Typography>
                          <Typography variant="h3_package" gutterBottom component="a" href="/"
                            sx={{
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >{props.home.get_best_selling_two?.title}</Typography>

                          <Box className='height-100'>

                            <Typography variant="body2" gutterBottom mt={1}>
                              {/* {props.home ? `${parse(props.home.get_best_selling_two.description).props.children.slice(0, 150)} ${parse(props.home.get_best_selling_two.description).props.children.length > 150 ? '...' : ''}` : ''} */}
                              {props.home ?
                                <>
                                  {parse(props.home.get_best_selling_two.description).length > 0 ? parse(props.home.get_best_selling_two.description)[0].props.children.slice(0, 165) : parse(props.home.get_best_selling_two.description).props.children.slice(0, 165)}
                                </> : ''}
                            </Typography>
                          </Box>

                          <ul className='d-flex justify-content-between dudiAct'>
                            <li><span><img src="../images/icon/duration.svg" alt="" /></span>{props.home.get_best_selling_two?.duration} {props.home.get_best_selling_two?.duration > 1 ? 'days' : 'day'}</li>
                            <li><span><img src="../images/icon/difficulty.svg" alt="" /></span> {props.home.get_best_selling_two?.get_difficulty.name}</li>
                            <li><span><img src="../images/icon/activity.svg" alt="" /></span>{props.home.get_best_selling_two?.get_activities.name}</li>
                          </ul>
                          <Box mt={1} className='rateRevMd-1'>
                            <ul className='d-flex align-items-center justify-content-between'>
                              <li>
                                <Rating name="size-small" defaultValue={0} value={props.home.get_best_selling_two ? props.home.get_best_selling_two.average_rating : 0} size="small" readOnly precision={0.5} />
                              </li>
                              <li>
                                <span>5.0 &nbsp;</span>of <strong> &nbsp;{props.home.get_best_selling_two?.get_review.length} Reviews</strong>
                              </li>
                            </ul>
                            {/* <List component={Stack} direction="row">
                              <ListItem disablePadding sx={{ pr: '0' }}>
                                <Stack spacing={1}>
                                 
                                </Stack>
                              </ListItem>
                              <ListItem disablePadding>
                                
                              </ListItem>
                            </List> */}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <TourSlider setting={props.setting} home={home} />
                </Grid>
              </Grid>
            </Box>
          </Parallax>
        </Box>
      )}

    </>
  )
}

export default Tourpackage
