import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Typography,
  CardContent
} from '@mui/material';
import {
  TtyOutlined as TtyOutlinedIcon,
} from '@mui/icons-material';
import parse from 'html-react-parser';


const Support = (props) => {
  const [tour, setTour] = useState(props.tour);

  return (
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
            <TtyOutlinedIcon style={{
              color: "#fa8a6f",
              fontSize: '40px',
              display: 'inline-block',
              verticalAlign: 'middle',
              position: 'relative',
              top: '-5px',
              marginRight: '10px',
            }} />
            Support
          </Typography>
          {tour.support ? (
            <Typography variant="body1" color="text.secondary" mt={2}>
              {parse(tour.support)}
            </Typography>
          ) : ''}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Support
