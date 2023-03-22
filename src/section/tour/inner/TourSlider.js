import React, { useState } from 'react';
import {
  Box,
  Paper,
  Rating,
  Stack,
  List,
  ListItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import parse from 'html-react-parser';
import { useEffect } from 'react';

const TourSlider = (props) => {
  const [tour, setTour] = useState('');
  const [setting, setSetting] = useState('');
  const [loader, setLoader] = useState(true);
  const options = {
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2000,
    animateOut: 'fadeOut',
    // loop: true,
    margin: 8,
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
  useEffect(() => {
    if (props.tour) {
      setTour(props.tour);
      setSetting(props.tour.settingDetails);
      setLoader(false);
    }
  }, [props])
  return (
    <>
      {loader ? '' :
        <OwlCarousel className='owl-theme tourPackageSlider' {...options}>
          {tour.get_realated ?
            <>
              {tour.get_realated.map((element, index) => {
                if (element.get_tour_by_realed !== null) {
                  let price = 0;
                  if (setting) {
                    const currentDate = new Date();
                    const discountStartDate = new Date(setting.discountStartDate);
                    const discountEndDate = new Date(setting.discountEndDate);
                    if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && setting.globalDiscount > element.get_tour_by_realed.discount) {
                      price = element.get_tour_by_realed.price - Number(((element.get_tour_by_realed.price * setting.globalDiscount) / 100).toFixed(2));
                    } else {
                      price = element.get_tour_by_realed.price - Number(((element.get_tour_by_realed.price * element.get_tour_by_realed.discount) / 100).toFixed(2));
                    }
                  } else {
                    price = element.get_tour_by_realed.price - Number(((element.get_tour_by_realed.price * element.get_tour_by_realed.discount) / 100).toFixed(2));
                  }
                  return (<div class='item'>
                    <Paper sx={{ boxShadow: "none", backgroundColor: 'transparent' }} className="popularToursSlider">
                      <div className="ptsWrapTop relative">
                        <img src={`${process.env.REACT_APP_HOST_IMAGE}image/tour/bannerThumb/${element.get_tour_by_realed.bannerThumb}`} alt="" />
                        {element.get_tour_by_realed.get_ribbon ? <span className={index % 2 === 0 ? 'newSpan bgGreen' : 'newSpan bgParple'}>{element.get_tour_by_realed.get_ribbon.name}</span> : ''}
                        <div className='dolerPp'>
                          {element.get_tour_by_realed.price === price ? '' : <h6>From <span>${element.get_tour_by_realed.price}</span></h6>}
                          <h5>USD {price}</h5>
                        </div>
                      </div>
                      <div className='ptsWrap'>
                        <h4><Link to={`/${element.get_tour_by_realed.get_destination.slug}/${element.get_tour_by_realed.slug}`}>{element.get_tour_by_realed.title}</Link></h4>
                        <div className='ptsInner'>
                          {parse(element.get_tour_by_realed.description).length > 0 ? parse(element.get_tour_by_realed.description)[0].props.children.slice(0, 165) : parse(element.get_tour_by_realed.description).props.children.slice(0, 165)}
                          <Box mt={1}>
                            <List component={Stack} direction="row" className='dudiAct'>
                              <ListItem disablePadding sx={{ pr: '0' }}>
                                <span><img src="../images/icon/duration.svg" alt="" /></span> {element.get_tour_by_realed.duration} days
                              </ListItem>
                              <ListItem disablePadding>
                                <span><img src="../images/icon/difficulty.svg" alt="" /></span> {element.get_tour_by_realed.get_difficulty.name}
                              </ListItem>
                              <ListItem disablePadding>
                                <span><img src="../images/icon/activity.svg" alt="" /></span>{element.get_tour_by_realed.get_activities.name}
                              </ListItem>
                            </List>
                          </Box>
                          <Box className='starRateMd'>
                            <ul className='d-flex align-items-center justify-content-between'>
                              <li>
                                <Stack spacing={1}>
                                  <Rating name="size-small" value={element.get_tour_by_realed.average_rating} defaultValue={0} size="small" readOnly precision={0.5} />
                                </Stack>
                              </li>
                              <li><span>5.0 &nbsp;</span>of <strong>&nbsp; {element.get_tour_by_realed.get_reviews.length} Reviews</strong></li>
                            </ul>
                          </Box>
                        </div>
                      </div>
                    </Paper>
                  </div>)
                }
              })}
            </> : ''}
        </OwlCarousel>
      }
    </>

  )
}

export default TourSlider
