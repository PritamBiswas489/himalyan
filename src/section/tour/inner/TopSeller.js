import React, { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Grid,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Modal,
  Backdrop,
  Alert,
} from '@mui/material'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


import { Box } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import {
  ContentPasteSearchOutlined as ContentPasteSearchOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
} from '@mui/icons-material';
import { authApi } from '../../../service/Auth.service';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



const bdrBtn = {
  border: '#fff 1px solid',
  color: '#fff',
  display: 'block',
  width: '100%',
  fontSize: '15px',
  fontWeight: '600',
  fontFamily: 'Montserrat',
  padding: '3px 0',
  "&:hover": {
    color: '#333',
    backgroundColor: '#fff',
  },
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  maxWidth: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
  p: 4,
};
const TopSeller = (props) => {
   
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [bookingDate, setBookingDate] = useState(null);
  const [tour, setTour] = useState(props.tour);
  const [numberofpeople, setNumberofpeople] = useState('');
  const [numberOfPeopleError, setNumberOfPeopleError] = useState(false);
  const [disDate, setDisDate] = useState('');
  const dates = [];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [submit, setSubmit] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [price, setPrice] = useState('');
  // const handleSubmitOpen = () => setSubmit(true);
  // const handleSubmitClose = () => setSubmit(false);

  const handleSubmitOpen = () => {
    setSubmit(true);
  };
  const handleSubmitClose = () => {
    setSubmit(false);
    setEmail('');
    setPassword('');
    setError(null);
  };

  useEffect(() => {
    setSubmit(false);
    setBookingDate(null);
    setNumberofpeople('');
    setEmail('');
    setPassword('');
    setError(null);

    props.tour.get_unavailable_dates.map((element, index) => {
      const disable_start = element.from;
      const disable_end = element.to;
      getDatesInRange(disable_start, disable_end);
    });
    if(props.tour.cutt_off_days){
       getDatesInRange(props.tour.cutt_off_days['from'], props.tour.cutt_off_days['to']);
    }
    setDisDate(dates.filter((item, index) => dates.indexOf(item) === index));

    if (props.tour) {
      let price = 0;
      if (props.tour.settingDetails) {
        const currentDate = new Date();
        const discountStartDate = new Date(props.tour.settingDetails.discountStartDate);
        const discountEndDate = new Date(props.tour.settingDetails.discountEndDate);
        if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && props.tour.settingDetails.globalDiscount > props.tour.discount) {
          price = props.tour.price - Number(((props.tour.price * props.tour.settingDetails.globalDiscount) / 100).toFixed(2));
          setPrice(price);
        } else {
          price = props.tour.price - Number(((props.tour.price * props.tour.discount) / 100).toFixed(2));
          setPrice(price);
        }
      } else {
        price = props.tour.price - Number(((props.tour.price * props.tour.discount) / 100).toFixed(2));
        setPrice(price);
      }
    }
  }, [props]);

  const getDatesInRange = async (startDate, endDate) => {
    const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
    const end = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));
    const date = new Date(start.getTime());
    while (date <= end) {
      dates.push(new Date(`${new Date(date).toISOString().split("T")[0]}T00:00`).toISOString());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  const handleChange = (event) => {
    if (event.target.value >= tour.minParticipant && event.target.value <= tour.maxParticipant) {
      setNumberofpeople(event.target.value);
      setNumberOfPeopleError(false);
    } else {
      setNumberofpeople('');
      setNumberOfPeopleError(true);
    }
  };

  const handleSubmit = async () => {
    if (bookingDate !== '' && numberofpeople !== '') {
      if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
        const data = {
          'bookingTour': props.tour.slug,
          'bookingDate': bookingDate,
          'totalPerson': numberofpeople
        }
        localStorage.setItem('booking', JSON.stringify(data));
        navigate('/payment');
      } else {
        setSubmit(true);
      }
    } else {
      enqueueSnackbar('Please fill all field !', { variant: 'error' });
    }
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: '#f97150',
    letterSpacing: '1.5px',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    boxShadow: 'none',
    width: '100%',
    fontSize: '14px',
    fontFamily: 'Montserrat',
    '&:hover': {
      backgroundColor: '#fec6b8',
      boxShadow: 'none',
      color: '#333',
    },
  }));

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      setError('');
      const data = {
        email,
        password
      }
      const signin = await authApi.login(data);

      if (signin.status === 400 && signin.data.success === false) {
        setError(signin.data.message);
      } else if (signin.status === 200 && signin.data.success === true) {
        localStorage.setItem('token', signin.data.token);
        localStorage.setItem('user', JSON.stringify(signin.data.user));
        const data = {
          'bookingTour': props.tour.slug,
          'bookingDate': bookingDate,
          'totalPerson': numberofpeople
        }
        localStorage.setItem('booking', JSON.stringify(data));
        setSubmit(false);
        navigate('/payment');
      }
    } else {
      setError('Please fill all field !');
    }
  }

  const handleContinueAsGuest = async () => {
    const data = {
      'bookingTour': props.tour.slug,
      'bookingDate': bookingDate,
      'totalPerson': numberofpeople
    }
    localStorage.setItem('booking', JSON.stringify(data));
    navigate('/payment');
  }

  const handleSignUp = async () => {
    navigate('/auth/register/payment');
  }

  return (
    <>
      <Box className='topSellerBox' sx={{
        background: '#f97150',
        padding: '0 30px 10px 30px',
        borderRadius: '10px',
      }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography className='tsReboon'
            sx={{
              textAlign: 'center',
              marginBottom: '5px',
            }}
          >
            <span>Top Seller</span>
          </Typography>
          <Typography className='allInclusive'>All Inclusive Price: <span>$ 
            {tour.price === price? '':<span className='lineThrough ltProrerties-3'>{tour.price}</span>} {tour.price === price ? tour.price : price}</span></Typography>
        </Box>
        <Box sx={{ width: '100%' }} className="datePerson">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" style={{ color: '#fff', fontSize: '16px', }}>
                Book this Trip
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ paddingTop: '0' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    disablePast
                    shouldDisableDate={(date) => disDate.includes(date.toISOString())}
                    label="Date"
                    inputFormat="DD/MM/YYYY"
                    value={bookingDate}
                    onChange={(newValue) => setBookingDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} style={{ paddingTop: '0' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small">Number of people</InputLabel>
                <Select labelId="demo-select-small" id="demo-simple-select" name='numberofpeople' value={numberofpeople} label="Numberofpeople" onChange={handleChange} >
                  <MenuItem value=''>PAX</MenuItem>
                  {(() => {
                    let td = [];
                    for (let i = 1; i <= tour.maxParticipant; i++) {
                      td.push(<MenuItem value={i}>{i}</MenuItem>);
                    }
                    return td;
                  })()}
                </Select>
              </FormControl>
            </Grid>
            {numberOfPeopleError ? (
              <Grid>This tour need minimum {tour.minParticipant} people !</Grid>
            ) : ''}
            <Grid item xs={12}>
              <ColorButton variant="contained" className="LearnMoreBtn" onClick={handleSubmit}>Submit</ColorButton>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <Button sx={bdrBtn}
          >Customize Trip</Button>
        </Box>
        <Box mt={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography onClick={handleOpen} variant='body1' sx={{ color: '#fff', fontFamily: 'Montserrat', fontSize: '14px', fontWeight: '600', }}>
            <EmailOutlinedIcon
              style={{
                color: "#fff",
                fontSize: '20px',
                display: 'inline-block',
                verticalAlign: 'middle',
                position: 'relative',
                top: '-2px',
                marginRight: '6px',
              }}
            />
            Forward to Friend
          </Typography>
          <Typography variant='body1' sx={{ color: '#fff', fontFamily: 'Montserrat', fontSize: '14px', fontWeight: '600', }}>
            <ContentPasteSearchOutlinedIcon
              style={{
                color: "#fff",
                fontSize: '20px',
                display: 'inline-block',
                verticalAlign: 'middle',
                position: 'relative',
                top: '-2px',
                marginRight: '6px',
              }}
            />
            Quick Enquary
          </Typography>
        </Box>
      </Box>
      <BootstrapDialog
        onClose={handleSubmitClose}
        aria-labelledby="customized-dialog-title"
        open={submit}
        fullWidth
        maxWidth="md"
      >
        <BootstrapDialogTitle style={{ fontWeight: '700' }} id="customized-dialog-title" onClose={handleSubmitClose}>
          Proceed to Booking
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <Box>
                  <Typography variant='h4' style={{ fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', }}>All Ready a Member</Typography>
                </Box>
                {!!error && <Alert severity="error">{error}</Alert>}
                <Box
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                >
                  <TextField fullWidth name='email' value={email} onChange={(e) => setEmail(e.target.value)} label="Email" id="email" />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                >
                  <TextField fullWidth label="Password" type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} id="fullWidth" />
                </Box>
                <Box>
                  <button className="signInBtn" onClick={handleLogin}>Sign In</button>
                </Box>
                <Box style={{
                  marginTop: '1rem',
                }}>
                  <Link to={'/'} className='forgetPassword'>Forget Password</Link>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    width: '100%',
                  }}
                >
                  <Typography variant='h4' style={{ fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', }}>Dont Have an Account? Create One.</Typography>
                  <Typography variant='body2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</Typography>
                  <Box style={{ marginTop: '1rem', }}>
                    <button className="signInBtn" onClick={handleSignUp}>Sign Up</button>
                  </Box>
                  <Typography variant='h4' style={{ fontSize: '16px', fontWeight: '700', marginTop: '.6rem', textAlign: 'center' }}>Or Continue As Guest </Typography>
                  <Box>
                    <button className="signInBtnBdr" onClick={handleContinueAsGuest}>Continue As Guest</button>
                  </Box>
                </Box>
              </Grid>

            </Grid>
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ padding: '0' }}>
              Forward to Friend
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontStyle: 'italic', fontSize: '11px', margin: '0' }}>
              Share trip destination with your friends.
            </Typography>
          </Box>
          <Grid container sx={12} spacing={3} mt={2}>
            <Grid item sm={6} sx={12}>
              <Box mb={3}>
                <TextField id="outlined-basic" label="Friend's Name" variant="outlined" style={{ width: "100%" }} />
              </Box>
              <Box mb={3}>
                <TextField id="outlined-basic" label="Friend's Email " variant="outlined" style={{ width: "100%" }} />
              </Box>
            </Grid>
            <Grid item sm={6} sx={12}>
              <Box mb={3}>
                <TextField id="outlined-basic" label=" Full Name *" variant="outlined" style={{ width: "100%" }} />
              </Box>
              <Box mb={3}>
                <TextField id="outlined-basic" label="Email *" variant="outlined" style={{ width: "100%" }} />
              </Box>
            </Grid>
            <Grid item sm={12}>
              <Box mb={3}>
                <button className="signInBtn">Sign In</button>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Modal>

    </>
  );
}

export default TopSeller
