import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Typography,
  CardContent,
  Button,
  Stepper,
  Step,
  StepButton,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Alert,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  InputLabel,
  Tooltip,
  Avatar,
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import {
  ContactPageOutlined as ContactPageOutlinedIcon,
  Hiking as HikingIcon,
  InfoOutlined as InfoOutlinedIcon,
  LocalOfferRounded as LocalOfferRoundedIcon,
} from '@mui/icons-material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import WhyBook from '../../section/tour/inner/WhyBook';
import CustomerSupport from '../../section/tour/inner/CustomerSupport';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { tourApi } from '../../service/Tour.service';
import { helperApi } from '../../service/Helper.service';
import { fDate, fDateYMD } from '../../utils/formatTime';
import { useSnackbar } from "notistack";
import { bookingApi } from '../../service/Booking.service';

const SubmitButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#fb5d36'),
  backgroundColor: '#f97150',
  borderRadius: 4,
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 10,
  paddingBottom: 10,
  fontWeight: "bold",
  boxShadow: 'none',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#d04726',
  },
}));

const steps = ['Select Tour', 'Contat Details', 'Payment', 'Complete'];
const longText = `Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu. Nullam eget est sed sem iaculis gravida eget vitae justo. `;

const Booking = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState({});
  const [tour, setTour] = useState();
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalTravellerPerson, setTotalTravellerPerson] = useState('');
  const [nameTitle, setNameTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState('');
  const [countryName, setCountryName] = useState('');
  const [address, setAddress] = useState('');
  const [comments, setComment] = useState('');
  const [travellerDetails, setTravellerDetails] = useState([]);
  const [tourBasePrice, setTourBasePrice] = useState('');
  const [tourTotalPrice, setTourTotalPrice] = useState('');
  const [tourSubTotalPrice, setTourSubTotalPrice] = useState('');
  const [totalGrossPrice, setTotalGrossPrice] = useState();
  const [additionalService, setAdditionalService] = useState([]);
  const [paymentType, setPaymentType] = useState('card');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountPerc, setDiscountPerc] = useState('');
  const [viewPriceBreakdown, setViewPriceBreakDown] = useState(false);
  const [iAgree, setIAgree] = useState(false);
  const [hideSubmitButton, setHideSubmitButton] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [disable, setdisable] = useState(false);

  useEffect(() => {
    setActiveStep(1);
    setNameTitle('');
    setFullName('');
    setEmail('');
    setContact('');
    setCountry('');
    setCountryName('');
    setAddress('');
    setComment('');
    setCountryList([]);
    setTravellerDetails([]);
    setAdditionalService([]);
    setPaymentType('card');
    setCardHolderName('');
    setCardNumber('');
    setCardExpiration('');
    setCardCvv('');
    setCoupon('');
    setCouponError('');
    setCouponDiscount(0);
    setViewPriceBreakDown(false);
    if (localStorage.getItem('token')) {
      setFullName(JSON.parse(localStorage.getItem('user')).name);
      setEmail(JSON.parse(localStorage.getItem('user')).email);
      setContact(JSON.parse(localStorage.getItem('user')).contact);
      setCountry(JSON.parse(localStorage.getItem('user')).country);
      setAddress(JSON.parse(localStorage.getItem('user')).address);
    } else {
      setFullName('');
      setEmail('');
      setContact('');
      setCountry('');
      setAddress('');
    }
    getCountry();
  },[]);

  const getCountry = async () => {
    const country = await helperApi.country();
    if (country.status === 200 && country.data.success === true) {
      await setCountryList(country.data.data);
      getTour(JSON.parse(localStorage.getItem('booking')).bookingTour);
    }
  }

  const getTour = async (slug) => {
    await setStartDate(JSON.parse(localStorage.getItem('booking')) ? fDate(JSON.parse(localStorage.getItem('booking')).bookingDate) : '')
    await setTotalTravellerPerson(JSON.parse(localStorage.getItem('booking')) ? JSON.parse(localStorage.getItem('booking')).totalPerson : '');
    const tourDetails = await tourApi.tourDetailsBySlug(slug);

    if (tourDetails.status === 200 && tourDetails.data.status === 200 && tourDetails.data.success === true && Object.keys(tourDetails.data.data).length > 0) {
      await setTour(tourDetails.data.data);

      // Total Price
      let tempTourTotalPrice = ''
      if (tourDetails.data.data.priceType === 'perPerson') {
        if (tourDetails.data.data.get_per_person_price.length > 0) {
          const lastPrice = tourDetails.data.data.get_per_person_price.slice(-1)[0];
          if (JSON.parse(localStorage.getItem('booking')).totalPerson > lastPrice.minPerson) {
            await setTourBasePrice(lastPrice.price);
            tempTourTotalPrice = lastPrice.price * Number(JSON.parse(localStorage.getItem('booking')).totalPerson);
          } else {
            const getPrice = tourDetails.data.data.get_per_person_price.find(item => (item.minPerson <= JSON.parse(localStorage.getItem('booking')).totalPerson || item.maxPerson <= JSON.parse(localStorage.getItem('booking')).totalPerson) && (item.minPerson >= JSON.parse(localStorage.getItem('booking')).totalPerson || item.maxPerson >= JSON.parse(localStorage.getItem('booking')).totalPerson) );
            await setTourBasePrice(getPrice.price);
            tempTourTotalPrice = getPrice.price * Number(JSON.parse(localStorage.getItem('booking')).totalPerson);
          }
        } else {
          tempTourTotalPrice = 0;
        }
      } else {
        await setTourBasePrice(tourDetails.data.data.price);
        tempTourTotalPrice = tourDetails.data.data.price * Number(JSON.parse(localStorage.getItem('booking')).totalPerson);
      }
      await setTourTotalPrice(tempTourTotalPrice);
      await setTourSubTotalPrice(tempTourTotalPrice);
      await setTotalGrossPrice(tempTourTotalPrice);
      // End Total Price
      
      // Count End Date
      var date = new Date(JSON.parse(localStorage.getItem('booking')).bookingDate);
      // Add days to specified date
      date.setDate(date.getDate() + Number(tourDetails.data.data.duration) - 1);
      await setEndDate(date);
      // Count End Date

      // Count total number of traveller
      const updatedTravellerDetails = [];
      for (let index = 0; index < JSON.parse(localStorage.getItem('booking')).totalPerson; index++) {
        updatedTravellerDetails.push({index:Math.random(), travellerTitleName:'', travellerName:''});
      }
      await setTravellerDetails(updatedTravellerDetails);
      // End coutn total number of traveller

      // Additional Service
      const updateAdditionalService = [];
      tourDetails.data.data.get_additional_service.map(async (element, index) => {
        updateAdditionalService.push({
          index: Math.random(),
          id: element.id,
          tourId: element.tourId,
          name: element.name,
          price: element.price,
          accommodateUpTo: element.accommodateUpTo,
          checked: false,
          totalPerson: '',
          totalPrice: 0,
        });
      });
      await setAdditionalService(updateAdditionalService);
      // End Additional Service

      // calculate discount
      let tempDiscountPrice = '';
      if (tourDetails.data.data.settingDetails.globalDiscount) {
        const currentDate = new Date();
        const discountStartDate = new Date(tourDetails.data.data.settingDetails.discountStartDate);
        const discountEndDate = new Date(tourDetails.data.data.settingDetails.discountEndDate);

        if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && tourDetails.data.data.settingDetails.globalDiscount > tourDetails.data.data.discount) {
          setDiscountPerc(tourDetails.data.data.settingDetails.globalDiscount);
          tempDiscountPrice = ((tempTourTotalPrice * tourDetails.data.data.settingDetails.globalDiscount) / 100).toFixed(2);
        } else {
          setDiscountPerc(tourDetails.data.data.discount);
          tempDiscountPrice = ((tempTourTotalPrice * tourDetails.data.data.discount) / 100).toFixed(2);
        }
      } else {
        setDiscountPerc(tourDetails.data.data.discount);
        tempDiscountPrice = ((tempTourTotalPrice * tourDetails.data.data.discount) / 100).toFixed(2);
      }
      await setDiscount(tempDiscountPrice);
      await setTotalGrossPrice(tempTourTotalPrice - tempDiscountPrice);
      // End calculate discount
      await setLoading(false);
    }
  }
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = async () => {
    if (activeStep  === 1) {
      if (nameTitle !== '' && fullName !== '' && email !=='' && contact !== '' && address !== '' && country !== '' && comments !== '') {
        const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
        await setActiveStep(newActiveStep);
      } else {
        enqueueSnackbar('Please fill all field', {variant:'error'} );
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleContactDetails = async (event) => {
    if (event.target.name === 'nameTitle') {
      setNameTitle(event.target.value);
    } else if (event.target.name === 'fullName') {
      setFullName(event.target.value);
    } else if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'contact') {
      setContact(event.target.value);
    } else if (event.target.name === 'country') {
      let findCountry = countryList.find(item => item.id === event.target.value);
      setCountry(event.target.value);
      setCountryName(findCountry.name);
    } else if (event.target.name === 'address') {
      setAddress(event.target.value);
    } else if (event.target.name === 'comments') {
      setComment(event.target.value);
    }
  }

  const handletravellerDetails = async (event) => {
    const list = [...travellerDetails];
    list[event.target.dataset.id][event.target.name] = event.target.value;
    await setTravellerDetails(list);
  }

  const handleAdditionalService = async (event) => {
    const list = [...additionalService];
    if (event.target.name === 'checked') {
      list[event.target.dataset.id][event.target.name] = !list[event.target.dataset.id][event.target.name];
    }
    if (event.target.name === 'totalPerson') {
      list[event.target.dataset.id][event.target.name] = event.target.value;
    }
    list[event.target.dataset.id]['totalPrice'] = (list[event.target.dataset.id]['totalPerson'] !== '' ? list[event.target.dataset.id]['totalPerson'] : 0) * list[event.target.dataset.id]['price'];

    await setAdditionalService(list);

    let totalAdditionalServicePrice = (list.reduce(function (acc, obj) { return obj.checked === true ? acc + obj.totalPrice:acc + 0; }, 0)).toFixed(2)

    await setTourSubTotalPrice(tourTotalPrice + Number(totalAdditionalServicePrice) - Number(couponDiscount));
    await setTotalGrossPrice((tourTotalPrice + Number(totalAdditionalServicePrice)) - discount);
  }

  // Paypal Code
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "5.00",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      setIAgree(true);
      handleBooking(details)
    });
  }
  // End Paypal Code

  const handlePaymentMethod = async (event) => {
    setCardHolderName('');
    setCardNumber('');
    setCardExpiration('');
    setCardCvv('');
    if (event.target.value === 'paypal') {
      setHideSubmitButton(true);
    } else {
      setHideSubmitButton(false);
    }
    setPaymentType(event.target.value);
  }

  const handleCardDetails = async (event) => {
    if (event.target.name === 'cardHolderName') {
      await setCardHolderName(event.target.value);
    }
    if (event.target.name === 'cardNumber') {
      await setCardNumber(event.target.value);
    }
    if (event.target.name === 'cardExpiration') {
      await setCardExpiration(event.target.value);
    }
    if (event.target.name === 'cardCvv') {
      await setCardCvv(event.target.value);
    }
  }

  const handleViewPriceBreakdown = () => {
    setViewPriceBreakDown(!viewPriceBreakdown);
  }

  const handleBooking = async (paypalParams) => {
    if (iAgree) {
      setdisable(true);
      const data = {
        fullName,
        email,
        contact,
        country,
        address,
        comments,
        tourId: tour.id,
        tourDuration: tour.duration,
        tourStartDate: fDateYMD(JSON.parse(localStorage.getItem('booking')).bookingDate),
        tourEndDate: fDateYMD(endDate),
        totalTraveller: JSON.parse(localStorage.getItem('booking')).totalPerson,
        totalAmount:tourSubTotalPrice,
        tourDiscount: discount,
        couponCode: coupon,
        grossAmount: totalGrossPrice,
        paymentType,
        travellerDetails,
        additionalService
      }
  
      if (paymentType === 'card') {
        data['cardHolderName'] = cardHolderName;
        data['cardNumber'] = cardNumber;
        data['cardExpiration'] = cardExpiration;
        data['cvv'] = cardCvv;
      }
  
      if (paymentType === 'paypal') {
        data['paypalTransactionId'] = paypalParams.id;
        data['paypalPaymentStatus'] = paypalParams.status;
      }
  
      const booking = await bookingApi.createBooking(data);
      if (booking.status === 200 && booking.data.status === 200 && booking.data.success === true) {
        const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
        await setActiveStep(newActiveStep);
        await localStorage.removeItem('booking');
        setdisable(false);
      }
  
      if (booking.status === 400 && booking.data.success === false) {
        enqueueSnackbar(booking.data.data, {variant:'error'} );
        setdisable(false);
      }
    } else {
      enqueueSnackbar('Please select I Agree !', {variant:'error'} );
    }
  }

  const handleCoupon = async () => {
    setCouponError('');
    const data = {
      coupon
    }
    const checkCoupon = await bookingApi.validCoupon(data);
    if (checkCoupon.status === 200 && checkCoupon.data.status === 200) {
      const currentDate = new Date();
      const validFrom = new Date(checkCoupon.data.data.validFrom);
      const validUntil = new Date(checkCoupon.data.data.validUntil);

      if (currentDate.getTime() >= validFrom.getTime() && currentDate.getTime() <= validUntil.getTime()) {
        const tempCoupondiscount = ((tourTotalPrice * checkCoupon.data.data.discount) / 100).toFixed(2);
        setCouponDiscount(tempCoupondiscount);
        const tempDiscount = (((Number(tourTotalPrice) - Number(tempCoupondiscount)) * discountPerc) / 100).toFixed(2);
        setDiscount(Number(tempDiscount));

        let totalAdditionalServicePrice = (additionalService.reduce(function (acc, obj) { return obj.checked === true ? acc + obj.totalPrice:acc + 0; }, 0)).toFixed(2)

        let tempSubTotalPrice = tourTotalPrice + Number(totalAdditionalServicePrice) - Number(tempCoupondiscount);
        await setTourSubTotalPrice(tempSubTotalPrice);
        await setTotalGrossPrice(tempSubTotalPrice - Number(tempDiscount));
      } else {
        setCouponError('Coupon is expire !');
      }
    }
    if (checkCoupon.status === 200 && checkCoupon.data.status === 404) {
      setCouponError('Invalid Coupon !');
    }
  }

  return (
    <>
      {loading ? ''
      :
      <>
        <Box className='StepBan relative'>
          <Parallax bgImage={`${process.env.REACT_APP_HOST_IMAGE}image/tour/banner/${tour.bannerImage}`} bgImageAlt="" strength={100}>
            <Box sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'flex-end',
              height: '320px',
              width: '100%',
              margin: '0 auto',
              padding: '0 50px',
              position: 'relative',
              zIndex: '1',
            }} className=' relative ph-80'
            >
              <Typography variant='h2' style={{ color: '#fff', paddingBottom: '4.7rem' }}>{tour.title}</Typography>
            </Box>
          </Parallax>
        </Box>
        <Box sx={{ flexGrow: 1, }} className='stepWrapArea'>
          <Box sx={{ flexGrow: 1 }} className='ph-80'>
            <Grid container spacing={3} padding={3}>
              <Grid item xs={12} md={9}>
                <Box sx={{ width: '100%' }} className='stepArea'>
                  <Stepper alternativeLabel activeStep={activeStep} className='roundNumber'>
                    {steps.map((label, index) => (
                      <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                  <div>
                    {allStepsCompleted() ? (
                      <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Box sx={{ flex: '1 1 auto' }} />
                          <Button onClick={handleReset}>Reset</Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                          {
                            activeStep === 1 ? (
                              <>
                                <Card style={{
                                  marginTop: '30px',
                                  boxShadow: 'none',
                                  border: '#ddd 1px solid',
                                }}>
                                  <CardContent>
                                    <Box>
                                      <Typography gutterBottom variant="h5"
                                        sx={{
                                          borderBottom: '#ddd 1px solid',
                                          padding: '10px 0',
                                        }}
                                      >
                                        <ContactPageOutlinedIcon style={{
                                          color: "#fa8a6f",
                                          fontSize: '40px',
                                          display: 'inline-block',
                                          verticalAlign: 'middle',
                                          position: 'relative',
                                          top: '-5px',
                                          marginRight: '10px',
                                        }} />
                                        Contact Details
                                      </Typography>
                                    </Box>
                                    <Box noValidate className='contDtlsForm' sx={{ flexGrow: 1, marginTop: '30px', }}>
                                      <Grid container spacing={2} py={0} mb={1}>
                                        <Grid item xs={12} md={2} lg={2}>
                                          <Typography variant='body1'>First Name*</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} lg={10} container spacing={2}>
                                          <Grid item xs={2} md={2} lg={2}>
                                            <FormControl size="small" sx={{ width: '100%' }}>
                                              <Select fullWidth
                                                value={nameTitle}
                                                onChange={handleContactDetails}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                name='nameTitle'
                                              >
                                                <MenuItem key={1} value="mr">Mr</MenuItem>
                                                <MenuItem key={2} value="ms">Ms</MenuItem>
                                                <MenuItem key={3} value="mrs">Mrs</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </Grid>
                                          <Grid item xs={10} md={10} lg={10}>
                                            <TextField fullWidth id="fullName" name='fullName' onChange={handleContactDetails} value={fullName} />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={2} py={0} mb={1}>
                                        <Grid item xs={12} md={2} lg={2}>
                                          <Typography variant='body1'>Email*</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} lg={10}>
                                          <TextField fullWidth id="email" name="email" onChange={handleContactDetails} value={email} />
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={2} py={0} mb={1}>
                                        <Grid item xs={12} md={2} lg={2}>
                                          <Typography variant='body1'>Phone*</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} lg={10}>
                                          <TextField fullWidth id="contact" value={contact} name='contact' onChange={handleContactDetails} />
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={2} py={0} mb={1}>
                                        <Grid item xs={12} md={2} lg={2}>
                                          <Typography variant='body1'>Country*</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} lg={10}>
                                          <Select fullWidth
                                            value={country}
                                            onChange={handleContactDetails}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            name='country'
                                          >
                                            {countryList.map((element, index)=>(
                                              <MenuItem key={index} value={element.id}>{element.name}</MenuItem>
                                            ))}
                                          </Select>
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={2} py={0} mb={1}>
                                        <Grid item xs={12} md={2} lg={2}>
                                          <Typography variant='body1'>Address</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} lg={10}>
                                          <TextField className='input-5' fullWidth id="address" name='address' onChange={handleContactDetails} value={address} />
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={2} py={0} mb={1}>
                                        <Grid item xs={12} md={2} lg={2}>
                                          <Typography variant='body1'>Comments</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} lg={10}>
                                          <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="Empty"
                                            name='comments'
                                            value={comments}
                                            onChange={handleContactDetails}
                                            style={{
                                              width: '100%',
                                              resize: 'none',
                                              height: '165px',
                                              border: '#ccc 1px solid',
                                              borderRadius: '4px',
                                              padding: '16.5px 14px',
                                            }}
                                          />
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  </CardContent>
                                </Card>

                                <Card style={{
                                  marginTop: '30px',
                                  boxShadow: 'none',
                                  border: '#ddd 1px solid',
                                }}>
                                  <CardContent>
                                    <Box>
                                      <Typography gutterBottom variant="h5"
                                        sx={{
                                          borderBottom: '#ddd 1px solid',
                                          padding: '10px 0',
                                        }}
                                      >
                                        <HikingIcon style={{
                                          color: "#fa8a6f",
                                          fontSize: '40px',
                                          display: 'inline-block',
                                          verticalAlign: 'middle',
                                          position: 'relative',
                                          top: '-5px',
                                          marginRight: '10px',
                                        }} />
                                        Traveller Details
                                      </Typography>
                                    </Box>
                                    <Box noValidate className='contDtlsForm' sx={{ flexGrow: 1, marginTop: '30px', }}>
                                      {Object.keys(travellerDetails).map((element, index) => {
                                        let titleName = `titleName-${index}`, name = `name-${index}`
                                        return (
                                          <Grid key={index} container spacing={2} pt={0}>
                                            <Grid item xs={12} md={2} lg={2}>
                                              <Typography variant='body1'>Traveller {index + 1}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={10} lg={10} container spacing={2}>
                                              <Grid item xs={2} md={2} lg={2}>
                                                <FormControl size="small" sx={{ width: '100%' }}>
                                                  <TextField
                                                    select
                                                    id={titleName}
                                                    name="travellerTitleName"
                                                    value={element.travellerTitleName}
                                                    SelectProps={{
                                                      native: true
                                                    }}
                                                    inputProps={{
                                                      "data-id": index
                                                    }}
                                                    onChange={handletravellerDetails}
                                                  >
                                                    <option value=""></option>
                                                    <option value="mr">Mr</option>
                                                    <option value="ms">Ms</option>
                                                    <option value="mrs">Mrs</option>
                                                  </TextField>
                                                </FormControl>
                                              </Grid>
                                              <Grid item xs={10} md={10} lg={10}>
                                                <TextField fullWidth name='travellerName' id={name} onChange={handletravellerDetails} inputProps={{ "data-id": index }} />
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                      )})}
                                    </Box>
                                  </CardContent>
                                </Card>
                                <Box mt={3}>
                                  <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info" style={{ background: '#f2f2f2' }}>This is a secure and SSL encrypted payment. Your credit card details are safe.</Alert>
                                  </Stack>
                                </Box>
                              </>
                            ) : (
                              activeStep === 2 ? (<>
                                <Card style={{
                                  marginTop: '30px',
                                  boxShadow: 'none',
                                  border: '#ddd 1px solid',
                                }}>
                                  <CardContent>
                                    <Box>
                                      <Typography gutterBottom variant="h5"
                                        sx={{
                                          borderBottom: '#ddd 1px solid',
                                          padding: '10px 0 20px',
                                          textAlign: 'center'
                                        }}
                                      >
                                        Please Select Your Preffered Additional Service
                                      </Typography>
                                    </Box>
                                    <Box className='additionalService' sx={{ flexGrow: 1, marginTop: '30px', }}>
                                      <TableContainer>
                                        <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>&nbsp;</TableCell>
                                              <TableCell component="th" align="center"><strong>Price</strong></TableCell>
                                              <TableCell align="center"><strong>Qty</strong></TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {additionalService.map((element, index) => (
                                              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell component="th" scope="row">
                                                  <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={element.checked} name='checked' onChange={handleAdditionalService} inputProps={{ "data-id": index }} />}  label={element.name} />
                                                  </FormGroup>
                                                </TableCell>
                                                <TableCell className='colOrange' align="center">${element.price} X</TableCell>
                                                <TableCell align="center">
                                                  <TextField name='totalPerson' inputProps={{ "data-id": index }} style={{ width: '80px', }} onChange={handleAdditionalService} value={element.totalPerson} />
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Box>
                                  </CardContent>
                                </Card>
                                <Card style={{
                                  marginTop: '30px',
                                  boxShadow: 'none',
                                  border: '#ddd 1px solid',
                                }}>
                                  <CardContent>
                                    <Box sx={{ display: 'flex', }}>
                                      <Typography gutterBottom variant="h5"
                                        sx={{
                                          borderBottom: '#ddd 1px solid',
                                          padding: '10px 0',
                                          flex: '0 0 50%',
                                          maxWidth: '50%',
                                        }}
                                      >
                                        <ContactPageOutlinedIcon style={{
                                          color: "#fa8a6f",
                                          fontSize: '40px',
                                          display: 'inline-block',
                                          verticalAlign: 'middle',
                                          position: 'relative',
                                          top: '-5px',
                                          marginRight: '10px',
                                        }} />
                                        Contact Details
                                      </Typography>
                                      <Typography gutterBottom variant="h5"
                                        sx={{
                                          borderBottom: '#ddd 1px solid',
                                          padding: '10px 0',
                                          flex: '0 0 50%',
                                          maxWidth: '50%',
                                        }}
                                      >
                                        <HikingIcon style={{
                                          color: "#fa8a6f",
                                          fontSize: '40px',
                                          display: 'inline-block',
                                          verticalAlign: 'middle',
                                          position: 'relative',
                                          top: '-5px',
                                          marginRight: '10px',
                                        }} />
                                        Traveller Details
                                      </Typography>
                                    </Box>
                                    <Box noValidate className='contDtlsForm' sx={{ flexGrow: 1, }}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={6} md={6} lg={6}>
                                          <Box className='addressFlex'>
                                            <ul className='d-flex'>
                                              <li className='info'>Full Name : </li>
                                              <li className='value'>{nameTitle.charAt(0).toUpperCase() + nameTitle.slice(1)} {fullName}</li>
                                            </ul>
                                            <ul className='d-flex'>
                                              <li className='info'>Email : </li>
                                              <li className='value'>{email}</li>
                                            </ul>
                                            <ul className='d-flex'>
                                              <li className='info'>Phone : </li>
                                              <li className='value'>{contact}</li>
                                            </ul>
                                            <ul className='d-flex'>
                                              <li className='info'>Country : </li>
                                              <li className='value'>{countryName}</li>
                                            </ul>
                                            <ul className='d-flex'>
                                              <li className='info'>Address : </li>
                                              <li className='value'>{address}</li>
                                            </ul>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6}>
                                          <Box className='addressFlex'>
                                          {Object.keys(travellerDetails).map((element, index) => (
                                            <ul key={index} className='d-flex'>
                                              <li className='info'>Traveller {index + 1} : </li>
                                              <li className='value'>{travellerDetails[index].travellerTitleName.charAt(0).toUpperCase() + travellerDetails[index].travellerTitleName.slice(1)} {travellerDetails[index].travellerName}</li>
                                            </ul>
                                          ))}
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  </CardContent>
                                </Card>
                                <Card style={{
                                  marginTop: '30px',
                                  boxShadow: 'none',
                                  border: '#ddd 1px solid',
                                }}>
                                  <CardContent>
                                    <Box>
                                      <Typography gutterBottom variant="h5"
                                        sx={{
                                          borderBottom: '#ddd 1px solid',
                                          padding: '10px 0',
                                        }}
                                      >
                                        <ContactPageOutlinedIcon style={{
                                          color: "#fa8a6f",
                                          fontSize: '40px',
                                          display: 'inline-block',
                                          verticalAlign: 'middle',
                                          position: 'relative',
                                          top: '-5px',
                                          marginRight: '10px',
                                        }} />
                                        Notes
                                      </Typography>
                                    </Box>
                                    <Box noValidate className='contDtlsForm' sx={{ flexGrow: 1, marginTop: '30px', }}>
                                      <Box className='addressFlex'>
                                        <ul className='d-flex'>
                                          <li className='info'>Full Name : </li>
                                          <li className='value'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</li>
                                        </ul>
                                      </Box>
                                    </Box>
                                  </CardContent>
                                </Card>
                                <Card style={{
                                  marginTop: '30px',
                                  boxShadow: 'none',
                                  background: '#f2f2f2'
                                }}>
                                  <CardContent>
                                    <Box>
                                      <Typography gutterBottom variant="h5"
                                        sx={{
                                          borderBottom: '#ddd 1px solid',
                                          padding: '10px 0 20px',
                                          textAlign: 'center'
                                        }}
                                      >
                                        Please Select A Payment Method
                                      </Typography>
                                    </Box>
                                    <Box className='additionalService'
                                      sx={{
                                          flexGrow: 1,
                                          padding: '30px',
                                      }}>
                                      <Box className='paymentArea'>
                                        <Box style={{ marginBottom: '1.5rem' }}>
                                          <Typography gutterBottom variant="body1" textAlign={'center'}>
                                              * If You wish to do bank transfer , Please select “Book and Pay” Later button. You will have an option to submit payment receipt on your dashboard page.
                                          </Typography>
                                        </Box>
                                        <RadioGroup fullWidth
                                          aria-labelledby="demo-radio-buttons-group-label"
                                          defaultValue="card"
                                          name="radio-buttons-group"
                                        >
                                          <Box className='paymentAreaInner' sx={{ marginTop: '1rem' }} >
                                            <FormControlLabel value="card" control={<Radio name='paymentType' onChange={handlePaymentMethod} value='card' checked={paymentType === 'card'} />} label="Pay With " />
                                            <span style={{
                                              position: 'relative',
                                              left: '-10px',
                                              top: '2px',
                                              color: '#f97150',
                                              fontWeight: 'bold',
                                              fontSize: '13px',
                                            }}>Card</span>
                                            {paymentType === 'card' ? (
                                              <Box>
                                                <Stack sx={{ width: '100%', marginBottom: '1.5rem' }} spacing={2}>
                                                  <Alert severity="info">This is a Secure and SSL encrypted payment. Your Credit Cad details are safe.</Alert>
                                                </Stack>
                                                <Grid container spacing={4} mb={2}>
                                                  <Grid item xs={12} md={8} lg={8}>
                                                    <Typography variant='subtitle2'
                                                      style={{
                                                          marginBottom: '1.5rem',
                                                          fontWeight: '700',
                                                          display: 'inline-block',
                                                          borderBottom: '#444444 1px solid',
                                                          color: '#444'
                                                      }}>Credit Card Details</Typography>
                                                    <Box mb={2}>
                                                      <InputLabel shrink htmlFor="bootstrap-input">
                                                        Full Name (on the card)
                                                      </InputLabel>
                                                      <TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-normal"
                                                        size="small"
                                                        fullWidth
                                                        name='cardHolderName'
                                                        value={cardHolderName}
                                                        onChange={handleCardDetails}
                                                      />
                                                    </Box>
                                                    <Box mb={2}>
                                                      <InputLabel shrink htmlFor="bootstrap-input">
                                                        Card Number
                                                      </InputLabel>
                                                      <TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-normal"
                                                        size="small"
                                                        fullWidth
                                                        name='cardNumber'
                                                        value={cardNumber}
                                                        onChange={handleCardDetails}
                                                      />
                                                    </Box>
                                                    <Grid container spacing={2} mb={2} p="0">
                                                      <Grid item xs={12} md={6} lg={6} >
                                                        <Box mb={2} >
                                                          <InputLabel shrink htmlFor="bootstrap-input">
                                                            Expiration
                                                          </InputLabel>
                                                          <TextField
                                                            hiddenLabel
                                                            id="filled-hidden-label-normal"
                                                            size="small"
                                                            fullWidth
                                                            placeholder='MM/YYYY'
                                                            name='cardExpiration'
                                                            value={cardExpiration}
                                                            onChange={handleCardDetails}
                                                          />
                                                        </Box>
                                                      </Grid>
                                                      <Grid item xs={12} md={6} lg={6}>
                                                        <Box mb={2}>
                                                          <InputLabel shrink htmlFor="bootstrap-input">
                                                            CVV
                                                            <Tooltip title={longText} followCursor >
                                                              <Button style={{ padding: '0', }}>
                                                                <InfoOutlinedIcon style={{ padding: '0', fontSize: '20px', marginLeft: '-20px' }} />
                                                              </Button>
                                                            </Tooltip>
                                                          </InputLabel>
                                                          <TextField
                                                            hiddenLabel
                                                            id="filled-hidden-label-normal"
                                                            size="small"
                                                            fullWidth
                                                            name='cardCvv'
                                                            value={cardCvv}
                                                            onChange={handleCardDetails}
                                                          />
                                                        </Box>
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item xs={12} md={4} lg={4}>
                                                    <Box className='cardImg'>
                                                      <img src={`${process.env.REACT_APP_URL}images/cards.png`} alt='card' />
                                                    </Box>
                                                  </Grid>
                                                </Grid>
                                              </Box>
                                            ) :''}
                                          </Box>
                                          <Box className='paymentAreaInner' sx={{ marginTop: '1rem' }} >
                                            <Box>
                                              <FormControlLabel value="payPal" control={<Radio name='paymentType' onChange={handlePaymentMethod} value='paypal' checked={paymentType === 'paypal'} />} label="Pay With " />
                                              <span style={{
                                                position: 'relative',
                                                left: '-10px',
                                                top: '7px',
                                              }}>
                                                <img src={`${process.env.REACT_APP_URL}images/paypal.png`} alt='paypal' style={{ maxWidth: '100%' }} />
                                              </span>
                                            </Box>
                                            {paymentType === 'paypal' ? (
                                              <Box>
                                                <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                                                  <PayPalButtons style={{ layout: "horizontal" }}
                                                    createOrder={(data, actions) => createOrder(data, actions)}
                                                    onApprove={(data, actions) => onApprove(data, actions)}
                                                  />
                                                </PayPalScriptProvider>
                                              </Box>
                                            ) :''}
                                          </Box>
                                          <Box className='paymentAreaInner' sx={{ marginTop: '1rem' }} >
                                            <FormControlLabel value="Pay Later via Bank Transfer " control={<Radio  name='paymentType' onChange={handlePaymentMethod} value='payviabanktransfer' checked={paymentType === 'payviabanktransfer'} />} label="Pay Later via Bank Transfer " />
                                          </Box>
                                        </RadioGroup>
                                      </Box>
                                      <Box className='' sx={{ marginTop: '1rem' }} >
                                        <FormControlLabel control={<Checkbox name='iAgree' value={iAgree} checked={iAgree} onChange={()=>{setIAgree(!iAgree)}} />} label="* II agree with Teerms of service and Privact Statement." />
                                      </Box>
                                      {hideSubmitButton ? '' : (
                                        <Box>
                                          <SubmitButton variant="contained" className="LearnMoreBtn" sx={{ marginTop: "30px", width: '100%', }} onClick={handleBooking} disabled={disable} >
                                            submit <ArrowForwardIcon />
                                          </SubmitButton>
                                        </Box>
                                      )}
                                      
                                      <Box sx={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                        <Typography variant='body2'>No booking fees! You will be charged ₹90,948.93 once your booking is confirmed.</Typography>
                                      </Box>
                                    </Box>
                                  </CardContent>
                                </Card>

                              </>) : (
                                activeStep === 3 ? (<>
                                  <Card style={{
                                    marginTop: '30px',
                                    boxShadow: 'none',
                                    background: '#f2f2f2'
                                  }}>
                                    <CardContent>
                                      <Box>
                                        <Typography gutterBottom variant="h5"
                                          sx={{
                                            borderBottom: '#ddd 1px solid',
                                            padding: '10px 0 20px',
                                            textAlign: 'center'
                                          }}
                                        >
                                          Please Select A Payment Method
                                        </Typography>
                                      </Box>
                                      <Box sx={{
                                        textAlign: 'center',
                                        padding: '30px',
                                        maxWidth: '600px',
                                        margin: '0 auto',
                                      }}>
                                        <Stack direction="row" spacing={2} sx={{ marginBottom: '2rem' }}>
                                          <Avatar
                                            alt="Remy Sharp"
                                            src="../images/check.png"
                                            sx={{ width: 100, height: 100, margin: '0 auto' }}
                                          />
                                        </Stack>
                                        <Typography variant='body1'>
                                          Your booking detail has been sent to your email. You can check your payment status from your Dashboard
                                        </Typography>
                                        <SubmitButton variant="contained" className="LearnMoreBtn" sx={{ marginTop: "30px", }} component='a' href='/home'>
                                          Go to my Dashboard
                                        </SubmitButton>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </>) : ''
                              )
                            )
                          }
                        </Typography>
                        {activeStep === 3 ? '' : (
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                              color="inherit"
                              disabled={activeStep === 1}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button className='nxtBtnStep' onClick={handleNext} sx={{ mr: 1 }} disabled={activeStep === 2}>
                              Next
                            </Button>
                          </Box>
                        )}
                        
                      </>
                    )}
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box className='forSticky'>
                  <Box className='bookingDeta'
                    style={{
                      border: '#f97150 1px solid',
                      borderRadius: '4px',
                    }}
                  >
                    <Box style={{ padding: '.5rem 1.3rem' }}>
                      <Typography variant='h6' style={{ color: '#f97150', fontSize: '16px', fontWeight: '600' }}>
                        {tour.title}
                      </Typography>
                      <Typography variant='subtitle2'><strong>Travel Date :</strong>
                        <span>
                          {startDate}
                          {/* 18 January, 2023 ( edit ) */}
                        </span>
                      </Typography>
                      <Typography variant='subtitle2'><strong>End Date :</strong > 
                        <span>
                          {endDate ? fDate(endDate) : ''}
                        </span>
                      </Typography>
                      <Typography variant='subtitle2'><strong>Period :</strong > <span>{tour.duration} Days</span></Typography>
                      <Typography variant='subtitle2'><strong>Traveller  :</strong > <span>{totalTravellerPerson}</span></Typography>
                      {activeStep === 3 ? '' : (
                        <Box className='contDtlsForm' sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                          <TextField id="couponCode" name='couponCode' placeholder="Coupone Code" style={{ width: '120px', background: '#f2f2f2', marginRight: '10px' }} value={coupon} onChange={(e)=>setCoupon(e.target.value)} />
                          <Typography style={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#444',
                            cursor: 'pointer',
                          }} onClick={handleCoupon} >Apply</Typography>
                          {couponError? couponError:''}
                        </Box>
                      )}
                      <Box sx={{ marginTop: '10px' }}>
                        <Typography style={{
                          color: '#444',
                          fontSize: '13px',
                          display: 'inline-block',
                          borderBottom: '#444 1px solid',
                          fontWeight: '600',
                        }} onClick={handleViewPriceBreakdown}>View Price Breakdown</Typography>
                      </Box>
                      {viewPriceBreakdown ? (
                        <Box sx={{ marginTop: '10px' }}>
                          <TableContainer className='BreakdownTable'>
                            <Table sx={{ Width: '100%' }} aria-label="simple table">
                              <TableBody>
                                <TableRow>
                                  <TableCell>Traveller Base Price <small>{totalTravellerPerson} x ${tourBasePrice}</small></TableCell>
                                  <TableCell align="right">${tourTotalPrice}</TableCell>
                                </TableRow>
                                {couponDiscount ? (
                                  <TableRow>
                                    <TableCell>Coupon Discount </TableCell>
                                    <TableCell align="right">${couponDiscount}</TableCell>
                                  </TableRow>
                                ) : ''}
                                
                                {
                                  additionalService.find(o => o.checked === true && o.totalPerson > 0)? (
                                    <>
                                      <TableRow>
                                        <TableCell colspan="2" className='tbn'><strong> Additional Service</strong></TableCell>
                                      </TableRow>
                                      {additionalService.map((element, index)=>(
                                        <>
                                          {element.checked && element.totalPerson > 0 ? (
                                            <TableRow key={index}>
                                              <TableCell>{element.name} <small>({element.totalPerson} x ${element.price})</small></TableCell>
                                              <TableCell align="right">${element.totalPrice}</TableCell>
                                            </TableRow>
                                          ) : ''}
                                        </>
                                      ))}
                                    </>
                                  ) : ''
                                }
                                <TableRow>
                                  <TableCell><strong> Sub Total Price</strong></TableCell>
                                  <TableCell align="right"> ${tourSubTotalPrice}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Discount ({discountPerc}%)</TableCell>
                                  <TableCell align="right"> ${discount}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      ) : ''}
                    </Box>

                    <Box style={{ borderBottom: '#f00 1px solid' }}>
                      <Grid container spacing={3}>
                        <Grid item xs={6} md={6} sx={{
                          paddingLeft: '1rem',
                          paddingRight: '1rem'
                        }}>
                          <Typography style={{ fontWeight: 'bold', fontSize: '13px,' }} >
                            <LocalOfferRoundedIcon style={{
                              display: 'inline-block',
                              verticalAlign: 'middle',
                              color: '#f97150',
                              marginRight: '5px',
                              fontSize: '13px',
                            }} />Total Price
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} sx={{
                          paddingLeft: '1rem',
                          paddingRight: '1rem'
                        }}>
                          <Typography style={{ fontWeight: 'bold', fontSize: '13px,' }}>${totalGrossPrice}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid item xs={6} md={6} sx={{
                          paddingLeft: '1rem',
                          paddingRight: '1rem'
                        }}>
                          <Typography style={{ fontWeight: 'bold', fontSize: '13px,' }}>50% Deposite</Typography>
                        </Grid>
                        <Grid item xs={6} md={6} sx={{
                          paddingLeft: '1rem',
                          paddingRight: '1rem'
                        }}>
                          <Typography style={{ fontWeight: 'bold', fontSize: '13px,' }}>${(totalGrossPrice * 50) / 100}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ padding: '.5rem' }}>
                      <SubmitButton variant="contained" className="LearnMoreBtn" sx={{ width: '100%', }} >
                        submit <ArrowForwardIcon />
                      </SubmitButton>
                    </Box>
                  </Box>
                  <WhyBook />
                  <CustomerSupport />
                </Box>
              </Grid>
            </Grid>
          </Box >
        </Box >
      </>
      }
    </>
  )
}

export default Booking;