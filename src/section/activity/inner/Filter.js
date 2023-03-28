import React, { useEffect, useState } from 'react';
import {
  Paper,
  Rating,
  Stack,
  List,
  ListItem,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  Checkbox,
  Pagination,
  InputLabel
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import {
  Star as StarIcon,
} from '@mui/icons-material';
import parse from 'html-react-parser';
import { filterApi } from '../../../service/Filter.service';

const Filter = (props) => {
  const [filterData, setFilterData] = useState([{ index: Math.random(), country: [], activity: [], difficulty: [], region: [], price: '', duration: '', sortByName: '', sortByValue: '', review: '' }]);
  const [tourData, setTourData] = useState([]);
  const [totalPage, setTotalPage] = useState('');
  const [page, setPage] = useState('');
  const [setting, setSetting] = useState('');

  useEffect(() => {
    if (props) {
      let list = [...filterData];
      list[0]['activity'] = '';
      list[0]['activity'] = [...list[0]['activity'], props.activityDetails.id];
      setFilterData(list);
      setTourData([]);
      setTotalPage('');
      setPage('');
      handleFilterAPI();
    }
  }, []);
  const handleFilter = async (event) => {
    let list = [...filterData];
    if (event.target.name === 'country') {
      if (event.target.checked) {
        list[0][event.target.name] = [...list[0][event.target.name], Number(event.target.value)];
      } else {
        list[0][event.target.name] = list[0][event.target.name].filter(element => element !== Number(event.target.value));
      }
    }

    if (event.target.name === 'activity') {
      if (event.target.checked) {
        list[0][event.target.name] = [...list[0][event.target.name], Number(event.target.value)];
      } else {
        list[0][event.target.name] = list[0][event.target.name].filter(element => element !== Number(event.target.value));
      }
    }

    if (event.target.name === 'difficulty') {
      if (event.target.checked) {
        list[0][event.target.name] = [...list[0][event.target.name], Number(event.target.value)];
      } else {
        list[0][event.target.name] = list[0][event.target.name].filter(element => element !== Number(event.target.value));
      }
    }

    if (event.target.name === 'price') {
      if (event.target.checked) {
        list[0][event.target.name] = event.target.value;
      } else {
        list[0][event.target.name] = '';
      }
    }

    if (event.target.name === 'duration') {
      if (event.target.checked) {
        list[0][event.target.name] = event.target.value;
      } else {
        list[0][event.target.name] = '';
      }
    }

    if (event.target.name === 'review') {
      if (event.target.checked) {
        list[0][event.target.name] = event.target.value;
      } else {
        list[0][event.target.name] = '';
      }
    }

    await setFilterData(list);
    handleFilterAPI();
  }

  const handleSortBy = async (event) => {
    let list = [...filterData];
    list[0]['sortByName'] = event.target.name;
    list[0]['sortByValue'] = event.target.value;
    await setFilterData(list);
    handleFilterAPI();
  }

  const handleChange = async (event, value) => {
    handleFilterAPI(value);
  };

  const handleFilterAPI = async (value) => {
    let filter = '';
    if (value) {
      filter = await filterApi.filterByPagination(value, filterData);
    } else {
      filter = await filterApi.filter(filterData);
    }
    if (filter.status === 200 && filter.data.status === 200) {
      await setTourData(filter.data.data.data);
      await setSetting(filter.data.setting);
      await setTotalPage(filter.data.data.last_page);
      await setPage(filter.data.data.current_page);
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='filterWrap relative'>
        <Box sx={{ flexGrow: 1 }} className='ph-80'>
          <Grid container spacing={3} padding={2}>
            <Grid item xs={12} md={3} sm={12} lg={3}>
              <Box className='filterLeft'>
                <Typography variant='h5' style={{
                  fontWeight: '700',
                  fontFamily: 'Montserrat',
                  color: '#444',
                  padding: '1rem 1.2rem'
                }}>
                  Filter By
                </Typography>
                {props.destination ? <Box className='filterLeftInner'>
                  <Typography variant='h6' display={'block'} style={{
                    fontWeight: '700',
                    fontFamily: 'Montserrat',
                    color: '#444'
                  }}>
                    Country
                  </Typography>
                  <ul>
                    {props.destination.map((element, index) => {
                      return (
                        <li key={index}><FormControlLabel control={<Checkbox name='country' value={element.id} onChange={handleFilter} checked={filterData[0]['country'].find(country => country === element.id) === undefined ? false : true} />} label={element.name} /></li>
                      )
                    })}
                  </ul>
                </Box> : ''}
                <Box className='filterLeftInner'>
                  <Typography variant='h6' display={'block'} style={{
                    fontWeight: '700',
                    fontFamily: 'Montserrat',
                    color: '#444'
                  }}>
                    Price (Per Person)
                  </Typography>
                  <ul>
                    <li><FormControlLabel control={<Checkbox name='price' value='0-500' onChange={handleFilter} checked={filterData[0]['price'] === '0-500' ? true : false} />} label="Below $500" /></li>
                    <li><FormControlLabel control={<Checkbox name='price' value='501-1000' onChange={handleFilter} checked={filterData[0]['price'] === '501-1000' ? true : false} />} label="$501 to $1,000" /></li>
                    <li><FormControlLabel control={<Checkbox name='price' value='1001-1500' onChange={handleFilter} checked={filterData[0]['price'] === '1001-1500' ? true : false} />} label="$1,001 to $1,500" /></li>
                    <li><FormControlLabel control={<Checkbox name='price' value='1501-2000' onChange={handleFilter} checked={filterData[0]['price'] === '1501-2000' ? true : false} />} label="$1,501 to $2,000" /></li>
                    <li><FormControlLabel control={<Checkbox name='price' value='2001' onChange={handleFilter} checked={filterData[0]['price'] === '2001' ? true : false} />} label="Above $2001" /></li>
                  </ul>
                </Box>
                {props.difficulty ? <Box className='filterLeftInner'>
                  <Typography variant='h6' display={'block'} style={{
                    fontWeight: '700',
                    fontFamily: 'Montserrat',
                    color: '#444'
                  }}>
                    Difficulty
                  </Typography>
                  <ul>
                    {props.difficulty.map((element, index) => (
                      <li key={index}><FormControlLabel control={<Checkbox name='difficulty' value={element.id} onChange={handleFilter} checked={filterData[0]['difficulty'].find(difficulty => difficulty === element.id) === undefined ? false : true} />} label={element.name} /></li>
                    ))}
                  </ul>
                </Box> : ''}
                <Box className='filterLeftInner'>
                  <Typography variant='h6' display={'block'} style={{
                    fontWeight: '700',
                    fontFamily: 'Montserrat',
                    color: '#444'
                  }}>
                    Duration
                  </Typography>
                  <ul>
                    <li><FormControlLabel control={<Checkbox name='duration' value='0-5' onChange={handleFilter} checked={filterData[0]['duration'] === '0-5' ? true : false} />} label="Below 5 days" /></li>
                    <li><FormControlLabel control={<Checkbox name='duration' value='6-9' onChange={handleFilter} checked={filterData[0]['duration'] === '6-9' ? true : false} />} label="6 - 9 Days" /></li>
                    <li><FormControlLabel control={<Checkbox name='duration' value='10-14' onChange={handleFilter} checked={filterData[0]['duration'] === '10-14' ? true : false} />} label="10 - 14 Days" /></li>
                    <li><FormControlLabel control={<Checkbox name='duration' value='15-20' onChange={handleFilter} checked={filterData[0]['duration'] === '15-20' ? true : false} />} label="15 - 20 Days" /></li>
                    <li><FormControlLabel control={<Checkbox name='duration' value='21' onChange={handleFilter} checked={filterData[0]['duration'] === '21' ? true : false} />} label="Above 21 Days" /></li>
                  </ul>
                </Box>
                <Box className='filterLeftInner'>
                  <Typography variant='h6' display={'block'} style={{
                    fontWeight: '700',
                    fontFamily: 'Montserrat',
                    color: '#444'
                  }}>
                    Review Score
                  </Typography>
                  <ul>
                    <li className='d-flex align-items-center'>
                      <FormControlLabel control={<Checkbox name='review' value='4' onChange={handleFilter} checked={filterData[0]['review'] === '4' ? true : false} />} sx={{ marginRight: '0' }} />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='grayColor' />
                      and above
                    </li>
                    <li className='d-flex align-items-center'>
                      <FormControlLabel control={<Checkbox name='review' value='3-4' onChange={handleFilter} checked={filterData[0]['review'] === '3-4' ? true : false} />} sx={{ marginRight: '0' }} />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='grayColor' />
                      <StarIcon className='grayColor' />
                      and above
                    </li>
                    <li className='d-flex align-items-center'>
                      <FormControlLabel control={<Checkbox name='review' value='2-3' onChange={handleFilter} checked={filterData[0]['review'] === '2-3' ? true : false} />} sx={{ marginRight: '0' }} />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='grayColor' />
                      <StarIcon className='grayColor' />
                      <StarIcon className='grayColor' />
                      and above
                    </li>
                    <li className='d-flex align-items-center'>
                      <FormControlLabel control={<Checkbox name='review' value='1-2' onChange={handleFilter} checked={filterData[0]['review'] === '1-2' ? true : false} />} sx={{ marginRight: '0' }} />
                      <StarIcon className='yellowColor' />
                      <StarIcon className='grayColor' />
                      <StarIcon className='grayColor' />
                      <StarIcon className='grayColor' />
                      <StarIcon className='grayColor' />
                      and above
                    </li>
                  </ul>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={9} sm={12} lg={9}>
              <Box className="SortByTop">
                <Typography variant='h6'>Sort By</Typography>
                <ul className='d-flex flex-wrap'>
                  <li>
                    <FormControl size="small" sx={{ width: '100%' }}>
                      <InputLabel id="demo-simple-select-label">No. of Reviews</InputLabel>
                      <Select fullWidth
                        labelId="demo-simple-select-label"
                        value={filterData[0].sortByName === "sortByNoOfReviews" ? filterData[0].sortByValue : ''}
                        onChange={handleSortBy}
                        label="No. of Reviews"
                        name='sortByNoOfReviews'
                      >
                        <MenuItem value='asc'>Lowest Rated First</MenuItem>
                        <MenuItem value='desc'>Highest Rated First</MenuItem>
                      </Select>
                    </FormControl>
                  </li>
                  <li>
                    <FormControl size="small" sx={{ width: '100%' }}>
                      <InputLabel id="demo-simple-select-label">Price</InputLabel>
                      <Select fullWidth
                        labelId="demo-simple-select-label"
                        value={filterData[0].sortByName === "sortByPrice" ? filterData[0].sortByValue : ''}
                        onChange={handleSortBy}
                        label="Price"
                        name='sortByPrice'
                      >
                        <MenuItem value='asc'>Lowest Price First</MenuItem>
                        <MenuItem value='desc'>Highest Price First</MenuItem>
                      </Select>
                    </FormControl>
                  </li>
                  <li>
                    <FormControl size="small" sx={{ width: '100%' }}>
                      <InputLabel id="demo-simple-select-label">Popularity</InputLabel>
                      <Select fullWidth
                        labelId="demo-simple-select-label"
                        value={filterData[0].sortByName === "sortByPopularity" ? filterData[0].sortByValue : ''}
                        onChange={handleSortBy}
                        label="Popularity"
                        name='sortByPopularity'
                      >
                        <MenuItem value='asc'>Least Popular First</MenuItem>
                        <MenuItem value='desc'>Most Popular First</MenuItem>
                      </Select>
                    </FormControl>
                  </li>
                  <li>
                    <FormControl size="small" sx={{ width: '100%' }}>
                      <InputLabel id="demo-simple-select-label">Name</InputLabel>
                      <Select fullWidth
                        labelId="demo-simple-select-label"
                        value={filterData[0].sortByName === "sortByName" ? filterData[0].sortByValue : ''}
                        onChange={handleSortBy}
                        label="Name"
                        name='sortByName'
                      >
                        <MenuItem value='asc'>A - Z</MenuItem>
                        <MenuItem value='desc'>Z - A</MenuItem>
                      </Select>
                    </FormControl>
                  </li>
                  <li>
                    <FormControl size="small" sx={{ width: '100%' }}>
                      <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                      <Select fullWidth
                        labelId="demo-simple-select-label"
                        value={filterData[0].sortByName === "sortByDuration" ? filterData[0].sortByValue : ''}
                        onChange={handleSortBy}
                        label="Duration"
                        name='sortByDuration'
                      >
                        <MenuItem value='asc'>Shortest First</MenuItem>
                        <MenuItem value='desc'>Longest First</MenuItem>
                      </Select>
                    </FormControl>
                  </li>
                </ul>
              </Box>
              <Box className='' mt={2}>
                <Grid container direction="row" spacing={2} padding={0}>
                  {tourData.length > 0 ? (<>
                    {tourData.map((element, index) => {
                      let price = 0;
                      if (setting) {
                        const currentDate = new Date();
                        const discountStartDate = new Date(setting.discountStartDate);
                        const discountEndDate = new Date(setting.discountEndDate);
                        if (currentDate.getTime() >= discountStartDate.getTime() && currentDate.getTime() <= discountEndDate.getTime() && setting.globalDiscount > element.discount) {
                          price = element.price - Number(((element.price * setting.globalDiscount) / 100).toFixed(2));
                        } else {
                          price = element.price - Number(((element.price * element.discount) / 100).toFixed(2));
                        }
                      } else {
                        price = element.price - Number(((element.price * element.discount) / 100).toFixed(2));
                      }
                      return (
                        <Grid key={index} item xs={12} md={4} sm={6} lg={4} padding={0}>
                          <Paper sx={{ boxShadow: "none", backgroundColor: 'transparent' }} className="popularToursSlider">
                            <div className="ptsWrapTop relative">
                              <img src={`${process.env.REACT_APP_HOST_IMAGE}image/tour/bannerThumb/${element.bannerThumb}`} alt={element.bannerThumb} />
                              {element.get_ribbon ? <span className={index % 2 === 0 ? 'newSpan bgGreen' : 'newSpan bgParple'}>{element.get_ribbon.name}</span> : ''}
                              <div className='dolerPp'>
                                {element.price === price || element.price === null ? '' : <h6>From <span>${element.price}</span></h6>}
                                <h5>USD {price}<sup>pp</sup></h5>
                              </div>
                            </div>
                            <div className='ptsWrap'>
                              <h4><Link to={`/${element.get_destination.slug}/${element.slug}`}>{element.title}</Link></h4>
                              <div className='ptsInner'>
                                {parse(element.description).length > 0 ? parse(element.description)[0].props.children.slice(0, 165) : parse(element.description).props.children.slice(0, 165)}
                                <Box mt={1}>
                                  <List component={Stack} direction="row" className='dudiAct'>
                                    <ListItem disablePadding sx={{ pr: '0' }}>
                                      <span><img src="../images/icon/duration.svg" alt="" /></span> {element.duration} {element.duration > 1 ? 'days' : 'day'}
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <span><img src="../images/icon/difficulty.svg" alt="" /></span> {element.get_difficulty.name}
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <span><img src="../images/icon/activity.svg" alt="" /></span>{element.get_activities.name}
                                    </ListItem>
                                  </List>
                                </Box>
                                <Box className='starRateMd'>
                                  <ul className='d-flex align-items-center justify-content-between'>
                                    <li>
                                      <Stack spacing={1}>
                                        <Rating defaultValue={0} value={element.average_rating === null ? 0 : element.average_rating} size="small" readOnly precision={0.5} />
                                      </Stack>
                                    </li>
                                    <li><span>5.0&nbsp;</span>of<strong>&nbsp;{element.get_reviews.length} Reviews</strong></li>
                                  </ul>
                                </Box>
                              </div>
                            </div>
                          </Paper>
                        </Grid>
                      )
                    })}
                  </>) : ''}
                </Grid>
              </Box>
              {tourData.length > 0 ? (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '2rem'
                }}>
                  <Stack spacing={2} className='pegiTabColor'>
                    <Pagination count={totalPage} page={page} onChange={handleChange} color="primary" />
                  </Stack>
                </Box>
              ) : ''}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Filter
