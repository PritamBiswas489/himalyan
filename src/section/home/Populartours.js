import * as React from 'react';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

const Populartours = (props) => {
   
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='popularTours relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3}>
            <Grid item xs={12}>
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none", textAlign: "center" }} className='sectionTitle'>
                <h5>{props.home?.mostPopularTitle}</h5>
                <h2>{props.home?.mostPopularSubTitle}</h2>
              </Paper>
            </Grid>
            {props.popularTour ? <>
              {props.popularTour.map((element, index) => {
                let price = 0;
                if (props.setting) {
                  const currentDate = new Date();
                  const discountStartDate = new Date(props.setting.discountStartDate);
                  const discountEndDate = new Date(props.setting.discountEndDate);
                  if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && props.setting.globalDiscount > element.discount) {
                    price = element.price - Number(((element.price * props.setting.globalDiscount) / 100).toFixed(2));
                  } else {
                    price = element.price - Number(((element.price * element.discount) / 100).toFixed(2));
                  }
                } else {
                  price = element.price - Number(((element.price * element.discount) / 100).toFixed(2));
                }
                return (
                  <Grid item xs={6} md={3} key={index}>
                    <Paper sx={{ backgroundColor: "transparent", boxShadow: "none"}}  component="a" href="/" className="popularToursBox">
                      <img src={`${process.env.REACT_APP_HOST_IMAGE}image/tour/bannerThumb/${element.bannerThumb}`} alt={element.bannerThumb} />
                      <div className='ptbWrap'>
                        <h4>{element.title}</h4>
                        <div className='ptbInner'>
                        {/* {parse(element.description).length > 0 ? parse(element.description)[0].props.children.slice(0, 165):parse(element.description).props.children.slice(0, 165)} */}
                          <ul className='d-flex justify-content-between dudiAct'>
                            <li><span><img src={`${process.env.REACT_APP_URL}images/icon/duration.svg`} alt="" /></span> {element.duration} {element.duration > 1 ? 'days' : 'day'}</li>
                            <li><span><img src={`${process.env.REACT_APP_URL}images/icon/difficulty.svg`} alt="" /></span> {element.get_difficulty.name}</li>
                            <li><span><img src={`${process.env.REACT_APP_URL}images/icon/activity.svg`} alt="" /></span> {element.get_activities.name}</li>
                          </ul>
                        </div>
                        <div className='dolerPp'>
                          {element.price === price || element.price === null ? <h6>From</h6> : <h6>From <span>${element.price}</span></h6>}
                           
                          <h5>USD {price}</h5>
                        </div>
                        <Link to={"/"} className='enquiry'>Enquiry Now <ArrowForwardIcon /></Link>
                      </div>
                      {element.get_ribbon ? <span className={index % 2 === 0 ? 'newSpan bgGreen' : 'newSpan bgParple'}>{element.get_ribbon.name}</span> : ''}
                      <span className='transBgBlack'></span>
                    </Paper>
                  </Grid>
                )
              })}
            </>:''}
            
          </Grid>

        </Box>
        <Box className='waveAnimation'>
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n            .wave {\n              animation: wave 8s linear infinite;\n            }\n      \n            .wave1 {\n              animation: wave1 10s linear infinite;\n            }\n      \n            .wave2 {\n              animation: wave2 12s linear infinite;\n            }\n      \n            @keyframes wave {\n              0% {\n                transform: translateX(0%);\n              }\n      \n              100% {\n                transform: translateX(100%);\n              }\n            }\n      \n            @keyframes wave1 {\n              0% {\n                transform: scaleY(1.2) translateX(0%);\n              }\n      \n              100% {\n                transform: scaleY(1.2) translateX(100%);\n              }\n            }\n      \n            @keyframes wave2 {\n              0% {\n                transform: scaleY(.8) translateX(0%);\n              }\n      \n              100% {\n                transform: scaleY(.8) translateX(100%);\n              }\n            }\n          " }} />
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

export default Populartours