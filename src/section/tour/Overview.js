import React, { useState } from 'react';
import {
  Box,
  Paper,
  Button,
  ClickAwayListener,
  Grow,
  Popper,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OverviewTop from './inner/OverviewTop';
import OverviewHighlight from './inner/OverviewHighlight';
import Itinerary from './inner/Itinerary';
import Costing from './inner/Costing';
import Map from './inner/Map';
import Gear from './inner/Gear';
import Faq from './inner/Faq';
import Support from './inner/Support';
import Reviews from './inner/Reviews';
import TopSeller from './inner/TopSeller';
import WhyBook from './inner/WhyBook';
import CustomerSupport from './inner/CustomerSupport';
import ScrollSpy from "react-ui-scrollspy";

const Overview = (props) => {
  const [value, setValue, pericePerson, setPerson] = useState(0);
  const [tour, setTour] = useState(props.tour);
  const [price, setPrice] = useState('');

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   setPerson(event.target.value);
  // };

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

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    setPrice('');
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;

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
  }, [open, props]);
  const onPress = (e) => {
    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, background: '#ebebeb' }} className='overViewArea'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container padding={3}>
            <Grid flexGrow={1}>

              <ul className='d-flex flex-wrap'>
                <li><a className='active-scroll-spy' onClick={(e) => onPress(e)} href="#section-1" data-to-scrollspy-id="section-1"><ContentPasteSearchIcon /> Overview</a></li>
                <li><a onClick={(e) => onPress(e)} href="#section-2" data-to-scrollspy-id="section-2"><BrightnessHighIcon /> Highlights</a></li>
                <li><a onClick={(e) => onPress(e)} href="#section-3" data-to-scrollspy-id="section-3"><OutlinedFlagIcon /> Itinary</a></li>
                <li><a onClick={(e) => onPress(e)} href="#section-4" data-to-scrollspy-id="section-4"><SavingsOutlinedIcon /> Costing</a></li>
                <li><a onClick={(e) => onPress(e)} href="#section-5" data-to-scrollspy-id="section-5"><FmdGoodOutlinedIcon /> Map</a></li>
                <li><a onClick={(e) => onPress(e)} href="#section-6" data-to-scrollspy-id="section-6"><SettingsOutlinedIcon /> Gear list</a></li>
                <li><a onClick={(e) => onPress(e)} href="#section-7" data-to-scrollspy-id="section-7"><OutlinedFlagIcon /> FAQ</a></li>
              </ul>
            </Grid>
            <Grid sx={'auto'} container spacing={3}>
              <Grid item xs="auto" className="pericePersonDd">
                {tour.priceType === 'perPerson' ? (
                  <Stack direction="row" spacing={2}>
                    <div>
                      {tour.price !== null ? 
                        <Button className='fromUsppBtn'
                          ref={anchorRef}
                          id="composition-button"
                          aria-controls={open ? 'composition-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle}
                        >
                            <span>From</span> {tour.price === price ? '' : <span className='lineThrough ltProperties'>USD {tour.price}</span>} USD {tour.price === price ? tour.price : price}
                            <KeyboardArrowDownIcon />
                        </Button>: ''}
                      <Popper className='ddMenu'
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: '1',
                        }}
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <Box
                                  autoFocusItem={open}
                                  id="composition-menu"
                                  aria-labelledby="composition-button"
                                  onKeyDown={handleListKeyDown}
                                  sx={{
                                    display: 'flex'
                                  }}
                                >
                                  <Grid className='text-center '>
                                    <Box>
                                      <Typography
                                        style={{
                                          textAlign: 'center',
                                          color: '#f97150',
                                          fontSize: '18px',
                                          fontWeight: '600',
                                          padding: '5px 0'

                                        }}
                                      >
                                        We Offer Group Discount</Typography>
                                    </Box>
                                    <Grid container spacing={3} padding={3} xs={12} className='offerDiscountTable'>
                                      <TableContainer component={Paper} style={{
                                        boxShadow: 'none',
                                      }}>
                                        <Table style={{ Width: '100%' }} aria-label="simple table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell><strong>No Of Person</strong></TableCell>
                                              <TableCell><strong>Price per Person</strong></TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {tour.get_per_person_price.map((element, index) => {
                                              let price = 0;
                                              if (props.tour.settingDetails) {
                                                const currentDate = new Date();
                                                const discountStartDate = new Date(props.tour.settingDetails.discountStartDate);
                                                const discountEndDate = new Date(props.tour.settingDetails.discountEndDate);
                                                if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && props.tour.settingDetails.globalDiscount > props.tour.discount) {
                                                  price = element.price - Number(((element.price * props.tour.settingDetails.globalDiscount) / 100).toFixed(2));
                                                } else {
                                                  price = element.price - Number(((element.price * props.tour.discount) / 100).toFixed(2));
                                                }
                                              } else {
                                                price = element.price - Number(((element.price * props.tour.discount) / 100).toFixed(2));
                                              }
                                              return (
                                                <TableRow
                                                  key={index}
                                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                  <TableCell component="th" scope="row" >
                                                    {element.minPerson} {element.maxPerson ? `- ${element.maxPerson}` : ''}  Paxes
                                                  </TableCell>
                                                  <TableCell>USD {element.price === price ? '' : <span className='lineThrough ltProperties'>{element.price}</span>} {price}</TableCell>
                                                </TableRow>
                                              )
                                            })}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </Stack>
                ) : (<Stack direction="row" spacing={2}>
                  <div>
                  {tour.price !== null ? 
                    <Button className='fromUsppBtn'>
                      <span>From</span> {tour.price === price ? '' : <span className='lineThrough ltProperties'>USD {tour.price}</span>} USD {tour.price === price ? tour.price : price}
                    </Button> : ''}
                  </div>
                </Stack>)}
              </Grid>
              <Grid item xs="auto">
                <ColorButton variant="contained" className="LearnMoreBtn">Enquiry now</ColorButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, }}>
        {props.tour && props.tour.noticeMsg !== null ? <Alert icon={false}>{props.tour?.noticeMsg}</Alert> : ''}
      </Box>
      <Box sx={{ flexGrow: 1, }} className=''>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={3}>
            <Grid item xs={12} md={8}>
              <ScrollSpy>
                <div id="section-1">
                  <OverviewTop tour={props.tour} />
                </div>
                <div id="section-2">
                  <OverviewHighlight tour={props.tour} />
                </div>
                <div id="section-3">
                  <Itinerary tour={props.tour} />
                </div>
                <div id="section-4">
                  <Costing tour={props.tour} />
                </div>
                <div id="section-5">
                  <Map tour={props.tour} />
                </div>
                <div id="section-6">
                  <Gear tour={props.tour} />
                </div>
                <div id="section-7">
                  <Faq tour={props.tour} />
                </div>
                <div id="section-8">
                  <Support tour={props.tour} />
                </div>
                <div id="section-9">
                  <Reviews tour={props.tour} />
                </div>
              </ScrollSpy>
            </Grid>
            <Grid item xs={12} md={4}>

              <Box className='itineraryRight'>
                <TopSeller tour={props.tour} />
                <WhyBook />
                <CustomerSupport />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Overview