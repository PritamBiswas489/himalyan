import React, { useEffect, useState, useMemo } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Typography,
    Button,
    Stepper,
    Step,
    StepButton,
    Grid,
    Radio,
    Stack,
    Checkbox,
    FormControlLabel,
    TextField,
    InputBase,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Slider,
} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useSnackbar } from 'notistack';

import { Parallax } from 'react-parallax';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdFamilyRestroom, MdGroups } from 'react-icons/md';
import { GrUser } from 'react-icons/gr';
import { BsCalendar2Date, BsWallet } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { TfiAlarmClock } from 'react-icons/tfi';
import { IoBedOutline } from 'react-icons/io5';
import { GiCampingTent, GiRockingChair } from 'react-icons/gi';
import { TbBrandBooking, TbSofa } from 'react-icons/tb';
import { CiWallet } from 'react-icons/ci';
import { ImRadioChecked2 } from 'react-icons/im';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import SearchIcon from '@mui/icons-material/Search';
import { borderRadius } from '@mui/system';
import { destinationListService, tourSearchService, addTripService } from '../../service/CustomizeTrip.service.js';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f6f6f6',
    border: '#ddd 1px solid',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),

        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const steps = ['Who ', 'When', 'Where', 'Accommodation', 'Budget', 'Tailor-made tour', 'Finish'];

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 10;

const CustomizeTrip = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        resetField,
    } = useForm({
        defaultValues: {
            startArrivalDate: new Date(),
            endArrivalDate: new Date(),
            approxMonth: new Date(),
            howYouTravelling: 'solo',
            noOfAdult: 1,
            noOfChildren: 0,
            arrivalDate: 'exact_date',
            budgetRange: [2500, 5000],
            preferredAccommodation: 'basic',
            flexibleBudget: 'yes',
            tripType: 'tailor_made_tour',
            tripPhase: 'still_planning',
            preferredContact: 'phone',
            acceptPrivacyPolicy: 1,
        },
    });

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [isActive, setIsActive] = useState(false);

    const [age, setAge] = useState('');
    const [adult, setAdult] = useState(1);
    const [children, setChildren] = useState(0);
    const [arrivalDate, setArrivalDate] = useState('exact_date');
    const [selectedValue, setSelectedValue] = useState('solo');
    const [startArrivalDate, setStartArrivalDate] = useState(dayjs(new Date()));
    const [endArrivalDate, setEndArrivalDate] = useState(dayjs(new Date()));
    const [approxMonth, setApproxMonth] = useState(dayjs(new Date()));
    const [preferredAccommodation, setPreferredAccommodation] = useState('basic');
    const [value1, setValue1] = useState([2500, 5000]);
    const [flexibleBudget, setFlexibleBudget] = useState('yes');
    const [tripType, setTripType] = useState('tailor_made_tour');
    const [tripPhase, setTripPhase] = useState('still_planning');
    const [hearAboutUs, setHearAboutUs] = useState('');
    const [preferredContact, setPreferredContact] = useState('phone');
    const [destinations, setDestinations] = useState([]);
    const [tours, setTours] = useState([]);
    const [destinationCheck, setDestinationCheck] = useState([]);
    const [tourCheck, setTourCheck] = useState([]);
    const [value2, setValue2] = useState([20, 37]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        getDestinations();
    }, []);

    const getDestinations = async () => {
        const result = await destinationListService();
        if (result.status === 200) {
            setDestinations(result.data.data);
        }
    };
    const getTour = async (data) => {
        const result = await tourSearchService(data);
        if (result.status === 200) {
            setTours(result.data.data);
        }
    };
    useMemo(() => {
        let formData = {
            destination_id: destinationCheck,
            keyword,
        };

        getTour(formData);
    }, [destinationCheck, keyword]);

    const handleDestinationCheck = async (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setDestinationCheck([...destinationCheck, value]);
        } else {
            setDestinationCheck(destinationCheck.filter((val) => val !== value));
        }
    };
    const handleTourCheck = async (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setTourCheck([...tourCheck, value]);
        } else {
            setTourCheck(tourCheck.filter((val) => val !== value));
        }
    };

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

    const handleNext = () => {
        const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
        setActiveStep(newActiveStep);
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

    const handleClick = (event) => {
        setIsActive((current) => !current);
    };

    const handleChange = (event) => {
        // setSelectedValue(event.target.value);
        setAge(event.target.value);
        // setValue(newValue);
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    //   };

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue2([clamped - minDistance, clamped]);
            }
        } else {
            setValue2(newValue);
        }
    };
    const onSubmit = async (data) => {
        const formData = {
            ...data,
            destinationCheck,
            tourCheck,
        };
        console.log('formData', formData);
        let result = await addTripService(formData);
        if (result.data.status === 200) {
            enqueueSnackbar('Trip added successfully !', { variant: 'success' });
        } else {
            enqueueSnackbar('Something went wrong!', { variant: 'error' });
        }

        // console.log('startArrivalDate', new Date(data.startArrivalDate));
        /* let formData = {
            'name': data.name,
            'name_fr': data.name_fr,
            'name_ar': data.name_ar,
            'category': data.category.value,
            'sub_category': data.sub_category.value,
            'product_image': prodImg,
        }
        let result = await addProductRequest(formData);
        if (result.data.status === 200) {
            SetAlertType('success');
            SetAlertMessage('Product type request send successfully !');
            reset();
            setProdImg('');
        }
        else {
            SetAlertType('error');
            SetAlertMessage(result.data.error);

        }
        window.scrollTo(0, 0); */
    };

    return (
        <>
            <Box className='StepBan relative'>
                <Parallax bgImage='../images/strp-ban.jpg' bgImageAlt='' strength={100}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'flex-end',
                            height: '320px',
                            width: '100%',
                            margin: '0 auto',
                            padding: '0 50px',
                            position: 'relative',
                            zIndex: '1',
                        }}
                        className=' relative ph-80'
                    >
                        <Typography variant='h2' style={{ color: '#fff', paddingBottom: '4.7rem' }}>
                            Everest Chola Pass Trek
                        </Typography>
                    </Box>
                </Parallax>
            </Box>
            <Box sx={{ flexGrow: 1 }} className='stepWrapArea'>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3} padding={3}>
                            <Grid item xs={12}>
                                <Box sx={{ width: '100%' }}>
                                    <Stepper alternativeLabel activeStep={activeStep} className='roundNumber'>
                                        {steps.map((label, index) => (
                                            <Step key={label} completed={completed[index]}>
                                                <StepButton color='inherit' onClick={handleStep(index)}>
                                                    {label}
                                                </StepButton>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    <div>
                                        {allStepsCompleted() ? (
                                            <React.Fragment>
                                                <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                    <Box sx={{ flex: '1 1 auto' }} />
                                                    <Button onClick={handleReset}>Reset</Button>
                                                </Box>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                                    {activeStep === 0 ? (
                                                        <>
                                                            <Box sx={{ flexGrow: 1 }}>
                                                                <Grid container spacing={5}>
                                                                    <Grid item xs={12} sx={{ marginTop: '2rem' }}>
                                                                        <Typography variant='h2' sx={{ textAlign: 'center' }}>
                                                                            How are you traveling? *
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='howYouTravelling'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={selectedValue === 'solo'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setSelectedValue(e.target.value);
                                                                                        }}
                                                                                        value='solo'
                                                                                        inputProps={{
                                                                                            'aria-label': 'A',
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />

                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <GrUser />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    Solo
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='howYouTravelling'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={selectedValue === 'couple'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setSelectedValue(e.target.value);
                                                                                        }}
                                                                                        value='couple'
                                                                                        inputProps={{
                                                                                            'aria-label': 'B',
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />

                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <HiOutlineUsers />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    Couple
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='howYouTravelling'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={selectedValue === 'family'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setSelectedValue(e.target.value);
                                                                                        }}
                                                                                        value='family'
                                                                                        inputProps={{
                                                                                            'aria-label': 'B',
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <MdFamilyRestroom />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    Family
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='howYouTravelling'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={selectedValue === 'group'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setSelectedValue(e.target.value);
                                                                                        }}
                                                                                        value='group'
                                                                                        inputProps={{
                                                                                            'aria-label': 'B',
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />

                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <MdGroups />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    Group
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    {(selectedValue === 'group' || selectedValue === 'family') && (
                                                                        <Grid item xs={12} className='familyDropDown'>
                                                                            <ul className='d-flex'>
                                                                                <li>
                                                                                    <FormControl fullWidth>
                                                                                        <InputLabel id='demo-simple-select-label'>No of Adults</InputLabel>
                                                                                        <Controller
                                                                                            name='noOfAdult'
                                                                                            control={control}
                                                                                            render={({ field }) => (
                                                                                                <Select
                                                                                                    {...field}
                                                                                                    labelId='demo-simple-select-label'
                                                                                                    id='demo-simple-select'
                                                                                                    value={adult}
                                                                                                    label='No of Adults'
                                                                                                    onChange={(e) => {
                                                                                                        field.onChange(e);
                                                                                                        setAdult(e.target.value);
                                                                                                    }}
                                                                                                >
                                                                                                    <MenuItem value={1}>1</MenuItem>
                                                                                                    <MenuItem value={2}>2</MenuItem>
                                                                                                    <MenuItem value={3}>3</MenuItem>
                                                                                                    <MenuItem value={4}>4</MenuItem>
                                                                                                    <MenuItem value={5}>5</MenuItem>
                                                                                                    <MenuItem value={6}>6</MenuItem>
                                                                                                    <MenuItem value={7}>7</MenuItem>
                                                                                                    <MenuItem value={8}>8</MenuItem>
                                                                                                    <MenuItem value={9}>9</MenuItem>
                                                                                                    <MenuItem value={10}>10</MenuItem>
                                                                                                </Select>
                                                                                            )}
                                                                                            rules={{
                                                                                                required: 'This is required',
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </li>
                                                                                <li>
                                                                                    <FormControl fullWidth>
                                                                                        <InputLabel id='demo-simple-select-label'>No of Children</InputLabel>
                                                                                        <Controller
                                                                                            name='noOfChildren'
                                                                                            control={control}
                                                                                            render={({ field }) => (
                                                                                                <Select
                                                                                                    {...field}
                                                                                                    labelId='demo-simple-select-label'
                                                                                                    id='demo-simple-select'
                                                                                                    value={children}
                                                                                                    label='No of Children'
                                                                                                    onChange={(e) => {
                                                                                                        field.onChange(e);
                                                                                                        setChildren(e.target.value);
                                                                                                    }}
                                                                                                >
                                                                                                    <MenuItem value={0}>0</MenuItem>
                                                                                                    <MenuItem value={1}>1</MenuItem>
                                                                                                    <MenuItem value={2}>2</MenuItem>
                                                                                                    <MenuItem value={3}>3</MenuItem>
                                                                                                    <MenuItem value={4}>4</MenuItem>
                                                                                                    <MenuItem value={5}>5</MenuItem>
                                                                                                    <MenuItem value={6}>6</MenuItem>
                                                                                                    <MenuItem value={7}>7</MenuItem>
                                                                                                    <MenuItem value={8}>8</MenuItem>
                                                                                                    <MenuItem value={9}>9</MenuItem>
                                                                                                    <MenuItem value={10}>10</MenuItem>
                                                                                                </Select>
                                                                                            )}
                                                                                            rules={{
                                                                                                required: 'This is required',
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </li>
                                                                            </ul>
                                                                        </Grid>
                                                                    )}
                                                                    {/* <button type='submit'>submit</button> */}
                                                                </Grid>
                                                            </Box>
                                                        </>
                                                    ) : activeStep === 1 ? (
                                                        <>
                                                            <Box sx={{ flexGrow: 1 }}>
                                                                <Grid container spacing={5}>
                                                                    <Grid item xs={12} sx={{ marginTop: '2rem' }}>
                                                                        <Typography variant='h2' sx={{ textAlign: 'center' }}>
                                                                            Arrival Date *
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={4}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='arrivalDate'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={arrivalDate === 'exact_date'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setArrivalDate(e.target.value);
                                                                                        }}
                                                                                        value='exact_date'
                                                                                        // name='radio-buttons'
                                                                                        inputProps={{ 'aria-label': 'A' }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <BsCalendar2Date />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    I have my exact travel date
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={4}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='arrivalDate'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={arrivalDate === 'approx_date'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setArrivalDate(e.target.value);
                                                                                        }}
                                                                                        value='approx_date'
                                                                                        // name='radio-buttons'
                                                                                        inputProps={{ 'aria-label': 'B' }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <SlCalender />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    I have approximate dates
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={4}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='arrivalDate'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={arrivalDate === 'decide_later'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setArrivalDate(e.target.value);
                                                                                        }}
                                                                                        value='decide_later'
                                                                                        // name='radio-buttons'
                                                                                        inputProps={{ 'aria-label': 'C' }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <TfiAlarmClock />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    I will decide later
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>

                                                                    <Grid item xs={12} className='familyDropDown'>
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <ul className='d-flex'>
                                                                                {arrivalDate === 'exact_date' && (
                                                                                    <>
                                                                                        <li>
                                                                                            <Stack>
                                                                                                <Controller
                                                                                                    name='startArrivalDate'
                                                                                                    control={control}
                                                                                                    render={({ field }) => (
                                                                                                        <DesktopDatePicker
                                                                                                            {...field}
                                                                                                            label='Arrival Date *'
                                                                                                            inputFormat='MM/DD/YYYY'
                                                                                                            value={startArrivalDate}
                                                                                                            onChange={(e) => {
                                                                                                                field.onChange(e);
                                                                                                                setStartArrivalDate(e);
                                                                                                            }}
                                                                                                            renderInput={(params) => <TextField {...params} />}
                                                                                                        />
                                                                                                    )}
                                                                                                    rules={{
                                                                                                        required: 'This is required',
                                                                                                    }}
                                                                                                />
                                                                                            </Stack>
                                                                                        </li>
                                                                                        <li>
                                                                                            <Stack>
                                                                                                <Controller
                                                                                                    name='endArrivalDate'
                                                                                                    control={control}
                                                                                                    render={({ field }) => (
                                                                                                        <DesktopDatePicker
                                                                                                            {...field}
                                                                                                            label='Departure Date *'
                                                                                                            inputFormat='MM/DD/YYYY'
                                                                                                            value={endArrivalDate}
                                                                                                            onChange={(e) => {
                                                                                                                field.onChange(e);
                                                                                                                setEndArrivalDate(e);
                                                                                                            }}
                                                                                                            renderInput={(params) => <TextField {...params} />}
                                                                                                        />
                                                                                                    )}
                                                                                                    rules={{
                                                                                                        required: 'This is required',
                                                                                                    }}
                                                                                                />
                                                                                            </Stack>
                                                                                        </li>
                                                                                    </>
                                                                                )}

                                                                                {arrivalDate === 'approx_date' && (
                                                                                    <li>
                                                                                        <Stack>
                                                                                            <Controller
                                                                                                name='approxMonth'
                                                                                                control={control}
                                                                                                render={({ field }) => (
                                                                                                    <DesktopDatePicker
                                                                                                        {...field}
                                                                                                        views={['month', 'year']}
                                                                                                        label='Month *'
                                                                                                        inputFormat='MM/YYYY'
                                                                                                        value={approxMonth}
                                                                                                        onChange={(e) => {
                                                                                                            field.onChange(e);
                                                                                                            setApproxMonth(e);
                                                                                                        }}
                                                                                                        renderInput={(params) => <TextField {...params} />}
                                                                                                    />
                                                                                                )}
                                                                                                rules={{
                                                                                                    required: 'This is required',
                                                                                                }}
                                                                                            />
                                                                                        </Stack>
                                                                                    </li>
                                                                                )}
                                                                            </ul>
                                                                        </LocalizationProvider>
                                                                        <button type='submit'>submit</button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </>
                                                    ) : activeStep === 2 ? (
                                                        <>
                                                            <Box sx={{ flexGrow: 1 }}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} sx={{ marginTop: '2rem' }}>
                                                                        <Typography variant='h2' sx={{ textAlign: 'center' }}>
                                                                            Choose Your Destination *
                                                                        </Typography>
                                                                    </Grid>

                                                                    {destinations?.map((val, i) => (
                                                                        <Grid item xs={6} md={3}>
                                                                            <Box className='checkbox-wrap'>
                                                                                <Box className='inside'>
                                                                                    <FormControlLabel
                                                                                        control={
                                                                                            // <Controller
                                                                                            //     name='destination[]'
                                                                                            //     control={control}
                                                                                            //     render={({ field }) => <Checkbox {...field} fullWidth value={val.id} />}
                                                                                            //     rules={{
                                                                                            //         required: 'This is required',
                                                                                            //     }}
                                                                                            // />
                                                                                            <Checkbox fullWidth value={val.id} onChange={handleDestinationCheck} />
                                                                                        }
                                                                                        label={val.name}
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>
                                                                    ))}
                                                                    {/* <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox fullWidth />} label='Peru' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Nepal' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Tibat' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Bhutan' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='India' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Tanzania' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Viatnam' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Thailand' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid> */}
                                                                    <Grid item xs={12}>
                                                                        <Box className='checkboxWrapBottom'>
                                                                            <FormControlLabel
                                                                                control={<Checkbox />}
                                                                                label='I’m not sure which trip to select. Can you suggest me?'
                                                                            />
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} sx={{ marginTop: '2rem' }}>
                                                                        <Box
                                                                            sx={{
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between',
                                                                                alignItems: 'center',
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                variant='h4'
                                                                                sx={{
                                                                                    fontWeight: '800',
                                                                                    fontSize: '1.75rem',
                                                                                }}
                                                                            >
                                                                                What sort of activities do you want? *
                                                                            </Typography>
                                                                            <Box>
                                                                                <Search>
                                                                                    <SearchIconWrapper>
                                                                                        <SearchIcon />
                                                                                    </SearchIconWrapper>
                                                                                    <StyledInputBase
                                                                                        placeholder='Search…'
                                                                                        inputProps={{
                                                                                            'aria-label': 'search',
                                                                                        }}
                                                                                        onChange={(e) => {
                                                                                            setKeyword(e.target.value);
                                                                                        }}
                                                                                    />
                                                                                </Search>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    {tours.map((val, i) => (
                                                                        <Grid item xs={6} md={3}>
                                                                            <Box className='checkbox-wrap'>
                                                                                <Box className='inside'>
                                                                                    <FormControlLabel
                                                                                        control={<Checkbox value={val.id} onChange={handleTourCheck} />}
                                                                                        label={val.title}
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>
                                                                    ))}
                                                                    {/* <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Trekking and Hiking' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Climbing and Expedition' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Cultural and Historical Tours' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Nature and Wildlife' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Religious and Spiritual Tours' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Cycling and Mountain Biking' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Heli Tours' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={3}>
                                                                        <Box className='checkbox-wrap'>
                                                                            <Box className='inside'>
                                                                                <FormControlLabel control={<Checkbox />} label='Day Tours' />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid> */}
                                                                    {/* <Grid item xs={12}>
                                                                            <Box className="checkboxWrapBottom">
                                                                                <FormControlLabel control={<Checkbox />} label="I’m not sure which trip to select. Can you suggest me?" />
                                                                            </Box>
                                                                        </Grid> */}
                                                                </Grid>
                                                            </Box>
                                                        </>
                                                    ) : activeStep === 3 ? (
                                                        <>
                                                            <Box sx={{ flexGrow: 1 }}>
                                                                <Grid container spacing={5} columns={10}>
                                                                    <Grid item xs={12} sx={{ marginTop: '2rem' }}>
                                                                        <Typography variant='h2' sx={{ textAlign: 'center' }}>
                                                                            Preferred accommodation standard *
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={5} md={2}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='preferredAccommodation'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={preferredAccommodation === 'basic'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setPreferredAccommodation(e.target.value);
                                                                                        }}
                                                                                        value='basic'
                                                                                        inputProps={{ 'aria-label': 'A' }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <IoBedOutline />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    Basic
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={5} md={2}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='preferredAccommodation'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={preferredAccommodation === 'comfortable'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setPreferredAccommodation(e.target.value);
                                                                                        }}
                                                                                        value='comfortable'
                                                                                        inputProps={{ 'aria-label': 'B' }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <GiRockingChair />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    Comfortable
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={5} md={2}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='preferredAccommodation'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={preferredAccommodation === 'luxury'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setPreferredAccommodation(e.target.value);
                                                                                        }}
                                                                                        value='luxury'
                                                                                        inputProps={{ 'aria-label': 'C' }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <TbSofa />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    Luxury
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={5} md={2}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='preferredAccommodation'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={preferredAccommodation === 'camping'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setPreferredAccommodation(e.target.value);
                                                                                        }}
                                                                                        value='camping'
                                                                                        inputProps={{ 'aria-label': 'D' }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <GiCampingTent />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    Camping
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={5} md={2}>
                                                                        <Box className='radio-wrap'>
                                                                            <Controller
                                                                                name='preferredAccommodation'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Radio
                                                                                        {...field}
                                                                                        checked={preferredAccommodation === 'self_booking'}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setPreferredAccommodation(e.target.value);
                                                                                        }}
                                                                                        value='self_booking'
                                                                                        inputProps={{ 'aria-label': 'E' }}
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                            <Box className='inside'>
                                                                                <span>
                                                                                    <TbBrandBooking />
                                                                                </span>
                                                                                <Typography
                                                                                    variant='h6'
                                                                                    sx={{
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '1.025rem',
                                                                                    }}
                                                                                >
                                                                                    Self Booking
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        className='familyDropDown'
                                                                        style={{
                                                                            paddingTop: '0 !important',
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                textAlign: 'center',
                                                                                fontWeight: 600,
                                                                            }}
                                                                        >
                                                                            Room with bare essentials with limited food and beverage facilities{' '}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </>
                                                    ) : activeStep === 4 ? (
                                                        <>
                                                            <Box sx={{ flexGrow: 1 }}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} sx={{ marginTop: '2rem' }}>
                                                                        <Typography variant='h2' sx={{ textAlign: 'center' }}>
                                                                            Budget range (per person) *
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Box className='rangeSlider'>
                                                                            <Controller
                                                                                name='budgetRange'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Slider
                                                                                        {...field}
                                                                                        getAriaLabel={() => 'Minimum distance'}
                                                                                        value={value1}
                                                                                        min={100}
                                                                                        max={10000}
                                                                                        onChange={(e, newValue, activeThumb) => {
                                                                                            field.onChange(e);
                                                                                            handleChange1(e, newValue, activeThumb);
                                                                                        }}
                                                                                        valueLabelDisplay='auto'
                                                                                        getAriaValueText={valuetext}
                                                                                        disableSwap
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                                <Box
                                                                    sx={{
                                                                        maxWidth: '950px',
                                                                        width: '100%',
                                                                        margin: '0 auto',
                                                                    }}
                                                                >
                                                                    <Grid container spacing={5}>
                                                                        <Grid item xs={12} sx={{ marginTop: '2rem' }}>
                                                                            <Typography
                                                                                variant='h4'
                                                                                sx={{
                                                                                    textAlign: 'center',
                                                                                    fontSize: '1.5rem',
                                                                                    fontWeight: '600',
                                                                                    fontFamily: 'Montserrat',
                                                                                }}
                                                                            >
                                                                                Are you flexible with a change in budget? *
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={6} md={6}>
                                                                            <Box className='radio-wrap'>
                                                                                <Controller
                                                                                    name='flexibleBudget'
                                                                                    control={control}
                                                                                    render={({ field }) => (
                                                                                        <Radio
                                                                                            {...field}
                                                                                            checked={flexibleBudget === 'yes'}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e);
                                                                                                setFlexibleBudget(e.target.value);
                                                                                            }}
                                                                                            value='yes'
                                                                                            inputProps={{ 'aria-label': 'A' }}
                                                                                        />
                                                                                    )}
                                                                                    rules={{
                                                                                        required: 'This is required',
                                                                                    }}
                                                                                />
                                                                                <Box className='inside'>
                                                                                    <span>
                                                                                        <BsWallet />
                                                                                    </span>
                                                                                    <Typography
                                                                                        variant='h6'
                                                                                        sx={{
                                                                                            fontFamily: 'Montserrat',
                                                                                            fontSize: '1.025rem',
                                                                                        }}
                                                                                    >
                                                                                        Yes, I am flexible. Plan the best trip for me.
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item xs={6} md={6}>
                                                                            <Box className='radio-wrap'>
                                                                                <Controller
                                                                                    name='flexibleBudget'
                                                                                    control={control}
                                                                                    render={({ field }) => (
                                                                                        <Radio
                                                                                            {...field}
                                                                                            checked={flexibleBudget === 'no'}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e);
                                                                                                setFlexibleBudget(e.target.value);
                                                                                            }}
                                                                                            value='no'
                                                                                            inputProps={{ 'aria-label': 'B' }}
                                                                                        />
                                                                                    )}
                                                                                    rules={{
                                                                                        required: 'This is required',
                                                                                    }}
                                                                                />

                                                                                <Box className='inside'>
                                                                                    <span>
                                                                                        <CiWallet />
                                                                                    </span>
                                                                                    <Typography
                                                                                        variant='h6'
                                                                                        sx={{
                                                                                            fontFamily: 'Montserrat',
                                                                                            fontSize: '1.025rem',
                                                                                        }}
                                                                                    >
                                                                                        No, that is my minimum and maximum budget.
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Box>
                                                        </>
                                                    ) : activeStep === 5 ? (
                                                        <>
                                                            <Box
                                                                className='lookingFor'
                                                                style={{
                                                                    marginTop: '2rem',
                                                                    borderBottom: '#ddd 1px solid',
                                                                    paddingBottom: '2rem',
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant='h4'
                                                                    sx={{
                                                                        fontSize: '1.25rem',
                                                                        fontWeight: '700',
                                                                        fontFamily: 'Montserrat',
                                                                    }}
                                                                >
                                                                    Trip type you are looking for *
                                                                </Typography>
                                                                <ul className='d-flex'>
                                                                    <li className='radio-wrap'>
                                                                        <Controller
                                                                            name='tripType'
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <Radio
                                                                                    {...field}
                                                                                    checked={tripType === 'tailor_made_tour'}
                                                                                    onChange={(e) => {
                                                                                        field.onChange(e);
                                                                                        setTripType(e.target.value);
                                                                                    }}
                                                                                    value='tailor_made_tour'
                                                                                    inputProps={{ 'aria-label': 'TMT' }}
                                                                                />
                                                                            )}
                                                                            rules={{
                                                                                required: 'This is required',
                                                                            }}
                                                                        />
                                                                        <Box className='inside'>
                                                                            <span>
                                                                                <ImRadioChecked2 />
                                                                            </span>
                                                                            <Typography
                                                                                variant='h6'
                                                                                sx={{
                                                                                    fontFamily: 'Montserrat',
                                                                                    fontSize: '1.025rem',
                                                                                }}
                                                                            >
                                                                                Tailor-made tour
                                                                            </Typography>
                                                                        </Box>
                                                                    </li>
                                                                    <li className='radio-wrap'>
                                                                        <Controller
                                                                            name='tripType'
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <Radio
                                                                                    {...field}
                                                                                    checked={tripType === 'group'}
                                                                                    onChange={(e) => {
                                                                                        field.onChange(e);
                                                                                        setTripType(e.target.value);
                                                                                    }}
                                                                                    value='group'
                                                                                    inputProps={{ 'aria-label': 'Group' }}
                                                                                />
                                                                            )}
                                                                            rules={{
                                                                                required: 'This is required',
                                                                            }}
                                                                        />

                                                                        <Box className='inside'>
                                                                            <span>
                                                                                <ImRadioChecked2 />
                                                                            </span>
                                                                            <Typography
                                                                                variant='h6'
                                                                                sx={{
                                                                                    fontFamily: 'Montserrat',
                                                                                    fontSize: '1.025rem',
                                                                                }}
                                                                            >
                                                                                Group
                                                                            </Typography>
                                                                        </Box>
                                                                    </li>
                                                                </ul>
                                                                <Box
                                                                    style={{
                                                                        marginTop: '.5rem',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        style={{
                                                                            color: '#f97150',
                                                                        }}
                                                                    >
                                                                        I want to design my own trip that is convenient to me.
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                            <Box
                                                                className='lookingFor'
                                                                style={{
                                                                    marginTop: '2rem',
                                                                    borderBottom: '#ddd 1px solid',
                                                                    paddingBottom: '2rem',
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant='h4'
                                                                    sx={{
                                                                        fontSize: '1.25rem',
                                                                        fontWeight: '700',
                                                                        fontFamily: 'Montserrat',
                                                                    }}
                                                                >
                                                                    Current phase of your trip planning *
                                                                </Typography>
                                                                <ul className='d-flex'>
                                                                    <li className='radio-wrap'>
                                                                        <Controller
                                                                            name='tripPhase'
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <Radio
                                                                                    {...field}
                                                                                    checked={tripPhase === 'still_planning'}
                                                                                    onChange={(e) => {
                                                                                        field.onChange(e);
                                                                                        setTripPhase(e.target.value);
                                                                                    }}
                                                                                    value='still_planning'
                                                                                    inputProps={{ 'aria-label': 'A' }}
                                                                                />
                                                                            )}
                                                                            rules={{
                                                                                required: 'This is required',
                                                                            }}
                                                                        />
                                                                        <Box className='inside'>
                                                                            <span>
                                                                                <ImRadioChecked2 />
                                                                            </span>
                                                                            <Typography
                                                                                variant='h6'
                                                                                sx={{
                                                                                    fontFamily: 'Montserrat',
                                                                                    fontSize: '1.025rem',
                                                                                }}
                                                                            >
                                                                                I'm still planning my trip
                                                                            </Typography>
                                                                        </Box>
                                                                    </li>
                                                                    <li className='radio-wrap'>
                                                                        <Controller
                                                                            name='tripPhase'
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <Radio
                                                                                    {...field}
                                                                                    checked={tripPhase === 'ready_to_start'}
                                                                                    onChange={(e) => {
                                                                                        field.onChange(e);
                                                                                        setTripPhase(e.target.value);
                                                                                    }}
                                                                                    value='ready_to_start'
                                                                                    inputProps={{ 'aria-label': 'B' }}
                                                                                />
                                                                            )}
                                                                            rules={{
                                                                                required: 'This is required',
                                                                            }}
                                                                        />
                                                                        <Box className='inside'>
                                                                            <span>
                                                                                <ImRadioChecked2 />
                                                                            </span>
                                                                            <Typography
                                                                                variant='h6'
                                                                                sx={{
                                                                                    fontFamily: 'Montserrat',
                                                                                    fontSize: '1.025rem',
                                                                                }}
                                                                            >
                                                                                I'm ready to start
                                                                            </Typography>
                                                                        </Box>
                                                                    </li>
                                                                    <li className='radio-wrap'>
                                                                        <Controller
                                                                            name='tripPhase'
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <Radio
                                                                                    {...field}
                                                                                    checked={tripPhase === 'want_to_book'}
                                                                                    onChange={(e) => {
                                                                                        field.onChange(e);
                                                                                        setTripPhase(e.target.value);
                                                                                    }}
                                                                                    value='want_to_book'
                                                                                    inputProps={{ 'aria-label': 'C' }}
                                                                                />
                                                                            )}
                                                                            rules={{
                                                                                required: 'This is required',
                                                                            }}
                                                                        />
                                                                        <Box className='inside'>
                                                                            <span>
                                                                                <ImRadioChecked2 />
                                                                            </span>
                                                                            <Typography
                                                                                variant='h6'
                                                                                sx={{
                                                                                    fontFamily: 'Montserrat',
                                                                                    fontSize: '1.025rem',
                                                                                }}
                                                                            >
                                                                                I want to book
                                                                            </Typography>
                                                                        </Box>
                                                                    </li>
                                                                </ul>
                                                            </Box>
                                                            <Box
                                                                className='lookingFor'
                                                                sx={{ flexGrow: 1 }}
                                                                style={{
                                                                    marginTop: '2rem',
                                                                }}
                                                            >
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={6}>
                                                                        <FormControl fullWidth>
                                                                            <InputLabel id='demo-simple-select-label'>How did you hear about us?</InputLabel>
                                                                            <Controller
                                                                                name='hearAboutUs'
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <Select
                                                                                        {...field}
                                                                                        labelId='demo-simple-select-label'
                                                                                        id='demo-simple-select'
                                                                                        value={hearAboutUs}
                                                                                        label='How did you hear about us?'
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            setHearAboutUs(e.target.value);
                                                                                        }}
                                                                                    >
                                                                                        <MenuItem value={10}>Ten</MenuItem>
                                                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                                                    </Select>
                                                                                )}
                                                                                rules={{
                                                                                    required: 'This is required',
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Controller
                                                                            name='additionalQuery'
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <TextareaAutosize
                                                                                    {...field}
                                                                                    aria-label='empty textarea'
                                                                                    placeholder='Any additional queries?'
                                                                                    style={{
                                                                                        width: '100%',
                                                                                        height: '120px',
                                                                                        resize: 'none',
                                                                                        borderRadius: '6px',
                                                                                        border: '#ddd 1px solid',
                                                                                        padding: '.8rem',
                                                                                        fontFamily: 'Montserrat',
                                                                                        fontSize: '.85rem',
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            rules={{
                                                                                required: 'This is required',
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </>
                                                    ) : activeStep === 6 ? (
                                                        <>
                                                            <Box className='personalInfo'>
                                                                <Box
                                                                    sx={{
                                                                        marginBottom: '1.5rem',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant='h3'
                                                                        style={{
                                                                            fontWeight: '700',
                                                                        }}
                                                                    >
                                                                        PERSONAL INFORMATION
                                                                    </Typography>
                                                                    <Typography variant='subtitle1'>
                                                                        Please fill in the form below. Out customer support will get back to you as soon as possible.
                                                                    </Typography>
                                                                </Box>
                                                                <Box className=''>
                                                                    <Grid container spacing={3}>
                                                                        <Grid item xs={12}>
                                                                            <Box>
                                                                                <Controller
                                                                                    name='firstName'
                                                                                    control={control}
                                                                                    render={({ field }) => <TextField fullWidth label='First Name *' id='fullWidth' {...field} />}
                                                                                    rules={{
                                                                                        required: 'This is required',
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Box>
                                                                                <Controller
                                                                                    name='lastName'
                                                                                    control={control}
                                                                                    render={({ field }) => <TextField fullWidth label='Last Name *' id='fullWidth' {...field} />}
                                                                                    rules={{
                                                                                        required: 'This is required',
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Box>
                                                                                <Controller
                                                                                    name='contactNo'
                                                                                    control={control}
                                                                                    render={({ field }) => (
                                                                                        <TextField fullWidth label='Contact Number *' id='fullWidth' {...field} />
                                                                                    )}
                                                                                    rules={{
                                                                                        required: 'This is required',
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Box>
                                                                                <Controller
                                                                                    name='email'
                                                                                    control={control}
                                                                                    render={({ field }) => (
                                                                                        <TextField fullWidth label='Email Address *' id='fullWidth' {...field} />
                                                                                    )}
                                                                                    rules={{
                                                                                        required: 'This is required',
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Box>
                                                                                <FormControl fullWidth>
                                                                                    <InputLabel id='demo-simple-select-label'>Nationality *</InputLabel>
                                                                                    <Controller
                                                                                        name='nationality'
                                                                                        control={control}
                                                                                        render={({ field }) => (
                                                                                            <Select
                                                                                                {...field}
                                                                                                labelId='demo-simple-select-label'
                                                                                                id='demo-simple-select'
                                                                                                // value={age}
                                                                                                label='Nationality *'
                                                                                                // onChange={handleChange}
                                                                                            >
                                                                                                <MenuItem value={10}>Ten</MenuItem>
                                                                                                <MenuItem value={20}>Twenty</MenuItem>
                                                                                                <MenuItem value={30}>Thirty</MenuItem>
                                                                                            </Select>
                                                                                        )}
                                                                                        rules={{
                                                                                            required: 'This is required',
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Box className='lookingFor'>
                                                                                <Typography>Preferred method of contact</Typography>
                                                                                <ul className='d-flex'>
                                                                                    <li className='radio-wrap'>
                                                                                        <Controller
                                                                                            name='preferredContact'
                                                                                            control={control}
                                                                                            render={({ field }) => (
                                                                                                <Radio
                                                                                                    {...field}
                                                                                                    checked={preferredContact === 'email'}
                                                                                                    onChange={(e) => {
                                                                                                        field.onChange(e);
                                                                                                        setPreferredContact(e.target.value);
                                                                                                    }}
                                                                                                    value='email'
                                                                                                    inputProps={{
                                                                                                        'aria-label': 'EMAIL',
                                                                                                    }}
                                                                                                />
                                                                                            )}
                                                                                            rules={{
                                                                                                required: 'This is required',
                                                                                            }}
                                                                                        />
                                                                                        <Box className='inside'>
                                                                                            <span>
                                                                                                <ImRadioChecked2 />
                                                                                            </span>
                                                                                            <Typography
                                                                                                variant='h6'
                                                                                                sx={{
                                                                                                    fontFamily: 'Montserrat',
                                                                                                    fontSize: '1.025rem',
                                                                                                }}
                                                                                            >
                                                                                                Email
                                                                                            </Typography>
                                                                                        </Box>
                                                                                    </li>
                                                                                    <li className='radio-wrap'>
                                                                                        <Controller
                                                                                            name='preferredContact'
                                                                                            control={control}
                                                                                            render={({ field }) => (
                                                                                                <Radio
                                                                                                    {...field}
                                                                                                    checked={preferredContact === 'phone'}
                                                                                                    onChange={(e) => {
                                                                                                        field.onChange(e);
                                                                                                        setPreferredContact(e.target.value);
                                                                                                    }}
                                                                                                    value='phone'
                                                                                                    inputProps={{
                                                                                                        'aria-label': 'PHONE',
                                                                                                    }}
                                                                                                />
                                                                                            )}
                                                                                            rules={{
                                                                                                required: 'This is required',
                                                                                            }}
                                                                                        />
                                                                                        <Box className='inside'>
                                                                                            <span>
                                                                                                <ImRadioChecked2 />
                                                                                            </span>
                                                                                            <Typography
                                                                                                variant='h6'
                                                                                                sx={{
                                                                                                    fontFamily: 'Montserrat',
                                                                                                    fontSize: '1.025rem',
                                                                                                }}
                                                                                            >
                                                                                                Phone
                                                                                            </Typography>
                                                                                        </Box>
                                                                                    </li>
                                                                                    <li className='radio-wrap'>
                                                                                        <Controller
                                                                                            name='preferredContact'
                                                                                            control={control}
                                                                                            render={({ field }) => (
                                                                                                <Radio
                                                                                                    {...field}
                                                                                                    checked={preferredContact === 'both'}
                                                                                                    onChange={(e) => {
                                                                                                        field.onChange(e);
                                                                                                        setPreferredContact(e.target.value);
                                                                                                    }}
                                                                                                    value='both'
                                                                                                    inputProps={{
                                                                                                        'aria-label': 'BOTH',
                                                                                                    }}
                                                                                                />
                                                                                            )}
                                                                                            rules={{
                                                                                                required: 'This is required',
                                                                                            }}
                                                                                        />
                                                                                        <Box className='inside'>
                                                                                            <span>
                                                                                                <ImRadioChecked2 />
                                                                                            </span>
                                                                                            <Typography
                                                                                                variant='h6'
                                                                                                sx={{
                                                                                                    fontFamily: 'Montserrat',
                                                                                                    fontSize: '1.025rem',
                                                                                                }}
                                                                                            >
                                                                                                Both
                                                                                            </Typography>
                                                                                        </Box>
                                                                                    </li>
                                                                                </ul>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item sx={12}>
                                                                            <Box>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Controller
                                                                                            name='acceptPrivacyPolicy'
                                                                                            value={1}
                                                                                            control={control}
                                                                                            render={({ field }) => <Checkbox {...field} defaultChecked />}
                                                                                            rules={{
                                                                                                required: 'This is required',
                                                                                            }}
                                                                                        />
                                                                                    }
                                                                                    label='I have read and accept the Privacy Policy'
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Box>
                                                        </>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                    <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                                        Back
                                                    </Button>
                                                    <Box sx={{ flex: '1 1 auto' }} />
                                                    {activeStep !== 6 ? (
                                                        <Button className='nxtBtnStep' onClick={handleNext} sx={{ mr: 1 }}>
                                                            Next
                                                        </Button>
                                                    ) : (
                                                        <Button className='nxtBtnStep' type='submit'>
                                                            Submit
                                                        </Button>
                                                    )}

                                                    {/* {activeStep !== steps.length &&
                                                    (completed[activeStep] ? (
                                                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                            Step {activeStep + 1} already completed
                                                        </Typography>
                                                    ) : (
                                                        <Button className='finishBtnStep' onClick={handleComplete}>
                                                            {completedSteps() === totalSteps() - 1
                                                                ? 'Finish'
                                                                : 'Complete Step'}
                                                        </Button>
                                                    ))} */}
                                                </Box>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default CustomizeTrip;
