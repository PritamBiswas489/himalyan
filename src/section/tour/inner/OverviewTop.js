import React, { useState } from 'react';
import { Box, Card, Paper, Typography } from '@mui/material';
import ParaglidingOutlinedIcon from '@mui/icons-material/ParaglidingOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import {
  Block,
  Info as InfoIcon,

} from '@mui/icons-material';
import { Link } from 'react-router-dom';



const OverviewTop = (props) => {
  const [tour, setTour] = useState(props.tour);

  return (
    <>
      <Card sx={{
        width: '100%',
        display: 'flex',
        boxShadow: 'none',
        border: '#ddd 1px solid',
      }}>
        <Box
          sx={{
            maxWidth: '200px',
            flex: '0 0 200px',
            borderRight: '#ddd 1px solid'
          }}
        >
          <Paper elevation={0}
            sx={{
              borderBottom: '1px solid #ddd',
              padding: '30px 20px',
              textAlign: 'center',
            }}
          >
            <WatchLaterOutlinedIcon
              style={{
                color: "#fa8a6f",
                fontSize: '50px'
              }}
            />
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '16px',
                marginTop: '10px',
                fontFamily: 'Montserrat',
              }}
            >
              {tour.duration} Days
            </Typography>
          </Paper>
          <Paper elevation={0}
            sx={{

              textAlign: 'center',
              width: '100%',
              display: 'block',
              borderBottom: '1px solid #ddd',
              background: '#f6f6f6',
              fontWeight: 'bold',
              '&:hover': {
                color: '#000',
                backgroundColor: 'white',
              },
            }}>
            <Link to={`/activity${tour.get_activities ? '/' + tour.get_activities.slug : ''}`}
              style={{
                padding: '30px 20px',
                display: 'Block',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              <ParaglidingOutlinedIcon
                style={{
                  color: "#fa8a6f",
                  fontSize: '50px'
                }}
              />
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginTop: '10px',
                  fontFamily: 'Montserrat',
                }}
              >{tour.get_activities ? tour.get_activities.name : ''}</Typography>
            </Link>
          </Paper>
          <Paper elevation={0}
            sx={{
              textAlign: 'center',
              width: '100%',
              display: 'block',
              background: '#f6f6f6',
              '&:hover': {
                color: '#000',
                backgroundColor: 'white',
              },
            }}>
            <Link to={`/destination${tour.get_destination ? '/' + tour.get_destination.slug : ''}`}
              style={{
                padding: '30px 20px',
                display: 'Block',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              <PlaceOutlinedIcon
                style={{
                  color: "#fa8a6f",
                  fontSize: '50px',
                }} />
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginTop: '10px',
                  fontFamily: 'Montserrat',
                }}
              >{tour.get_destination ? tour.get_destination.name : ''}</Typography>
            </Link>
          </Paper>
        </Box>
        <Box flexGrow={1} >
          <Grid container padding={3} spacing={{ xs: 3, md: 4.1 }}>
            {tour.get_difficulty ? (
              <Grid xs={12} md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '60px' }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="../images/overview/1.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box flexGrow={1} pl={2}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#f97150',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Trip Grade
                    <Tooltip title={tour.trip_grade_tool_tip} placement="top">
                      <Button sx={{
                        padding: '0',
                        minWidth: 'auto',
                        marginLeft: '10px',
                        color: '#444444',
                      }}><InfoIcon /></Button>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle2" p={0}
                    sx={{
                      fontSize: '14px',
                      color: '#444',
                      fontWeight: '600',
                      fontFamily: 'Montserrat',
                    }}
                  >{tour.get_difficulty.name}</Typography>
                </Box>
              </Grid>
            ) : ''}
            {tour.maxElevation ? (
              <Grid xs={12} md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '60px' }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="../images/overview/2.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box flexGrow={1} pl={2}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#f97150',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Max Altitude
                    <Tooltip title={tour.max_altitude_tool_tip} placement="top">
                      <Button sx={{
                        padding: '0',
                        minWidth: 'auto',
                        marginLeft: '10px',
                        color: '#444444',
                      }}><InfoIcon /></Button>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle2" p={0}
                    sx={{
                      fontSize: '14px',
                      color: '#444',
                      fontWeight: '600',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {tour.maxElevation} meter
                  </Typography>
                </Box>
              </Grid>
            ) : ''}
            {tour.minParticipant ? (
              <Grid xs={12} md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '60px' }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="../images/overview/3.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box flexGrow={1} pl={2}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#f97150',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Group Size
                    <Tooltip title={tour.group_size_tool_tip} placement="top">
                      <Button sx={{
                        padding: '0',
                        minWidth: 'auto',
                        marginLeft: '10px',
                        color: '#444444',
                      }}><InfoIcon /></Button>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle2" p={0}
                    sx={{
                      fontSize: '14px',
                      color: '#444',
                      fontWeight: '600',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {`${tour.minParticipant} - ${tour.maxParticipant} person`}
                  </Typography>
                </Box>
              </Grid>
            ) : ''}
            {tour.get_itinerary ? (
              <Grid xs={12} md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '60px' }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="../images/overview/4.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box flexGrow={1} pl={2}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#f97150',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Meals
                    <Tooltip title={tour.meals_tool_tip} placement="top">
                      <Button sx={{
                        padding: '0',
                        minWidth: 'auto',
                        marginLeft: '10px',
                        color: '#444444',
                      }}><InfoIcon /></Button>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle2" p={0}
                    sx={{
                      fontSize: '14px',
                      color: '#444',
                      fontWeight: '600',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {`${tour.get_itinerary.filter(el => el.breackfast === 1).length}B ${tour.get_itinerary.filter(el => el.lunch === 1).length}L ${tour.get_itinerary.filter(el => el.dinner === 1).length}D`}
                  </Typography>
                </Box>
              </Grid>
            ) : ''}
            {tour.accommodation ? (
              <Grid xs={12} md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '60px' }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="../images/overview/5.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box flexGrow={1} pl={2}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#f97150',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Accomodation
                    <Tooltip title={tour.accomodation_tool_tip} placement="top">
                      <Button sx={{
                        padding: '0',
                        minWidth: 'auto',
                        marginLeft: '10px',
                        color: '#444444',

                      }}><InfoIcon /></Button>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle2" p={0}
                    sx={{
                      fontSize: '14px',
                      color: '#444',
                      fontWeight: '600',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {tour.accommodation}
                  </Typography>
                </Box>
              </Grid>
            ) : ''}
            {tour.distance ? (
              <Grid xs={12} md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '60px' }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="../images/overview/6.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box flexGrow={1} pl={2}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#f97150',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Distance
                    <Tooltip title={tour.distance_tool_tip} placement="top">
                      <Button sx={{
                        padding: '0',
                        minWidth: 'auto',
                        marginLeft: '10px',
                        color: '#444444',
                      }}><InfoIcon /></Button>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle2" p={0}
                    sx={{
                      fontSize: '14px',
                      color: '#444',
                      fontWeight: '600',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {tour.distance} meter
                  </Typography>
                </Box>
              </Grid>
            ) : ''}
            {tour.get_region ? (
              <Grid xs={12} md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '60px' }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="../images/overview/7.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box flexGrow={1} pl={2}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#f97150',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Region
                    <Tooltip title={tour.region_tool_tip} placement="top">
                      <Button sx={{
                        padding: '0',
                        minWidth: 'auto',
                        marginLeft: '10px',
                        color: '#444444',
                      }}><InfoIcon /></Button>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle2" p={0}
                    sx={{
                      fontSize: '14px',
                      color: '#444',
                      fontWeight: '600',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {tour.get_region.name}
                  </Typography>
                </Box>
              </Grid>
            ) : ''}
            {tour.bestMonth ? (
              <Grid xs={12} md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '60px' }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="../images/overview/8.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box flexGrow={1} pl={2}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#f97150',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Season
                    <Tooltip title={tour.season_tool_tip} placement="top">
                      <Button sx={{
                        padding: '0',
                        minWidth: 'auto',
                        marginLeft: '10px',
                        color: '#444444',
                      }}><InfoIcon /></Button>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle2" p={0}
                    sx={{
                      fontSize: '14px',
                      color: '#444',
                      fontWeight: '600',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {tour.bestMonth}
                  </Typography>
                </Box>
              </Grid>
            ) : ''}
            {tour.startEnd ? (
              <Grid xs={12} md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '60px' }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src="../images/overview/9.svg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box flexGrow={1} pl={2}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#f97150',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Start - End
                    <Tooltip title={tour.start_end_tool_tip} placement="top">
                      <Button sx={{
                        padding: '0',
                        minWidth: 'auto',
                        marginLeft: '10px',
                        color: '#444444',
                      }}><InfoIcon /></Button>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle2" p={0}
                    sx={{
                      fontSize: '14px',
                      color: '#444',
                      fontWeight: '600',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {tour.startEnd}
                  </Typography>
                </Box>
              </Grid>
            ) : ''}
          </Grid>
        </Box>
      </Card>
    </>
  )
}

export default OverviewTop
