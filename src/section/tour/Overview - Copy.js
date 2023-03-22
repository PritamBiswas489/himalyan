import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Button, 
  ClickAwayListener,
  FormControl, 
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
 } from '@mui/material';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Overview = (props) => {
  const [value, setValue, pericePerson, setPerson] = useState(0);
  const [tour, setTour] = useState(props.tour);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPerson(event.target.value);
  };

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box sx={{ flexGrow: 1, background: '#ebebeb' }} className='overViewArea'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container padding={3}>
            <Grid flexGrow={1}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Overview" icon={<ContentPasteSearchIcon />} iconPosition="start" />
                <Tab label="Highlights" icon={<BrightnessHighIcon />} iconPosition="start" />
                <Tab label="Itinary" icon={<OutlinedFlagIcon />} iconPosition="start" />
                <Tab label="Costing" icon={<SavingsOutlinedIcon />} iconPosition="start" />
                <Tab label="Map" icon={<FmdGoodOutlinedIcon />} iconPosition="start" />
                <Tab label="Gear list" icon={<SettingsOutlinedIcon />} iconPosition="start" />
                <Tab label="FAQ" icon={<OutlinedFlagIcon />} iconPosition="start" />
                <Tab label="Item Seven" icon={<ForumOutlinedIcon />} iconPosition="start" />
              </Tabs>
            </Grid>
            <Grid sx={'auto'} container spacing={3}>
              <Grid item xs="auto" className="pericePersonDd">
                {tour.priceType === 'perPerson' ? (
                  <Stack direction="row" spacing={2}>
                    <div>
                      <Button className='fromUsppBtn'
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                      >
                        <span>From</span> US ${tour.price} <sub>pp</sub><KeyboardArrowDownIcon />
                      </Button>
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
                                        boxShadow:'none',
                                      }}>
                                        <Table style={{ Width: '100%' }} aria-label="simple table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell><strong>No Of Person</strong></TableCell>
                                              <TableCell><strong>Price per Person</strong></TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                          {tour.get_per_person_price.map((element, index) => (
                                            <TableRow
                                              key={index}
                                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                              <TableCell component="th" scope="row" >
                                                {element.minPerson} {element.maxPerson? `- ${element.maxPerson}`: ''}  Paxes
                                              </TableCell>
                                              <TableCell>US $ {element.price}</TableCell>
                                            </TableRow>
                                          ))}
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
                  <Button className='fromUsppBtn'>
                    <span>From</span> US ${tour.price} <sub>pp</sub>
                  </Button>
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
    </>
  )
}

export default Overview

