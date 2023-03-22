import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Unstable_Grid2';
import { widgetsApi } from '../../service/Widgets.service';
import parse from 'html-react-parser';

const OurDestination = (props) => {
    const [countdown, setCountdown] = useState('');
    useEffect(() => {
        getCountDown();
      },[]);
      const getCountDown = async () => {
        const countdown = await widgetsApi.countDown();
        if (countdown.status === 200 && countdown.data.status === 200 && countdown.data.success === true) {
          await setCountdown(countdown.data.data);
        }
      }
    return (
        <>
            <Box className={`destinationsection ph-80 ${props.myMargin && `mt-${props.myMargin}`}`}>
                <Grid padding={3}>
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={3}>
                        <Grid container sm={12} md={6}>
                          {props.destination ? (
                            <>
                              {Object.keys(props.destination).map((element, index) => (
                                <Grid key={index} xs={6} className={`${index % 2 === 0 ? 'mt-L20' : ''}`}>
                                    <Paper
                                        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                                        component='a'
                                        href={`destination/${props.destination[element].slug}`}
                                        className='destinationBox relative'
                                    >
                                        <img src={`${process.env.REACT_APP_HOST_IMAGE}image/destination/${props.destination[element]?.image}`} alt='' />
                                        <div className='destinationBoxInner'>
                                            <h4>
                                                {props.destination[element].name}
                                                <span>
                                                    <small>{props.destination[element].get_tour.length} Tours</small>
                                                </span>
                                            </h4>
                                            <div className='dbiHide'>
                                                <h5>{props.destination[element].content !== null ? props.destination[element].content.main_title:''}</h5>
                                                {props.destination[element].content !== null && props.destination[element].content.main_description ? 
                                                <>
                                                  {parse(props.destination[element].content.main_description).length > 0 ? parse(props.destination[element].content.main_description)[0].props.children.slice(0,123) : parse(props.destination[element].content.main_description).props.children.slice(0,123)}
                                                </>
                                                :''}
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                              ))}
                            </>
                          ) : ''}
                        </Grid>
                        <Grid sm={12} md={6}>
                            <Paper
                                sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                                className='destinationRight relative'
                            >
                                <h5>{props?.content?.content?.main_title}</h5>
                                <h2>{props?.content?.content?.main_sub_title}</h2>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: props?.content?.content?.content,
                                    }}
                                ></p>
                                <div className='destinationNumber'>
                                    <ul className='d-flex justify-content-between'>
                                        <li>
                                            <span>{countdown.iconicDestination !== null?countdown.iconicDestination:0}</span>Iconic Destination
                                        </li>
                                        <li>
                                            <span>{countdown.uniqueAdventure !== null?countdown.uniqueAdventure:0}</span>Unique Adventure
                                        </li>
                                        <li>
                                            <span>{countdown.travellingExperience !== null?countdown.travellingExperience :0}</span>Travelling Experience
                                        </li>
                                    </ul>
                                </div>
                                <span className='pattern-1'>
                                    <img src='../images/pattren.png' alt='' />
                                </span>
                                <span className='pattern-2'>
                                    <img src='../images/pattren.png' alt='' />
                                </span>
                                <span className='pattern-3'>
                                    <img src='../images/pattren.png' alt='' />
                                </span>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default OurDestination;
