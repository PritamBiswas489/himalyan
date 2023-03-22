import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Typography,
  CardContent,
  Button,
  Paper
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  FileDownloadOutlined as FileDownloadOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  RadioButtonCheckedOutlined as RadioButtonCheckedOutlinedIcon,
} from '@mui/icons-material';
import { useStyles } from '../../../theme/Style';
import parse from 'html-react-parser';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  boxShadow: 'none'
}));

const Gear = (props) => {
  const classes = useStyles();
  const [tour, setTour] = useState(props.tour);
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
  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        boxShadow: 'none',
        border: '#ddd 1px solid',
        marginTop: '20px',
        height: 'auto'
    }}>
      <CardContent sx={{ width: '100%' }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '#ddd 1px solid',
          padding: '10px 0',
        }}>
          <Typography gutterBottom variant="h5"
            sx={{
              margin: '0',
              padding: '0',
            }}
          >
            <SettingsOutlinedIcon style={{
              color: "#fa8a6f",
              fontSize: '40px',
              display: 'inline-block',
              verticalAlign: 'middle',
              position: 'relative',
              top: '-5px',
              marginRight: '10px',
            }} />
            Gear
          </Typography>
          {tour.gearImage? (
            <a href={`${process.env.REACT_APP_HOST_IMAGE}image/tour/gear/${tour.gearImage}`} target="_blank" download rel="noreferrer">
              <ColorButton variant="contained" className="LearnMoreBtn">
                <FileDownloadOutlinedIcon sx={{ marginRight: '5px' }} />
                Download Gear List
              </ColorButton>
            </a>
          ) : ''}
          
        </Box>
        <Box>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='gierList'>
            {tour.gearDescription ? parse(tour.gearDescription) : ''}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Gear
