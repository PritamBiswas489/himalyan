import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';



import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import { AiOutlinePrinter } from "react-icons/ai";
import { IoMailUnreadOutline } from "react-icons/io5";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { GrRestaurant } from "react-icons/gr";
import { BsPatchCheck, BsClockHistory } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 200,
    },
});


const longText = `
  Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
  Praesent non nunc mollis, fermentum neque at, semper arcu.
  Nullam eget est sed sem iaculis gravida eget vitae justo.
  `;

const ViewBooking = () => {
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

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    return (
        <>
            <Box className='ViewBookingBanner' style={{ background: "url(../images/booking-bg.jpg) top center no-repeat" }}>

            </Box>
            <Box className='viewBooking'>
                <Box sx={{ flexGrow: 1 }} className='ph-80' style={{ borderBottom: '#ddd 1px solid' }}>
                    <Grid container spacing={3} padding={3} justifyContent={'space-between'} alignItems={'center'}>
                        <Grid xs="auto">
                            <Box>
                                <Typography variant="h4" sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1.2rem' }}>Congratulations - Your booking is confirmed</Typography>
                                <Typography variant='subtitle1' sx={{ fontFamily: 'Montserrat', }}>You've earned <span style={{ color: '#f97150', fontWeight: 700 }}>US$ 89</span> Travel Credits. </Typography>
                            </Box>
                        </Grid>
                        <Grid xs="auto">
                            <Box className='mailPrint'>
                                <ul className='d-flex'>
                                    <li>
                                        <Link to={'/'}><AiOutlinePrinter /> Print E-ticket</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'}><IoMailUnreadOutline /> Email E-ticket</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'}><AiOutlinePrinter /> Print Itinerary</Link>
                                    </li>
                                </ul>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }} className='ph-80'
                    style={{
                        background: 'rgb(255, 240, 237)',
                    }}
                >
                    <Grid container spacing={3} padding={3} justifyContent={'space-between'} alignItems={'center'}>
                        <Grid xs>
                            <Box className='travelerBooker'>
                                <ul className='d-flex'>
                                    <li className='travelerBookerInfo'>Traveler/Booker</li>
                                    <li className='travelerBookerVal'>Joakim Forsmann Setsaas</li>
                                </ul>
                                <ul className='d-flex'>
                                    <li className='travelerBookerInfo'>Booking reference</li>
                                    <li className='travelerBookerVal'>DeNiqgBkq</li>
                                </ul>
                            </Box>
                        </Grid>
                        <Grid xs="auto">
                            <Box className='mailPrint'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    flexDirection: 'column',
                                }}
                            >
                                <ColorButton variant="contained" className="LearnMoreBtn">

                                    Video Preview
                                </ColorButton>
                                <Tooltip title={longText}>
                                    <Button sx={{ m: 1 }} style={{
                                        color: '#333',
                                        textTransform: 'capitalize',
                                        fontWeight: '600',
                                    }}>Mobile voucher accepted</Button>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={3} padding={3}>
                        <Grid sx={12} sm={12} md={3} lg={3}>
                            <Box className='viewImg'>
                                <img src={`../images/view-booking.jpg`} alt='' />
                            </Box>
                        </Grid>
                        <Grid sx={12} sm={12} md={9} lg={9}>
                            <Box>
                                <Typography variant='h4' style={{ fontSize: '1.3rem', fontWeight: '600', }}>Everest Base Camp Trek</Typography>
                            </Box>
                            <Box>
                                <Grid container spacing={3} padding={0}>
                                    <Grid sx={12} sm={6} md={6} lg={6}>
                                        <Box className='campTrek'>
                                            <ul className='d-flex flex-wrap'>
                                                <li className='campTracInfo'>Tour Start Date</li>
                                                <li className='campTracVal'>30 Mar 2023, Start time: 06:00 <span><HiOutlineCheckBadge />Flexible Booking Policy</span></li>
                                            </ul>
                                            <ul className='d-flex flex-wrap'>
                                                <li className='campTracInfo'>Participants</li>
                                                <li className='campTracVal'>2 people </li>
                                            </ul>
                                            <ul className='d-flex flex-wrap'>
                                                <li className='campTracInfo'>Duration</li>
                                                <li className='campTracVal'>12 days </li>
                                            </ul>
                                            <ul className='d-flex flex-wrap'>
                                                <li className='campTracInfo'>Start Location</li>
                                                <li className='campTracVal'>Thamel, Kathmandu, Nepal</li>
                                            </ul>
                                            <ul className='d-flex flex-wrap'>
                                                <li className='campTracInfo'>Addons</li>
                                                <li className='campTracVal'>1x Porter</li>
                                            </ul>
                                            <ul className='d-flex flex-wrap'>
                                                <li className='campTracInfo'>Traveller(s)</li>
                                                <li className='campTracVal'>Joakim Forsmann Setsaas (Adult) Anna Snikere (Adult) </li>
                                            </ul>
                                            <ul className='d-flex flex-wrap'>
                                                <li className='campTracInfo'>Tour Type</li>
                                                <li className='campTracVal'> Private tour</li>
                                            </ul>
                                        </Box>
                                    </Grid>
                                    <Grid sx={12} sm={6} md={6} lg={6}>
                                        <Box className='campAmountArea'>
                                            <ul className='d-flex campAmount'>
                                                <li>Total Amount</li>
                                                <li>US$ 2532</li>
                                            </ul>
                                            <ul className='d-flex campAmount'>
                                                <li>Paid Amount</li>
                                                <li>US$ 456</li>
                                            </ul>
                                            <ul className='d-flex campAmount'>
                                                <li>Due Amount</li>
                                                <li>US$ 2076</li>
                                            </ul>
                                            <Typography variant='body1' mt={2}>
                                                The due amount of US$ 2,076 is payable to the tour operator upon arrival at your destination.You can also pay the due amount now, if you prefer.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{
                                borderTop: '#ddd 1px solid',
                                paddingTop: '1rem',
                                marginTop: '1.5rem',
                            }}>
                                <Box sx={{
                                    marginBottom: '1.5rem',
                                }}>
                                    <Typography variant='h5'>Cancellation Policy</Typography>
                                    <Typography variant='body1'>Free cancellation up to 60 days prior departure, after which the deposit becomes non-refundable.</Typography>
                                </Box>

                                <Box style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Typography variant='h5'>Itinerary</Typography>
                                    <Typography component="a" href="#" className='printItinerary'><AiFillPrinter />Print Itinerary</Typography>
                                </Box>

                                <Box className='policyAccordion'>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography>Day1 <span>Kathmandu to Lukla (flight) - Phakding</span></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='hoursGuest'>
                                                <ul className='d-flex'>
                                                    <li><BsClockHistory /> 3 hours</li>
                                                    <li><FaBed /> Guest house </li>
                                                </ul>
                                            </Box>
                                            <Box>
                                                <Typography>
                                                    We will pick you from your hotel and drive you to the airport in Kathmandu. A quick, 25-30-minute flight from Kathmandu will take you to Lukla (2,840m), the gateway to the Khumbu region and the starting point of this trek.<br /><br />

                                                    Travel through the Dudhkoshi River Valley, past various settlements such as Chheplung and Chaurikharka, before reaching Phakding. Enjoy great views of the Himalayas during the trek. It's a leisurely day with a gradual descend of approximately 200 meters.
                                                </Typography>
                                            </Box>
                                            <Box className='mealsBreakfast' sx={{
                                                marginTop: '1.5rem',
                                            }}>
                                                <Typography sx={{ marginBottom: '10px', fontWeight: '700' }}><GrRestaurant /> Meals</Typography>
                                                <Typography><BsPatchCheck /> Breakfast, Lunch & Dinner</Typography>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography>Day2 <span>Kathmandu to Lukla (flight) - Phakding</span></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='hoursGuest'>
                                                <ul className='d-flex'>
                                                    <li><BsClockHistory /> 3 hours</li>
                                                    <li><FaBed /> Guest house </li>
                                                </ul>
                                            </Box>
                                            <Box>
                                                <Typography>
                                                    We will pick you from your hotel and drive you to the airport in Kathmandu. A quick, 25-30-minute flight from Kathmandu will take you to Lukla (2,840m), the gateway to the Khumbu region and the starting point of this trek.<br /><br />

                                                    Travel through the Dudhkoshi River Valley, past various settlements such as Chheplung and Chaurikharka, before reaching Phakding. Enjoy great views of the Himalayas during the trek. It's a leisurely day with a gradual descend of approximately 200 meters.
                                                </Typography>
                                            </Box>
                                            <Box className='mealsBreakfast' sx={{
                                                marginTop: '1.5rem',
                                            }}>
                                                <Typography sx={{ marginBottom: '10px', fontWeight: '700' }}><GrRestaurant /> Meals</Typography>
                                                <Typography><BsPatchCheck /> Breakfast, Lunch & Dinner</Typography>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3bh-content"
                                            id="panel3bh-header"
                                        >
                                            <Typography>Day3 <span>Kathmandu to Lukla (flight) - Phakding</span></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='hoursGuest'>
                                                <ul className='d-flex'>
                                                    <li><BsClockHistory /> 3 hours</li>
                                                    <li><FaBed /> Guest house </li>
                                                </ul>
                                            </Box>
                                            <Box>
                                                <Typography>
                                                    We will pick you from your hotel and drive you to the airport in Kathmandu. A quick, 25-30-minute flight from Kathmandu will take you to Lukla (2,840m), the gateway to the Khumbu region and the starting point of this trek.<br /><br />

                                                    Travel through the Dudhkoshi River Valley, past various settlements such as Chheplung and Chaurikharka, before reaching Phakding. Enjoy great views of the Himalayas during the trek. It's a leisurely day with a gradual descend of approximately 200 meters.
                                                </Typography>
                                            </Box>
                                            <Box className='mealsBreakfast' sx={{
                                                marginTop: '1.5rem',
                                            }}>
                                                <Typography sx={{ marginBottom: '10px', fontWeight: '700' }}><GrRestaurant /> Meals</Typography>
                                                <Typography><BsPatchCheck /> Breakfast, Lunch & Dinner</Typography>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel4bh-content"
                                            id="panel4bh-header"
                                        >
                                            <Typography>Day4 <span>Kathmandu to Lukla (flight) - Phakding</span></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='hoursGuest'>
                                                <ul className='d-flex'>
                                                    <li><BsClockHistory /> 3 hours</li>
                                                    <li><FaBed /> Guest house </li>
                                                </ul>
                                            </Box>
                                            <Box>
                                                <Typography>
                                                    We will pick you from your hotel and drive you to the airport in Kathmandu. A quick, 25-30-minute flight from Kathmandu will take you to Lukla (2,840m), the gateway to the Khumbu region and the starting point of this trek.<br /><br />

                                                    Travel through the Dudhkoshi River Valley, past various settlements such as Chheplung and Chaurikharka, before reaching Phakding. Enjoy great views of the Himalayas during the trek. It's a leisurely day with a gradual descend of approximately 200 meters.
                                                </Typography>
                                            </Box>
                                            <Box className='mealsBreakfast' sx={{
                                                marginTop: '1.5rem',
                                            }}>
                                                <Typography sx={{ marginBottom: '10px', fontWeight: '700' }}><GrRestaurant /> Meals</Typography>
                                                <Typography><BsPatchCheck /> Breakfast, Lunch & Dinner</Typography>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel5bh-content"
                                            id="panel5bh-header"
                                        >
                                            <Typography>Day4 <span>Kathmandu to Lukla (flight) - Phakding</span></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='hoursGuest'>
                                                <ul className='d-flex'>
                                                    <li><BsClockHistory /> 3 hours</li>
                                                    <li><FaBed /> Guest house </li>
                                                </ul>
                                            </Box>
                                            <Box>
                                                <Typography>
                                                    We will pick you from your hotel and drive you to the airport in Kathmandu. A quick, 25-30-minute flight from Kathmandu will take you to Lukla (2,840m), the gateway to the Khumbu region and the starting point of this trek.<br /><br />

                                                    Travel through the Dudhkoshi River Valley, past various settlements such as Chheplung and Chaurikharka, before reaching Phakding. Enjoy great views of the Himalayas during the trek. It's a leisurely day with a gradual descend of approximately 200 meters.
                                                </Typography>
                                            </Box>
                                            <Box className='mealsBreakfast' sx={{
                                                marginTop: '1.5rem',
                                            }}>
                                                <Typography sx={{ marginBottom: '10px', fontWeight: '700' }}><GrRestaurant /> Meals</Typography>
                                                <Typography><BsPatchCheck /> Breakfast, Lunch & Dinner</Typography>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel6bh-content"
                                            id="panel6bh-header"
                                        >
                                            <Typography>Day4 <span>Kathmandu to Lukla (flight) - Phakding</span></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='hoursGuest'>
                                                <ul className='d-flex'>
                                                    <li><BsClockHistory /> 3 hours</li>
                                                    <li><FaBed /> Guest house </li>
                                                </ul>
                                            </Box>
                                            <Box>
                                                <Typography>
                                                    We will pick you from your hotel and drive you to the airport in Kathmandu. A quick, 25-30-minute flight from Kathmandu will take you to Lukla (2,840m), the gateway to the Khumbu region and the starting point of this trek.<br /><br />

                                                    Travel through the Dudhkoshi River Valley, past various settlements such as Chheplung and Chaurikharka, before reaching Phakding. Enjoy great views of the Himalayas during the trek. It's a leisurely day with a gradual descend of approximately 200 meters.
                                                </Typography>
                                            </Box>
                                            <Box className='mealsBreakfast' sx={{
                                                marginTop: '1.5rem',
                                            }}>
                                                <Typography sx={{ marginBottom: '10px', fontWeight: '700' }}><GrRestaurant /> Meals</Typography>
                                                <Typography><BsPatchCheck /> Breakfast, Lunch & Dinner</Typography>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                                <Box className='includedExcluded'>
                                    <Typography variant='h5'>What's included</Typography>
                                    <ul>
                                        <li>Airport pickup and drop-off (on request) services in a private vehicle</li>
                                        <li>Kathmandu - Lukla - Kathmandu domestic airline tickets, including all airline taxes and fuel surcharges</li>
                                        <li>Meals on a full-board basis (breakfast, lunch and dinner / main course) during the trek</li>
                                        <li>Accommodation in tea houses / lodges along the trek as per the itinerary</li>
                                        <li>Sagarmatha National Park entrance permits</li>
                                        <li>Trekkers Information Management System (TIMS) registration card</li>
                                        <li>Experienced, English-speaking, government-licensed and ministry of tourism trained trekking guide with meals, accommodation, salary and insurance</li>
                                        <li>An assistant trekking guide for groups over 6 people with meals, accommodation, salary and insurance</li>
                                        <li>Down jackets, sleeping bags and duffel bags (down jackets, sleeping bags and duffel bags are to be returned after the completion of the trip)</li>
                                        <li>Daily seasonal fresh fruits as per the availability</li>
                                        <li>A first aid kit carried by the guide. An American Medical Association approved oximeter to measure your oxygen and pulse in high altitude (imported from USA)</li>
                                        <li>Necessary paper works, all government and local taxes</li>
                                        <li>In a worst case scenario, rescue and medical evacuation assistance (costs to be paid by the client)</li>
                                        <li>1 complementary dinner after arrival or before departure in a traditional restaurant</li>
                                    </ul>

                                </Box>
                                <Box className='includedExcluded'>
                                    <Typography variant='h5'>What's Excluded</Typography>
                                    <ul>
                                        <li>Airport pickup and drop-off (on request) services in a private vehicle</li>
                                        <li>Kathmandu - Lukla - Kathmandu domestic airline tickets, including all airline taxes and fuel surcharges</li>
                                        <li>Meals on a full-board basis (breakfast, lunch and dinner / main course) during the trek</li>
                                        <li>Accommodation in tea houses / lodges along the trek as per the itinerary</li>
                                        <li>Sagarmatha National Park entrance permits</li>
                                        <li>Trekkers Information Management System (TIMS) registration card</li>
                                        <li>Experienced, English-speaking, government-licensed and ministry of tourism trained trekking guide with meals, accommodation, salary and insurance</li>
                                        <li>An assistant trekking guide for groups over 6 people with meals, accommodation, salary and insurance</li>
                                        <li>Down jackets, sleeping bags and duffel bags (down jackets, sleeping bags and duffel bags are to be returned after the completion of the trip)</li>
                                        <li>Daily seasonal fresh fruits as per the availability</li>
                                        <li>A first aid kit carried by the guide. An American Medical Association approved oximeter to measure your oxygen and pulse in high altitude (imported from USA)</li>
                                        <li>Necessary paper works, all government and local taxes</li>
                                        <li>In a worst case scenario, rescue and medical evacuation assistance (costs to be paid by the client)</li>
                                        <li>1 complementary dinner after arrival or before departure in a traditional restaurant</li>
                                    </ul>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default ViewBooking
