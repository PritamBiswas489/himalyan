import * as React from 'react';
import { Box, Paper, Rating, Stack, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import parse from 'html-react-parser';

const TourSlider = (props) => {
  const [home, setHome] = React.useState('');
  const [loader, setLoader] = React.useState(true);
  const options = {
    // autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2000,
    animateOut: 'fadeOut',
    loop: true,
    margin: 6,
    nav: true,
    dots: false,
    navElement: 'div',
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  }
  React.useEffect(() => {

    if (props.home) {
      setHome(props.home);
      setLoader(false);
    }
  }, [props]);
  return (
    <>
      {loader ? '' : (
        <OwlCarousel className='owl-theme' {...options}>
          {home && home.get_related_tour ? (
            <>
              {home.get_related_tour.map((element, index) => {
                if (element.tour_details) {
                  let price = 0;
                  if (props.setting) {
                    const currentDate = new Date();
                    const discountStartDate = new Date(props.setting.discountStartDate);
                    const discountEndDate = new Date(props.setting.discountEndDate);
                    if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && props.setting.globalDiscount > element.tour_details.discount) {
                      console.log('if');
                      price = element.tour_details.price - Number(((element.tour_details.price * props.setting.globalDiscount) / 100).toFixed(2));
                    } else {
                      price = element.tour_details.price - Number(((element.tour_details.price * element.tour_details.discount) / 100).toFixed(2));
                    }
                  } else {
                    price = element.tour_details.price - Number(((element.tour_details.price * element.tour_details.discount) / 100).toFixed(2));
                  }
                  return (
                    <div class='item' key={index}>
                      <Paper sx={{ boxShadow: "none", backgroundColor: 'transparent' }} className="popularToursSlider">
                        <div className="ptsWrapTop relative">
                          <img src={`${process.env.REACT_APP_HOST_IMAGE}image/tour/bannerThumb/${element.tour_details.bannerThumb}`} alt={element.tour_details.bannerThumb} />
                          {element.tour_details.get_ribbon ? <span className={index % 2 === 0 ? 'newSpan bgGreen' : 'newSpan bgParple'}>{element.tour_details.get_ribbon.name}</span> : ''}
                          <div className='dolerPp'>

                            {element.tour_details.price === price || element.tour_details.price === null ? <h6>From</h6> : <h6>From <span>${element.tour_details.price}</span></h6>}
                            <h5>USD {price}</h5>
                          </div>
                        </div>
                        <div className='ptsWrap'>
                          <h4><Link to={`/${element.tour_details.get_destination.slug}/${element.tour_details.slug}`}>{element.tour_details.title}</Link></h4>
                          <div className='ptsInner'>
                            {parse(element.tour_details.description).length > 0 ? parse(element.tour_details.description)[0].props.children.slice(0, 165) : parse(element.tour_details.description).props.children.slice(0, 165)}
                            <Box mt={1}>
                              <List component={Stack} direction="row" className='dudiAct'>
                                <ListItem disablePadding sx={{ pr: '0' }}>
                                  <span><img src="../images/icon/duration.svg" alt="" /></span> {element.tour_details.duration} {element.tour_details.duration > 1 ? 'days' : 'day'}
                                </ListItem>
                                <ListItem disablePadding>
                                  <span><img src="../images/icon/difficulty.svg" alt="" /></span> {element.tour_details.get_difficulty.name}
                                </ListItem>
                                <ListItem disablePadding>
                                  <span><img src="../images/icon/activity.svg" alt="" /></span>{element.tour_details.get_activities.name}
                                </ListItem>
                              </List>
                            </Box>
                            <Box className='starRateMd'>
                              <ul className='d-flex align-items-center justify-content-between'>
                                <li>
                                  <Stack spacing={1}>
                                    <Rating defaultValue={0} value={element.tour_details.average_rating === null ? 0 : element.tour_details.average_rating} size="small" readOnly precision={0.5} />
                                  </Stack>
                                </li>
                                <li><span>5.0 &nbsp;</span>of <strong>&nbsp;{element.tour_details.get_review.length} Reviews</strong></li>
                              </ul>

                              {/* <List component={Stack} direction="row">
                                <ListItem disablePadding sx={{ padding: '0', margin: '0' }}>
                                  <Stack spacing={1}>
                                    <Rating defaultValue={0} value={element.tour_details.average_rating === null ? 0 : element.tour_details.average_rating} size="small" readOnly precision={0.5} />
                                  </Stack>
                                </ListItem>
                                <ListItem disablePadding>
                                  <span>5.0 &nbsp;</span>of <strong>&nbsp;{element.tour_details.get_review.length} Reviews</strong>
                                </ListItem>
                              </List> */}
                            </Box>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  )
                }
              })}
            </>
          ) : ''}
        </OwlCarousel>
      )}

    </>
  )
}

export default TourSlider
