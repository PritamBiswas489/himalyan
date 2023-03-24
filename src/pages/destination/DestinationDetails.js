import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import AboutSecTwo from '../../section/destination/AboutSecTwo';
import OurDestination from '../../section/destination/OurDestination';
import DestinationTab from '../../section/destination/DestinationTab';
import Filter from '../../section/destination/destinationDetails/Filter';
import { destinationApi } from '../../service/Destination.service';

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

const DestinationDetails = () => {
     
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [destination, setDestination] = useState('');
    const [destinationList, setDestinationList] = useState([]);
    const [activityList, setActivityList] = useState([]);
    const [difficultyList, setDifficultyList] = useState([]);

    useEffect(() => {
        getDestination();
        getActivity();
        setLoading(false);
    }, [params]);

    const getDestination = async () => {
        const destinationBySlug = await destinationApi.destinationBySlug(params.slug);

        if (
            destinationBySlug.status === 200 &&
            destinationBySlug.data.status === 200 &&
            destinationBySlug.data.success === true
        ) {
            await setDestination(destinationBySlug.data.data);
            // const destination = await destinationApi.list();
            // if (destination.status === 200 && destination.data.status === 200 && destination.data.success === true) {
            //     await setDestinationList(destination.data.data);
                getDifficulty();
            // }
        }
    };

    const getDifficulty = async () => {
        const difficulty = await destinationApi.difficultyList();
        if (difficulty.status === 200 && difficulty.data.status === 200 && difficulty.data.success === true) {
            await setDifficultyList(difficulty.data.data);
            // await setLoading(false);
        }
    };

    const getActivity = async () => {
        const activity = await destinationApi.activityList();
        if (activity.status === 200 && activity.data.status === 200 && activity.data.success === true) {
            await setActivityList(activity.data.data);
            // setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                ''
            ) : (
                <>
                    <Box className='aboutBan relative'>
                        <Parallax
                            bgImage={`${process.env.REACT_APP_HOST_IMAGE}image/destination/${destination?.content?.banner_img}`}
                            bgImageAlt=''
                            strength={100}
                        >
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '600px',
                                    maxWidth: '1170px',
                                    width: '100%',
                                    margin: '0 auto',
                                }}
                                className='aboutBanSlogan relative ph-80'
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    padding={3}
                                    alignItems={'center'}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width:'100%'
                                    }}
                                >
                                    <Grid item xs={12} md={8}>
                                        <Typography
                                            variant='h2'
                                            sx={{
                                                fontSize: '50px',
                                                fontWeight: 'bold',
                                                color: '#f97150',
                                            }}
                                        >
                                            {destination?.content?.banner_title}
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            sx={{
                                                color: '#fff',
                                                fontSize: '15px',
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: destination?.content?.banner_description,
                                            }}
                                        ></Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} display={'flex'} justifyContent={'flex-end'}>
                                        <Link to={`/contact`} className='themeButton'>
                                            Contact Us
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Parallax>
                    </Box>
                    <AboutSecTwo destination={destination} />
                    <DestinationTab destination={destination} />
                    <Filter destinationDetails={destination} difficulty={difficultyList} activity={activityList} />
                </>
            )}
        </>
    );
};

export default DestinationDetails;
