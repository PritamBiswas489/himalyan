import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import { contactApi } from '../../service/Contact.service';
import { useSnackbar } from 'notistack';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#fb5d36'),
    backgroundColor: '#f97150',
    borderRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    '&:hover': {
        backgroundColor: '#d04726',
    },
}));
const GetTouch = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('');
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [contactErrorMsg, setContactErrorMsg] = useState('');
    const [messageErrorMsg, setMessageErrorMsg] = useState('');
    const [waiting, setWaiting] = useState(false);

    const handleSendMessage = async () => {
        setWaiting(true);
        if (name !== '' && email !== '' && contact !== '' && message !== '') {
            // const res = await axios.get('https://geolocation-db.com/json/')
            // console.log(res.data);
            // setIP(res.data.IPv4)
            const data = {
                name,
                email,
                contact,
                message,
            };
            const sendMessage = await contactApi.getInTouch(data);
            if (sendMessage.status === 200 && sendMessage.data.status === 200) {
                setNameErrorMsg('');
                setEmailErrorMsg('');
                setContactErrorMsg('');
                setMessageErrorMsg('');
                setName('');
                setEmail('');
                setContact('');
                setMessage('');
                enqueueSnackbar(sendMessage.data.message);
            }
            if (sendMessage.status === 422) {
                setNameErrorMsg('');
                setEmailErrorMsg('');
                setContactErrorMsg('');
                setMessageErrorMsg('');
                if (sendMessage.data.error.name) {
                    setNameErrorMsg(sendMessage.data.error.name[0]);
                }
                if (sendMessage.data.error.email) {
                    setEmailErrorMsg(sendMessage.data.error.email[0]);
                }
                if (sendMessage.data.error.contact) {
                    setContactErrorMsg(sendMessage.data.error.contact[0]);
                }
                if (sendMessage.data.error.message) {
                    setMessageErrorMsg(sendMessage.data.error.message[0]);
                }
            }
        } else {
            enqueueSnackbar('Please fill all field !', { variant: 'error' });
        }
        setWaiting(false);
    };

    const handleInput = async (event) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        }
        if (event.target.name === 'email') {
            setEmail(event.target.value);
        }
        if (event.target.name === 'contact') {
            setContact(event.target.value);
        }
        if (event.target.name === 'message') {
            setMessage(event.target.value);
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='relative'>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={3} padding={3} alignItems={'center'}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <iframe
                                    src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14733.751552147369!2d88.41129395!3d22.600117699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1669098814562!5m2!1sen!2sin'
                                    width={'100%'}
                                    height={450}
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading='lazy'
                                    referrerPolicy='no-referrer-when-downgrade'
                                    title='map'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} className=''>
                            <Box>
                                <Paper
                                    sx={{ backgroundColor: 'transparent', boxShadow: 'none', textAlign: 'center' }}
                                    className='sectionTitle'
                                >
                                    <Typography
                                        variant='h6_df'
                                        sx={{
                                            padding: '0',
                                        }}
                                    >
                                        Lorem Ipsum
                                    </Typography>
                                    <Typography variant='h2' display='block'>
                                        Get In Touch
                                    </Typography>
                                </Paper>
                            </Box>
                            <Box
                                component='form'
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}
                                noValidate
                                autoComplete='off'
                            >
                                <Grid item xs={12} md={12} className=''>
                                    <TextField
                                        fullWidth
                                        id='name'
                                        name='name'
                                        label='Name'
                                        required
                                        sx={{
                                            borderRadius: '6px',
                                            fontFamily: 'Inter',
                                            boxShadow: 'rgba(0,0,0,0.2) 0 5px 10px -5px',
                                        }}
                                        value={name}
                                        onChange={(event) => handleInput(event)}
                                    />
                                    {nameErrorMsg ? nameErrorMsg : ''}
                                </Grid>
                                <Grid item xs={12} md={6} className=''>
                                    <TextField
                                        fullWidth
                                        id='email'
                                        name='email'
                                        label='Email'
                                        required
                                        sx={{
                                            borderRadius: '6px',
                                            fontFamily: 'Inter',
                                            boxShadow: 'rgba(0,0,0,0.2) 0 5px 10px -5px',
                                        }}
                                        value={email}
                                        onChange={(event) => handleInput(event)}
                                    />
                                    {emailErrorMsg ? emailErrorMsg : ''}
                                </Grid>
                                <Grid item xs={12} md={6} className=''>
                                    <TextField
                                        fullWidth
                                        id='contact'
                                        name='contact'
                                        label='Phone No'
                                        required
                                        sx={{
                                            borderRadius: '6px',
                                            fontFamily: 'Inter',
                                            boxShadow: 'rgba(0,0,0,0.2) 0 5px 10px -5px',
                                        }}
                                        value={contact}
                                        onChange={(event) => handleInput(event)}
                                    />
                                    {contactErrorMsg ? contactErrorMsg : ''}
                                </Grid>
                                <Grid item xs={12} className=''>
                                    <TextareaAutosize
                                        id='fullWidth'
                                        minRows={8}
                                        name='message'
                                        placeholder='Message'
                                        style={{
                                            resize: 'none',
                                            width: '100%',
                                            border: '#d1d1d1 1px solid',
                                            borderRadius: '6px',
                                            padding: '16.5px 14px',
                                            fontFamily: 'Inter',
                                            boxShadow: 'rgba(0,0,0,0.2) 0 5px 10px -5px',
                                        }}
                                        value={message}
                                        onChange={(event) => handleInput(event)}
                                    />
                                    {messageErrorMsg ? messageErrorMsg : ''}
                                </Grid>
                                <Grid item xs={12} className=''>
                                    {/* <ColorButton
                                        variant='contained'
                                        className='LearnMoreBtn'
                                        onClick={handleSendMessage}
                                    >
                                        Send Message <ArrowForwardIcon />
                                    </ColorButton> */}
                                    {waiting === true ? (
                                        <ColorButton variant='contained' className='LearnMoreBtn'>
                                            Please wait...
                                            <ArrowForwardIcon />
                                        </ColorButton>
                                    ) : (
                                        <ColorButton
                                            variant='contained'
                                            className='LearnMoreBtn'
                                            onClick={handleSendMessage}
                                        >
                                            Send Message <ArrowForwardIcon />
                                        </ColorButton>
                                    )}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default GetTouch;
