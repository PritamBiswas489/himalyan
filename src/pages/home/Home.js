import { useState, useEffect } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import OurDestination from '../../section/home/OurDestination';
import Populartours from '../../section/home/Populartours';
import Ourwork from '../../section/home/Ourwork';
import Tourpackage from '../../section/home/Tourpackage';
import About from '../../section/home/About';
import BestSeller from '../../section/home/BestSeller';
import ClientSays from '../../section/home/ClientSays';
import { destinationApi } from '../../service/Destination.service';
import { tourApi } from '../../service/Tour.service';
import { reviewApi } from '../../service/Review.service';
import { pagesApi } from '../../service/Pages.service';
import { widgetsApi } from '../../service/Widgets.service';
import $ from 'jquery';

const Home = () => {
   
  const [loading, setLoading] = useState(false);
  const [destinationList, setDestinationList] = useState([]);
  const [popularTourList, setPopularTourList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [setting, setSetting] = useState('');
  const [home, setHome] = useState('');
  const [countdown, setCountdown] = useState('');
  const [tour, setTour] = useState([]);

  useEffect(() => {
    setTour([]);
    setLoading(true);
    getDestination();
    getPopularTour();
    getClientSay();
    getHomePage();
    getCountDown();
  }, []);

  // useEffect(() => {
  //   var logo_curtain = $('.logo-curtain'),
  //     logo_curtain_div = $('.logo-curtain div'),
  //     preload = $('.preload');

  //   logo_curtain.animate(
  //     {
  //       opacity: 1,
  //     },
  //     500,
  //     function () {
  //       logo_curtain_div.animate(
  //         {
  //           top: 0,
  //         },
  //         2000,
  //         function () {
  //           // preload.animate({
  //           // 	opacity: 0
  //           // }, 500, function () {
  //           // 	preload.css("visibility", "hidden");
  //           // });
  //         }
  //       );
  //     }
  //   );
  // }, []);

  const getHomePage = async () => {
    const homePage = await pagesApi.home();
    if (homePage.status === 200 && homePage.data.status === 200 && homePage.data.success === true) {
      await setHome(homePage.data.data);
      setLoading(false);
    }
  };

  const getDestination = async () => {
    const destination = await destinationApi.list();
    if (destination.status === 200 && destination.data.status === 200 && destination.data.success === true) {
      await setDestinationList(destination.data.data);
      // setLoading(false);
    }
  };

  const getPopularTour = async () => {
    const popularTour = await tourApi.popularTourList();
    if (popularTour.status === 200 && popularTour.data.status === 200 && popularTour.data.success === true) {
      await setPopularTourList(popularTour.data.data);
      await setSetting(popularTour.data.setting);
    }
  };

  const getClientSay = async () => {
    const clientSays = await reviewApi.list();
    if (clientSays.status === 200 && clientSays.data.status === 200 && clientSays.data.success === true) {
      await setReviewList(clientSays.data.data);
    }
  };

  const getCountDown = async () => {
    const countdown = await widgetsApi.countDown();
    if (countdown.status === 200 && countdown.data.status === 200 && countdown.data.success === true) {
      await setCountdown(countdown.data.data);
    }
  };

  const handleSearch = async (event) => {
    setTour([]);
    if (event.target.value) {
      const res = await tourApi.searchTour(event.target.value);
      if (res.status === 200 && res.data.status === 200 && res.data.success === true) {
        setTour(res.data.data);
      }
    }
  };
  return (
    <>
      {loading ? (
        ''
      ) : (
        <>
          {/* <div className="preload">
                        <div className="logo-container">
                        <img src="../images/loder-logo.png" alt="" className="logo" />
                        <div className="logo-curtain">
                            <div />
                        </div>
                        </div>
                    </div> */}
          {/* {`${process.env.REACT_APP_HOST_IMAGE}image/tour/bannerThumb/${element.tour_details.bannerThumb}`} */}
          <Box
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            className='homeBanner'
            sx={{ flexGrow: 1 }}
            style={{
              background: `url(${process.env.REACT_APP_HOST_IMAGE}image/homePage/banner/${home?.bannerImage}) top center no-repeat`,
            }}
          >
            <div className='banSlogan'>
              <h1>{home?.bannerTitle}</h1>
              <div className='banSrc relative'>
                <Autocomplete
                  id='free-solo-2-demo'
                  freeSolo
                  disableClearable
                  options={tour.map((option) => {
                    return `${option.title}${option.get_region ? ', ' + option.get_region.name : ''}`;
                  })}
                  filterOptions={(options) => options}
                  onChange={(event: any, option: any) => {
                    let result = tour.filter((e) => e.title === option.split(',')[0])
                    window.location.href = result[0].get_destination.slug + '/' + result[0].slug;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={home?.bannerSearchText}
                      onChange={handleSearch}
                      className="banSrcInput"
                    />
                  )}
                />
              </div>
            </div>
          </Box>
          <OurDestination destination={destinationList} home={home} countdown={countdown} />
          <Populartours popularTour={popularTourList} setting={setting} home={home} />
          <Ourwork home={home} />
          <Tourpackage setting={setting} home={home} />
          <About home={home} />
          <BestSeller setting={setting} home={home} />
          <ClientSays review={reviewList} home={home} />
        </>
      )}
    </>
  );
};

export default Home;
