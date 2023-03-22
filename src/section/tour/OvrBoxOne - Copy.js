import React, { useState } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import OverviewTop from './inner/OverviewTop';
import OverviewHighlight from './inner/OverviewHighlight';
import Itinerary from './inner/Itinerary';
import Costing from './inner/Costing';
import Map from './inner/Map';
import Gear from './inner/Gear';
import Faq from './inner/Faq';
import Support from './inner/Support';
import Reviews from './inner/Reviews';

import TopSeller from './inner/TopSeller';
import WhyBook from './inner/WhyBook';
import CustomerSupport from './inner/CustomerSupport';

const OvrBoxOne = (props) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, }} className=''>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3}>
            <Grid item xs={12} md={8}>
              <OverviewTop tour={props.tour} />
              <OverviewHighlight tour={props.tour} id='tab-1' />
              <Itinerary tour={props.tour} />
              <Costing tour={props.tour} />
              <Map tour={props.tour} />
              <Gear tour={props.tour} />
              <Faq tour={props.tour} />
              <Support tour={props.tour} />
              <Reviews tour={props.tour} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className='itineraryRight'>
                <TopSeller tour={props.tour} />
                <WhyBook />
                <CustomerSupport />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default OvrBoxOne
