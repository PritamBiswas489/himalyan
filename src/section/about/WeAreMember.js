import * as React from 'react';
import { Box, Paper,Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { widgetsApi } from '../../service/Widgets.service';

const WeAreMember = () => {
  const [data, setData] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const ServiceExcellence = {
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    smartSpeed: 2000,
    animateOut: 'fadeOut',
    // loop: true,
    margin: 20,
    nav: true,
    dots: false,
    navElement: 'div',
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  }

  React.useEffect(() => {
    getWeAreMember();
    setLoader(true);
  },[]);

  const getWeAreMember = async () => {
    const res = await widgetsApi.weAreMember();
    if (res.status === 200 && res.data.status === 200 && res.data.success === true) {
        await setData(res.data.data);
        setLoader(false);
    }
  }
  return (
    <>
      {loader ? '' :<Box sx={{ flexGrow: 1 }} className='weAreMember relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3} alignItems={'center'}>
            <Grid item xs={12}>
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none", textAlign: "center" }} className='sectionTitle'>
                <Typography variant="h6_df" >
                  Lorem Ipsum
                </Typography>
                <Typography variant="h2"  display="block" >
                  We are member
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} className="aboutSlider">
              <OwlCarousel className='owl-theme' {...ServiceExcellence}>
              {data.map((element, index) => (
                <div class='item'>
                  <Paper component="a" href="/" className="popularToursSlider"
                    sx={{
                      boxShadow: "none",
                      backgroundColor: 'transparent',
                      border: '#d7d7d7 1px solid',
                      borderRadius:'10px',
                      overflow:'hidden',
                      background:'#fff',
                    }} 
                  >
                    <img src={`${process.env.REACT_APP_HOST_IMAGE}image/weAreMember/${element.image}`} alt="" />
                  </Paper>
                </div>
              ))}
              </OwlCarousel>
            </Grid>
          </Grid>
        </Box>
      </Box>}
    </>
  )
}

export default WeAreMember





