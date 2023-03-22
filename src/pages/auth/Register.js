import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField, RHFSelect } from '../../components/hook-form';
import { helperApi } from '../../service/Helper.service';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { authApi } from '../../service/Auth.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from "notistack";

const styles = {
  loginBg: {
    background: `url(${process.env.REACT_APP_URL}images/login.jpg) top center `,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    padding:'12px 0',
  }
};
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#fb5d36'),
  backgroundColor: '#161e4c',
  borderRadius: 6,
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 12,
  paddingBottom: 12,
  width:'100%',
  boxShadow:'none',
  fontWeight:'900',
  '&:hover': {
    backgroundColor: '#3646a4',
  },
}));

const Register = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confpassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    contact: Yup.string().required('Contact is required'),
  });

  const defaultValues = {
    password: '',
    confpassword: '',
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    country: '',
    DOB: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    getValues,
    handleSubmit,
  } = methods;

  
  useEffect(()=>{
    fetchCountry();
  },[]);
  const fetchCountry = async() => {
    const countrydata = await helperApi.country();
    setCountry(countrydata.data.data);
  }

  const onSubmit = async (data) => {
    const datas = {
      name      : `${getValues('firstname')} ${getValues('lastname')}`,
      email     : getValues('email'),
      password  : getValues('password'),
      dob       : getValues('DOB'),
      gender    : 'Male',
      country   : getValues('country'),
      phone     : getValues('contact'),
    }
    const signup = await authApi.register(datas);

    if (signup.status === 400 && signup.data.success === false) {
      setError(signup.data.message);
      reset();
    } else if (signup.status === 200) {
      if (signup.data.success === true) {

        const signin = await authApi.login(data);

        if (signin.status === 200 && signin.data.success === true) {
          localStorage.setItem('token', signin.data.token);
          localStorage.setItem('user',JSON.stringify(signin.data.user));
          if (params.slug) {
            reset();
            enqueueSnackbar('Login successfully !');
            navigate(-1);
          } else {
            reset();
            enqueueSnackbar('Login successfully !');
            navigate('/home');
          }
        }
      } else {
        if (signup.data.error.name) {
          enqueueSnackbar(signup.data.error.name[0], {variant:'error'} );
        }
        if (signup.data.error.email) {
          enqueueSnackbar(signup.data.error.email[0], {variant:'error'} );
        }
        // setError(signup.data.message);
        // reset();
      }
    }
  }

  return (
    <>
      <Box style={styles.loginBg}
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box 
          sx={{
            width: '80%',
            margin: '0 auto',
            display:'flex',
            justifyContent:'flex-end',
          }}
        >
          <Box 
            sx={{
              display:'flex',
              maxWidth:'700px',
              width:'100%',
              background:'rgba(255,255,255,.9)',
            }}
          >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3} padding={3} alignItems={'center'}>
                <Grid item xs={12}>
                  <Card gutterBottom sx={{
                    backgroundColor:'transparent',
                    boxShadow:'none',
                    width:'100%',
                    textAlign:'center'
                  }}>
                    <Link to={`/`}>
                      <img src={`${process.env.REACT_APP_URL}images/logo-b.png`} alt="" />
                    </Link>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2" align='center' gutterBottom gutterTop fullWidth sx={{ width:'100%' }}>
                    Register into your account
                  </Typography>
                  <Typography variant="body2" align='center' gutterBottom gutterTop fullWidth sx={{ width:'100%' }}>
                    Enter your personal details and start journey with us
                  </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                  <Box>
                    <RHFTextField name="username" label="Username" />
                  </Box>
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <RHFTextField type="password" name="password" label="Password" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <RHFTextField type="password" name="confpassword" label="Confirm Password" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <RHFTextField name="firstname" label="First Name" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <RHFTextField name="lastname" label="Last Name" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <RHFTextField name="email" label="Email" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <RHFTextField name="contact" label="Phone" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <RHFSelect name="country" label="Country">
                      <option value="" />
                      {country.map((country, index) => (
                        <option key={country.id} value={country.id} key={index}>
                          {country.name}
                        </option>
                      ))}
                    </RHFSelect>
                  </Box>
                </Grid>
                <Grid xs={12} md={6} container spacing={2} padding={2} alignItems={'center'}>
                  <Grid item xs={12}>
                    <Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="DOB"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <DatePicker
                              label="DOB"
                              value={getValues('DOB')}
                              onChange={(newValue) => {
                                field.onChange(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} fullWidth error={!!error} helperText={error?.message} />}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel sx={{margin:'0'}} control={<Checkbox />} label="Creating an account means you're okay with our" /> <Link to="/sign-up">Terms of Service</Link> and <Link to="/sign-up">Privacy Statement.</Link> 
                </Grid>
                <Grid item xs={12}>
                  <ColorButton type="submit" variant="contained" className="LearnMoreBtn">Log In <ArrowForwardIcon /></ColorButton>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                  >
                    Already a member? <Link to="/auth/login">Sign In</Link>
                  </Typography>
                </Grid>
              </Grid>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Register