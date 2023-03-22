import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import { activityApi } from '../../service/Activity.service';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


const Ourwork = (props) => {
  const [activityList, setActivityList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivity();
  }, []);

  const getActivity = async () => {
    const listActivity = await activityApi.listActivity();
    if (listActivity.status === 200 && listActivity.data.status === 200 && listActivity.data.success === true) {
      await setActivityList(listActivity.data.data);
      await setLoading(false);
    }
  }

  return (
    <>
      {loading ? '' : (
        <Box className='ourWork relative'>
          <Parallax bgImage="../images/our-work.jpg" bgImageAlt="" strength={200}>
            <Box sx={{ flexGrow: 1 }} className='ourWorkInner'>
              <Grid container spacing={3} padding={3}>
                <Grid item xs={12}>
                  <Paper sx={{ backgroundColor: "transparent", boxShadow: "none", textAlign: "center" }} className='sectionTitle'>
                    <h5>{props.home?.activityTitle}</h5>
                    <h2>{props.home?.activitySubTitle}</h2>
                  </Paper>
                </Grid>
                {activityList.map((element, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Paper sx={{ backgroundColor: "transparent", textAlign: "center", borderRadius: '10' }} component="a" href={`${process.env.REACT_APP_URL}activity/${element.slug}`} className="ourWorkBox">
                      <span><img src={`${process.env.REACT_APP_HOST_IMAGE}image/activities/icon/${element.icon}`} alt={element.icon} /></span>
                      <h3>{element.name}</h3>
                      <small>{element.get_tour.length} Tours</small>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Parallax>
        </Box>
      )}
    </>
  )
}

export default Ourwork
