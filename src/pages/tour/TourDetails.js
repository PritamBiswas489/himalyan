import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Box, Typography, Stack, Rating, List, ListItem, Button, Modal } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import ReactPlayer from 'react-player';

import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Overview from '../../section/tour/Overview';
import OvrBoxOne from '../../section/tour/OvrBoxOne';
import TourpackageInner from '../../section/tour/TourpackageInner';
import { tourApi } from '../../service/Tour.service';

const TourDetails = () => {
    const params = useParams();
    const [tour, setTour] = useState();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const [modalOpen, setModalOpen] = useState(false);

    const [images, setImages] = useState([]);

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#fb5d36'),
        backgroundColor: '#f97150',
        borderRadius: 6,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        '&:hover': {
            backgroundColor: '#d04726',
        },
    }));

    const getTour = async (slug) => {
        const tourDetails = await tourApi.tourDetailsBySlug(slug);
        if (
            tourDetails.status === 200 &&
            tourDetails.data.status === 200 &&
            tourDetails.data.success === true &&
            Object.keys(tourDetails.data.data).length > 0
        ) {
            await setTour(tourDetails.data.data);
            setImages(
                tourDetails.data.data.get_gallery.map((val, i) => ({
                    src: `${process.env.REACT_APP_HOST_IMAGE}image/tour/gallery/${val.image}`,
                }))
            );
            await setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        getTour(params.slug);
    }, [params]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            {loading ? (
                ''
            ) : (
                <>
                    <Box className='itinerayBann relative'>
                        <Parallax
                            bgImage={`${process.env.REACT_APP_HOST_IMAGE}image/tour/banner/${tour.bannerImage}`}
                            bgImageAlt=''
                            strength={100}
                        >
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    height: '600px',
                                    maxWidth: '1170px',
                                    width: '100%',
                                    margin: '0 auto',
                                }}
                                className='aboutBanSlogan relative'
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    padding={3}
                                    alignItems={'center'}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        marginBottom: '60px',
                                    }}
                                >
                                    <Grid item xs={12} md={'auto'}>
                                        <Typography
                                            variant='h2_itBan'
                                            sx={{
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                padding: '0',
                                                color: '#f97150',
                                            }}
                                        >
                                            {tour.title}
                                        </Typography>
                                        <Box mt={1}>
                                            <List component={Stack} direction='row'>
                                                <ListItem disablePadding sx={{ width: 'auto', marginRight: '10px' }}>
                                                    <Stack spacing={1}>
                                                        <Rating
                                                            name='size-large'
                                                            value={tour.average_rating}
                                                            defaultValue={0}
                                                            size='large'
                                                            readOnly
                                                            precision={0.5}
                                                        />
                                                    </Stack>
                                                </ListItem>
                                                <ListItem disablePadding sx={{ color: '#fff', fontSize: '18px' }}>
                                                    <span style={{ marginRight: '5px' }}>5.0</span> of{' '}
                                                    <strong style={{ marginLeft: '5px' }}>
                                                        {' '}
                                                        {tour.get_reviews.length} Reviews
                                                    </strong>
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={'auto'}>
                                        <List sx={{ display: 'flex', width: '100%' }}>
                                            <ListItem disablePadding sx={{ width: 'auto', marginRight: '15px' }}>
                                                <ColorButton
                                                    variant='contained'
                                                    className='LearnMoreBtn'
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                    }}
                                                >
                                                    <PhotoSizeSelectActualOutlinedIcon sx={{ marginRight: '5px' }} />
                                                    View Photo
                                                </ColorButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ColorButton
                                                    variant='contained'
                                                    className='LearnMoreBtn'
                                                    onClick={() => {
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    <VideocamOutlinedIcon sx={{ marginRight: '5px' }} />
                                                    Video Preview
                                                </ColorButton>
                                            </ListItem>
                                        </List>
                                        <Lightbox open={isOpen} close={() => setIsOpen(false)} slides={images} />
                                        {tour.cancellation !== 'no' ? (
                                            <Typography sx={{ color: '#fff' }}>
                                                <CheckCircleIcon
                                                    sx={{
                                                        color: '#f97150',
                                                        position: 'relative',
                                                        top: '5px',
                                                    }}
                                                />
                                                Free Cancellation {tour.cancellation} Days before departure
                                            </Typography>
                                        ) : (
                                            ''
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Parallax>
                    </Box>
                    <Overview tour={tour} />
                    {/* <OvrBoxOne tour={tour}/> */}
                    <TourpackageInner tour={tour} />

                    <Modal
                        open={modalOpen}
                        onClose={() => {
                            setModalOpen(false);
                        }}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={style}>
                            <ReactPlayer url={tour?.video} controls={true} />
                        </Box>
                    </Modal>
                </>
            )}
        </>
    );
};

export default TourDetails;
