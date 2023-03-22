import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {Box,Paper} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Unstable_Grid2';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

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
})
);

const OurDestination = (props) => {
  return (
    <>
      <Box className='destinationsection ph-80'>
        <Grid padding={3}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid container sm={12} md={6}>
              {props.destination ? (
                <>
                  {Object.keys(props.destination).map((element, index) => (
                    <Grid key={index} xs={6} className={`${index % 2 === 0 ? 'mt-L20':''}`}>
                      <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }} component="a" href={`destination/${props.destination[element].slug}`} className="destinationBox relative">
                        <img src={`${process.env.REACT_APP_HOST_IMAGE}image/destination/${props.destination[element]?.image}`} alt="" />
                        <div className="destinationBoxInner">
                          <h4>{props.destination[element].name}<span><small>{props.destination[element].get_tour.length} Tours</small></span></h4>
                          <div className="dbiHide">
                            <h5>{props.destination[element].content !== null ? props.destination[element].content.main_title:''}</h5>
                            {props.destination[element].content !== null && props.destination[element].content.main_description ? 
                            <>
                              {parse(props.destination[element].content.main_description).length > 0 ? parse(props.destination[element].content.main_description)[0].props.children.slice(0,123) : parse(props.destination[element].content.main_description).props.children.slice(0,123)}
                            </>
                            :''}
                          </div>
                        </div>
                      </Paper>
                    </Grid>
                  ))}
                </>
              ) : ''}
            </Grid>
            <Grid sm={12} md={6} >
              <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }} className="destinationRight relative">
                <h5>{props.home?.destinationTitle}</h5>
                <h2>{props.home?.destinationSubTitle}</h2>
                {props.home ? parse(props.home.destinationDescription) : ''}
                <div className='destinationNumber'>
                  <ul className='d-flex justify-content-between'>
                    {props.countdown? (
                      <>
                        <li><span>{props.countdown.iconicDestination !== null?props.countdown.iconicDestination:0}</span>Iconic Destination</li>
                        <li><span>{props.countdown.uniqueAdventure !== null?props.countdown.uniqueAdventure:0}</span>Unique Adventure</li>
                        <li><span>{props.countdown.travellingExperience !== null?props.countdown.travellingExperience :0}</span>Travelling Experience</li>
                      </>
                    ) : ''}
                  </ul>
                </div>
                <Link to={'/destination'}><ColorButton variant="contained" className="LearnMoreBtn">{props.home?.destinationButton} <ArrowForwardIcon /></ColorButton></Link>
                <span className='pattern-1'><img src={`${process.env.REACT_APP_URL}images/pattren.png`} alt="pattren.png" /></span>
                <span className='pattern-2'><img src={`${process.env.REACT_APP_URL}images/pattren.png`} alt="pattren.png" /></span>
                <span className='pattern-3'><img src={`${process.env.REACT_APP_URL}images/pattren.png`} alt="pattren.png" /></span>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
  
  export default OurDestination