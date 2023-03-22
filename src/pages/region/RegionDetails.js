import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import AboutSecTwo from '../../section/region/AboutSecTwo';
import Filter from '../../section/region/Filter';
import { destinationApi } from '../../service/Destination.service';
// import { activityApi } from '../../service/Activity.service';
import parse from 'html-react-parser';
import { GiWalk } from "react-icons/gi";
import { regionApi } from '../../service/Region.service';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#fb5d36'),
  backgroundColor: '#f97150',
  borderRadius: 30,
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 10,
  paddingBottom: 10,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#d04726',
  },
}));

const RegionDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState('');
  const [regionContent, setRegionContent] = useState('');
  const [destinationList, setDestinationList] = useState([]);
  const [difficultyList, setDifficultyList] = useState([]);

  useEffect(() => {
    setLoading(true);
    getRegion();
    getRegionContect();
  },[params]);

  const getRegion = async () => {
    const region = await regionApi.regionBySlug(params.slug);
    if (region.status === 200 && region.data.status === 200 && region.data.success === true) {
      await setRegion(region.data.data);
      const destination = await destinationApi.list();
      if (destination.status === 200 && destination.data.status === 200 && destination.data.success === true) {
        await setDestinationList(destination.data.data);
        getDifficulty();
      }
    }
  }

  const getDifficulty = async () => {
    const difficulty = await destinationApi.difficultyList();
    if (difficulty.status === 200 && difficulty.data.status === 200 && difficulty.data.success === true) {
      await setDifficultyList(difficulty.data.data);
      setLoading(false);
    }
  }

  const getRegionContect = async () => {
    const res = await regionApi.regionContentService();
    if (res.status === 200 && res.data.status === 200) {
      await setRegionContent(res.data.data);
    }
  }

  return (
    <>
    {loading ? '' : (
      <>
        <Box className='aboutBan relative'>
          <Parallax bgImage={`${process.env.REACT_APP_HOST_IMAGE}image/region/banner/${region.regionImage}`} bgImageAlt="" strength={100}>
            <Box sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              height: '600px',
              maxWidth: '1170px',
              width: '100%',
              margin: '0 auto',
              position: 'relative'
            }}
              className='aboutBanSlogan relative ph-80'
            >
              <Grid container spacing={0} padding={3} alignItems={"center"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width:'100%',
                }}
              >
                <Grid item xs={12} md={8}>
                  <Typography variant="h2"
                    sx={{
                      fontSize: "50px",
                      fontWeight: 'bold',
                      color: '#f97150',
                    }}
                  >
                    {region.name}
                  </Typography>
                  <Typography variant="body2"
                    sx={{
                      color: "#fff",
                      fontSize: '15px',
                    }}
                  >
                    {parse(region.description).length > 0 ? parse(region.description)[0].props.children.slice(0, 250):parse(region.description).props.children.slice(0, 150)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} display={'flex'} justifyContent={'flex-end'}>
                  <ColorButton variant="contained" className="LearnMoreBtn">Contact Us</ColorButton>
                </Grid>
              </Grid>
            </Box>
          </Parallax>
          <span className='banIcon'><GiWalk /></span>
        </Box>
        <AboutSecTwo region={region} />
        <Filter region={region} destination={destinationList} difficulty={difficultyList} />
      </>
    )}
    </>
  )
}

export default RegionDetails;