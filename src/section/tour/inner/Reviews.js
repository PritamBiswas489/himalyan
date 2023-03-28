import * as React from 'react';
import { styled } from '@mui/material/styles';

// import Rating from '@mui/material/Rating';
// import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

import {
  Box,
  Card,
  Typography,
  CardContent,
  Avatar,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  List,
  Badge,
  Rating,
} from '@mui/material';
import { ReviewsOutlined as ReviewsOutlinedIcon } from '@mui/icons-material';
import { RxCross2 } from 'react-icons/rx';

import { useTheme } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Stack } from '@mui/system';
import { reviewApi } from '../../../service/Review.service';
import { countryApi } from '../../../service/Country.service';
import { tourApi } from '../../../service/Tour.service';
import { fDateDMMMY } from '../../../utils/formatTime';
import parse from 'html-react-parser';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

// const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  padding: '0',
  boxShadow: 'none',
  backgroundColor: 'transparent',
}));


const labels = {
  0.5: '0.5',
  1: '1+',
  1.5: '1.5',
  2: '2+',
  2.5: '2.5',
  3: '3+',
  3.5: '3.5',
  4: '4+',
  4.5: '4.5',
  5: '5+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Reviews = () => {
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

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [reviewList, setReviewList] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [tours, setTours] = React.useState([]);

  React.useEffect(() => {
    getClientSay();
    getCountries();
    getTourList();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectCountry, setSelectCountry] = React.useState('');
  const [selectTour, setSelectTour] = React.useState('');

  const handleCountryChange = (event) => {
    setSelectCountry(event.target.value);
  };
  const handleTourChange = (event) => {
    alert(event.target.value);
    setSelectTour(event.target.value);
  }


  const getClientSay = async () => {
    const clientSays = await reviewApi.list();
    if (clientSays.status === 200 && clientSays.data.status === 200 && clientSays.data.success === true) {
      await setReviewList(clientSays.data.data);
    }
  }
  const getCountries = async () => {
    const countiesList = await countryApi.getCountries();
    if (countiesList.status === 200) {
      await setCountries(countiesList.data.data);
    }
  }
  const getTourList = async () => {
    const tourList = await tourApi.tourList();
    if (tourList.status === 200) {

      await setTours(tourList.data.data);
    }
  }




  return (
    <>
      <Card
        style={{
          marginTop: '30px',
          boxShadow: 'none',
          border: '#ddd 1px solid',
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '#ddd 1px solid',
              padding: '10px 0',
            }}
          >
            <Typography gutterBottom variant='h5' sx={{ padding: '10px 0' }}>
              <ReviewsOutlinedIcon
                style={{
                  color: '#fa8a6f',
                  fontSize: '40px',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  position: 'relative',
                  top: '-2px',
                  marginRight: '10px',
                }}
              />
              Reviews
            </Typography>
            <ColorButton variant='contained' className='LearnMoreBtn' onClick={handleClickOpen}>
              Add a review
            </ColorButton>
          </Box>
          <Box sx={{
            marginTop: '1rem'
          }}>
            {/* No Review */}
            <Masonry columns={{ xs: 1, sm: 2, md: 2, lg: 3, }} spacing={{ xs: 1, sm: 2, md: 2, lg: 3, }}>
              {reviewList.map((element, index) => (
                <Item key={index}>
                  <Card sx={{ padding: "15px", borderRadius: "20px;" }} className='clientSayBox'>
                    <List component="div" sx={{ display: 'flex', alignItems: "left" }} >
                      <item>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        // badgeContent={ <SmallAvatar alt="Remy Sharp" src="../images/avatar/1.jpg" /> }
                        >
                          <Avatar alt={element.name} src={`${process.env.REACT_APP_HOST_IMAGE}image/review/${element.image}`} sx={{ width: 50, height: 50 }} />
                        </Badge>
                      </item>
                      <item className="pl-15">
                        <Typography variant="h6_review"
                          sx={{
                            padding: "0",
                            fontFamily: "Inter",
                            color: "#003663",
                            fontWeight: "700"
                          }}
                        >
                          {element.name}
                        </Typography>
                        <Typography variant="caption" display="block"
                          sx={{
                            padding: "0",
                            fontFamily: "Inter",
                            fontSize: "13px",
                            color: "#acacac",
                            fontWeight: "600",
                            textAlign: 'left',
                          }}
                        >
                          {element.get_country.name}
                        </Typography>
                      </item>
                    </List>
                    <Box className='ovrScroll-2'>
                      <Typography variant="body2" color="text.secondary" sx={{ padding: 0, margin: '0 0 50px', textAlign: 'left' }}>
                        {parse(element.review)}
                      </Typography>
                    </Box>
                    <List component="div" sx={{ display: 'flex', justifyContent: "space-between", marginTop: "20px" }} >
                      <item >
                        <Stack>
                          <Rating name="size-small" value={element.rating} defaultValue={0} size="small" readOnly precision={0.5} />
                        </Stack>
                      </item>
                      <item >
                        {fDateDMMMY(element.ratingDate)}
                      </item>
                    </List>
                  </Card>
                </Item>
              ))}


            </Masonry>
          </Box>
        </CardContent>
      </Card>
      <Dialog className='revModal'
        fullScreen={fullScreen}
        maxWidth='lg'
        width='100%'
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogActions>
          <Typography
            style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              width: '30px',
              height: '30px',
              lineHeight: '30px',
              textAlign: 'center',
              fontWeight: '700',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            <RxCross2 />
          </Typography>
        </DialogActions>
        <DialogContent fullWidth>
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                marginBottom: '.5rem',
              }}
            >
              <Typography
                variant='h3'
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: '#444',
                }}
              >

                Review
              </Typography>
            </Box>
            <Grid container spacing={3} sx={{ width: '100%' }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>



                <Box
                  sx={{
                    width: '100%',
                    marginBottom: '.8rem',
                  }}
                >
                  <TextField fullWidth label='Full Name :' id='fullWidth' />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    marginBottom: '.8rem',
                  }}
                >
                  <TextField fullWidth label='Email :' id='fullWidth' />
                </Box>

                <Box
                  sx={{
                    width: '100%',
                    marginBottom: '.8rem',
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id='select-country'>Select Country</InputLabel>
                    <Select
                      labelId='select-country'
                      id='demo-select-country'
                      value={selectCountry}
                      label='Select Country'
                      onChange={handleCountryChange}
                    >
                      {countries.map((country) => <MenuItem value={country.name}>{country.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>


                <Box
                  sx={{
                    width: '100%',
                    marginBottom: '.8rem',
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id='select-country'>Select tour</InputLabel>
                    <Select
                      labelId='select-tour'
                      id='demo-select-tour'
                      value={selectTour}
                      label='Select Tour'
                      onChange={handleTourChange}
                    >
                      {tours.map((tour) => <MenuItem value={tour.title}>{tour.title}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>



              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '.8rem',
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                  )}
                </Box>
                <Box
                  sx={{
                    width: '100%',
                  }}
                >
                  <TextareaAutosize
                    aria-label='empty textarea'
                    placeholder='Review text'
                    style={{
                      width: '100%',
                      height: '158px',
                      resize: 'none',
                      padding: '1rem',
                      fontFamily: 'Montserrat',
                    }}
                  />
                </Box>



              </Grid>
              <Grid item xs={12}>
                <Box>
                  <ColorButton variant='contained' className='LearnMoreBtn'>
                    Send Review Email
                  </ColorButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Reviews;
