import * as React from 'react';
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
    Grid,
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
    IconButton,
    Avatar
} from '@mui/material';

import {
    ContactPageOutlined as ContactPageOutlinedIcon,
    Hiking as HikingIcon,
    InfoOutlined as InfoOutlinedIcon,

} from '@mui/icons-material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import TextareaAutosize from '@mui/base/TextareaAutosize';


const SubitButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#fb5d36'),
    backgroundColor: '#f97150',
    borderRadius: 4,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
    // width: '100%',
    boxShadow: 'none',
    textTransform: 'uppercase',
    '&:hover': {
        backgroundColor: '#d04726',
    },
}));





// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';







// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const steps = ['Select Tour', 'Contat Details', 'Payment', 'Complete'];
const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

const Steps = () => {
    const [activeStep, setActiveStep] = React.useState(1);
    const [completed, setCompleted] = React.useState({});

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
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        await setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const [mr, setMr] = React.useState('');

    const handleChange = (event) => {
        setMr(event.target.value);
    };
    return (
        <>
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
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
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
                                                    <Box noValidate className='contDtlsForm'
                                                        sx={{ flexGrow: 1, marginTop: '30px', }}>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>First Name*</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10} container spacing={2}>
                                                                <Grid item xs={2} md={2} lg={2}>
                                                                    <FormControl size="small" sx={{ width: '100%' }}>
                                                                        <Select fullWidth
                                                                            value={mr}
                                                                            onChange={handleChange}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            {/* <MenuItem value="">
                                                                                Mr
                                                                            </MenuItem> */}
                                                                            <MenuItem value="">Mr</MenuItem>
                                                                            <MenuItem value={20}>Ms</MenuItem>
                                                                            <MenuItem value={30}>Mrs</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={10} md={10} lg={10}>
                                                                    <TextField fullWidth defaultValue="Full Name" id="" />
                                                                </Grid>


                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Email*</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10}>
                                                                <TextField fullWidth defaultValue="Email@email.com" id="" />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Phone*</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10}>
                                                                <TextField fullWidth defaultValue="+91 1234 567 890" id="" />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Country*</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10}>
                                                                <TextField fullWidth defaultValue="+91 1234 567 890" id="" />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Address</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10}>
                                                                <TextField className='input-5' fullWidth defaultValue="Lorem Ipsum" id="" sx={{}} />
                                                                <TextField fullWidth defaultValue="Lorem Ipsum" id="" />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Comments  </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10}>
                                                                <TextareaAutosize
                                                                    aria-label="empty textarea"
                                                                    placeholder="Empty"
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
                                                    <Box noValidate className='contDtlsForm'
                                                        sx={{ flexGrow: 1, marginTop: '30px', }}>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Traveller 1</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10} container spacing={2}>
                                                                <Grid item xs={2} md={2} lg={2}>
                                                                    <FormControl size="small" sx={{ width: '100%' }}>
                                                                        <Select fullWidth
                                                                            value={mr}
                                                                            onChange={handleChange}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            {/* <MenuItem value="">
                                                                                Mr
                                                                            </MenuItem> */}
                                                                            <MenuItem value="">Mr</MenuItem>
                                                                            <MenuItem value={20}>Ms</MenuItem>
                                                                            <MenuItem value={30}>Mrs</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={10} md={10} lg={10}>
                                                                    <TextField fullWidth defaultValue="Full Name" id="" />
                                                                </Grid>


                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Traveller 2</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10} container spacing={2}>
                                                                <Grid item xs={2} md={2} lg={2}>
                                                                    <FormControl size="small" sx={{ width: '100%' }}>
                                                                        <Select fullWidth
                                                                            value={mr}
                                                                            onChange={handleChange}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            {/* <MenuItem value="">
                                                                                Mr
                                                                            </MenuItem> */}
                                                                            <MenuItem value="">Mr</MenuItem>
                                                                            <MenuItem value={20}>Ms</MenuItem>
                                                                            <MenuItem value={30}>Mrs</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={10} md={10} lg={10}>
                                                                    <TextField fullWidth defaultValue="Full Name" id="" />
                                                                </Grid>


                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Traveller 3</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10} container spacing={2}>
                                                                <Grid item xs={2} md={2} lg={2}>
                                                                    <FormControl size="small" sx={{ width: '100%' }}>
                                                                        <Select fullWidth
                                                                            value={mr}
                                                                            onChange={handleChange}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            {/* <MenuItem value="">
                                                                                Mr
                                                                            </MenuItem> */}
                                                                            <MenuItem value="">Mr</MenuItem>
                                                                            <MenuItem value={20}>Ms</MenuItem>
                                                                            <MenuItem value={30}>Mrs</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={10} md={10} lg={10}>
                                                                    <TextField fullWidth defaultValue="Full Name" id="" />
                                                                </Grid>


                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Traveller 4</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10} container spacing={2}>
                                                                <Grid item xs={2} md={2} lg={2}>
                                                                    <FormControl size="small" sx={{ width: '100%' }}>
                                                                        <Select fullWidth
                                                                            value={mr}
                                                                            onChange={handleChange}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            {/* <MenuItem value="">
                                                                                Mr
                                                                            </MenuItem> */}
                                                                            <MenuItem value="">Mr</MenuItem>
                                                                            <MenuItem value={20}>Ms</MenuItem>
                                                                            <MenuItem value={30}>Mrs</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={10} md={10} lg={10}>
                                                                    <TextField fullWidth defaultValue="Full Name" id="" />
                                                                </Grid>


                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Traveller 5</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10} container spacing={2}>
                                                                <Grid item xs={2} md={2} lg={2}>
                                                                    <FormControl size="small" sx={{ width: '100%' }}>
                                                                        <Select fullWidth
                                                                            value={mr}
                                                                            onChange={handleChange}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            {/* <MenuItem value="">
                                                                                Mr
                                                                            </MenuItem> */}
                                                                            <MenuItem value="">Mr</MenuItem>
                                                                            <MenuItem value={20}>Ms</MenuItem>
                                                                            <MenuItem value={30}>Mrs</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={10} md={10} lg={10}>
                                                                    <TextField fullWidth defaultValue="Full Name" id="" />
                                                                </Grid>


                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={12} md={2} lg={2}>
                                                                <Typography variant='body1'>Traveller 6</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10} lg={10} container spacing={2}>
                                                                <Grid item xs={2} md={2} lg={2}>
                                                                    <FormControl size="small" sx={{ width: '100%' }}>
                                                                        <Select fullWidth
                                                                            value={mr}
                                                                            onChange={handleChange}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            {/* <MenuItem value="">
                                                                                Mr
                                                                            </MenuItem> */}
                                                                            <MenuItem value="">Mr</MenuItem>
                                                                            <MenuItem value={20}>Ms</MenuItem>
                                                                            <MenuItem value={30}>Mrs</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={10} md={10} lg={10}>
                                                                    <TextField fullWidth defaultValue="Full Name" id="" />
                                                                </Grid>


                                                            </Grid>
                                                        </Grid>

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
                                                    <Box className='additionalService'
                                                        sx={{ flexGrow: 1, marginTop: '30px', }}>

                                                        <TableContainer>
                                                            <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>&nbsp;</TableCell>
                                                                        <TableCell component="th" align="center"><strong>Price</strong></TableCell>
                                                                        <TableCell align="center"><strong>Person</strong></TableCell>

                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            <FormGroup>
                                                                                <FormControlLabel control={<Checkbox defaultChecked />} label="Trisuli Rafting (Per Person)" />
                                                                            </FormGroup>

                                                                        </TableCell>
                                                                        <TableCell className='colOrange' align="center">$45 X</TableCell>
                                                                        <TableCell align="center">
                                                                            <TextField id="" style={{ width: '80px', }} />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            <FormGroup>
                                                                                <FormControlLabel control={<Checkbox />} label="Chitwan Safari (Per Person)" />
                                                                            </FormGroup>

                                                                        </TableCell>
                                                                        <TableCell className='colOrange' align="center">$138 X</TableCell>
                                                                        <TableCell align="center">
                                                                            <TextField id="" style={{ width: '80px', }} />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            <FormGroup>
                                                                                <FormControlLabel control={<Checkbox />} label="Mountain Flight (Per Person)" />
                                                                            </FormGroup>

                                                                        </TableCell>
                                                                        <TableCell className='colOrange' align="center">$192 X</TableCell>
                                                                        <TableCell align="center">
                                                                            <TextField id="" style={{ width: '80px', }} />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            <FormGroup>
                                                                                <FormControlLabel control={<Checkbox />} label="Kathmandu Tour (Per Person)" />
                                                                            </FormGroup>

                                                                        </TableCell>
                                                                        <TableCell className='colOrange' align="center">$86 X</TableCell>
                                                                        <TableCell align="center">
                                                                            <TextField id="" style={{ width: '80px', }} />
                                                                        </TableCell>
                                                                    </TableRow>
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
                                                    <Box sx={{
                                                        display: 'flex',

                                                    }}>
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
                                                    <Box noValidate className='contDtlsForm'
                                                        sx={{ flexGrow: 1, marginTop: '30px', }}>
                                                        <Grid container spacing={2} mb={2}>
                                                            <Grid item xs={6} md={6} lg={6}>
                                                                <Box className='addressFlex'>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Full Name : </li>
                                                                        <li className='value'>Name Surname</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Email : </li>
                                                                        <li className='value'>email@email.com</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Phone : </li>
                                                                        <li className='value'>9804259865</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Country : </li>
                                                                        <li className='value'>India</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Address : </li>
                                                                        <li className='value'>AD 218 , Sector 1 , Near AD Park<br />Saltlake City, Kolkata 700064
                                                                            <br />West Bengal, India</li>
                                                                    </ul>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={6} md={6} lg={6}>
                                                                <Box className='addressFlex'>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Traveller 1 : </li>
                                                                        <li className='value'>Name Surname</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Traveller 1 : </li>
                                                                        <li className='value'>Name Surname</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Traveller 1 : </li>
                                                                        <li className='value'>Name Surname</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Traveller 1 : </li>
                                                                        <li className='value'>Name Surname</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Traveller 1 : </li>
                                                                        <li className='value'>Name Surname</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Traveller 1 : </li>
                                                                        <li className='value'>Name Surname</li>
                                                                    </ul>
                                                                    <ul className='d-flex'>
                                                                        <li className='info'>Traveller 1 : </li>
                                                                        <li className='value'>Name Surname</li>
                                                                    </ul>
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
                                                    <Box noValidate className='contDtlsForm'
                                                        sx={{ flexGrow: 1, marginTop: '30px', }}>
                                                        <Box className='addressFlex'>
                                                            <ul className='d-flex'>
                                                                <li className='info'>Full Name : </li>
                                                                <li className='value'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a 					galley of type and scrambled it to make a type specimen book Lorem Ipsum is simply dummy 						text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 						dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 					it to make a type specimen book</li>
                                                            </ul>
                                                        </Box>
                                                    </Box>

                                                </CardContent>
                                            </Card>

                                            <Card style={{
                                                marginTop: '30px',
                                                boxShadow: 'none',
                                                // border: '#ddd 1px solid',
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

                                                                <Box className='paymentAreaInner'
                                                                    sx={{
                                                                        marginTop: '1rem'
                                                                    }}
                                                                >
                                                                    <FormControlLabel value="card" control={<Radio />} label="Pay With " /><span style={{
                                                                        position: 'relative',
                                                                        left: '-10px',
                                                                        top: '2px',
                                                                        color: '#f97150',
                                                                        fontWeight: 'bold',
                                                                        fontSize: '13px',
                                                                    }}>Card</span>
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
                                                                                    />
                                                                                </Box>
                                                                                <Grid container spacing={2} mb={2}>
                                                                                    <Grid item xs={12} md={6} lg={6}>
                                                                                        <Box mb={2}>
                                                                                            <InputLabel shrink htmlFor="bootstrap-input">
                                                                                                Expiration
                                                                                            </InputLabel>
                                                                                            <TextField
                                                                                                hiddenLabel
                                                                                                id="filled-hidden-label-normal"
                                                                                                size="small"
                                                                                                fullWidth
                                                                                            />
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={6} lg={6}>
                                                                                        <Box mb={2}>
                                                                                            <InputLabel shrink htmlFor="bootstrap-input">
                                                                                                CVV
                                                                                                <Tooltip title={longText} followCursor>
                                                                                                    <Button style={{ padding: '0' }}> <InfoOutlinedIcon /></Button>
                                                                                                </Tooltip>
                                                                                            </InputLabel>
                                                                                            <TextField
                                                                                                hiddenLabel
                                                                                                id="filled-hidden-label-normal"
                                                                                                size="small"
                                                                                                fullWidth
                                                                                            />
                                                                                        </Box>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={4} lg={4}>
                                                                                <Box className='cardImg'>
                                                                                    <img src="../images/cards.png" alt />
                                                                                </Box>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </Box>
                                                                </Box>
                                                                <Box className='paymentAreaInner'
                                                                    sx={{
                                                                        marginTop: '1rem'
                                                                    }}
                                                                >
                                                                    <FormControlLabel value="Pay With" control={<Radio />} label="Pay With " /><span style={{
                                                                        position: 'relative',
                                                                        left: '-10px',
                                                                        top: '7px',
                                                                    }}><img src="../images/paypal.png" alt style={{ maxWidth: '100%' }} /></span>
                                                                </Box>
                                                                <Box className='paymentAreaInner'
                                                                    sx={{
                                                                        marginTop: '1rem'
                                                                    }}
                                                                >
                                                                    <FormControlLabel value="Pay Later via Bank Transfer " control={<Radio />} label="Pay Later via Bank Transfer " />
                                                                </Box>

                                                            </RadioGroup>
                                                        </Box>
                                                        <Box className=''
                                                            sx={{
                                                                marginTop: '1rem'
                                                            }}
                                                        >
                                                            <FormControlLabel control={<Checkbox defaultChecked />} label="* II agree with Teerms of service and Privact Statement." />
                                                        </Box>
                                                        <Box>
                                                            <SubitButton variant="contained" className="LearnMoreBtn"
                                                                sx={{
                                                                    marginTop: "30px",
                                                                    width: '100%',
                                                                }}
                                                            >
                                                                submit <ArrowForwardIcon />
                                                            </SubitButton>
                                                        </Box>
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
                                                    // border: '#ddd 1px solid',
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
                                                            {/* <img src="../images/check.png" alt /> */}
                                                            <Typography variant='body1'>
                                                                Your booking detail has been sent to your email. You can check your payment status from your Dashboard
                                                            </Typography>
                                                            <SubitButton variant="contained" className="LearnMoreBtn"
                                                                sx={{
                                                                    marginTop: "30px",
                                                                }}
                                                            >
                                                                Go to my Dashboard
                                                            </SubitButton>
                                                        </Box>

                                                    </CardContent>
                                                </Card>
                                            </>) : ''
                                        )
                                    )
                                }
                                {/* {
                                    (() => {
                                        switch (activeStep) {
                                            case 0:
                                                return (<>step details {activeStep}</>)
                                                break;
                                            case 1:
                                                return (<>step details {activeStep}</>)
                                                break;
                                            case 2:
                                                return (<>step details {activeStep}</>)
                                                break;
                                            default:
                                                break;
                                        }
                                    })
                                } */}
                            </Typography>
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
                                <Button onClick={handleNext} sx={{ mr: 1 }} disabled={activeStep === 3}>
                                    Next
                                </Button>
                                {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                            Step {activeStep + 1} already completed
                                        </Typography>
                                    ) : (
                                        <Button onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1
                                                ? 'Finish'
                                                : 'Complete Step'}
                                        </Button>
                                    ))}
                            </Box>
                        </React.Fragment>
                    )}
                </div>
            </Box>
        </>
    )
}

export default Steps
