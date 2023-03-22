import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Box,
  Card,
  Typography,
  Button,
  Alert
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { Link } from 'react-router-dom';
import { authApi } from '../../service/Auth.service';
import { useSnackbar } from "notistack";

const styles = {
  loginBg: {
    background: `url(${process.env.REACT_APP_URL}images/login.jpg) top center `,
    backgroundAttachment: 'fixed',
    height: '100vh',
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

export default function Login() {
  let navigate = useNavigate();
  // const isMountedRef = useIsMountedRef();
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
  } = methods;
  const onSubmit = async (data) => {
    const signin = await authApi.login(data);

    if (signin.status === 400 && signin.data.success === false) {
      setError(signin.data.message);
      reset();
    } else if (signin.status === 200 && signin.data.success === true) {
      localStorage.setItem('token', signin.data.token);
      localStorage.setItem('user',JSON.stringify(signin.data.user));
      reset();
      enqueueSnackbar('Login successfully !');
      navigate('/home');
    }
  }
  return (
    <>
      <Box style={styles.loginBg}
        sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
          <Box alignItems={'center'} 
            sx={{
              display:'flex',
              maxWidth:'560px',
              width:'100%',
              minHeight:'100vh',
              background:'rgba(255,255,255,.9)',
              padding:'0 40px'
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
                  <Typography variant="h2" align='center' gutterBottom gutterTop fullWidth sx={{
                    width:'100%',
                    margin:'0 auto',
                  }}>
                    So let's log in
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {!!error && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: '100%',
                    }}
                  >
                    <RHFTextField name="email" label="Email address" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField name="password" label="Password" type='password' />
                </Grid>
                <Grid item xs={12}>
                  <Typography component="a" href="/" 
                    sx={{ 
                      textAlign:'right',
                      color:'#333',
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Login
                </LoadingButton> */}
                  {/* <Button type="submit">Primary</Button> */}
                  {/* <input type="submit" /> */}
                  <ColorButton type="submit" variant="contained" className="LearnMoreBtn">Log In <ArrowForwardIcon /></ColorButton>
                </Grid>
              </Grid>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </>
  );
}