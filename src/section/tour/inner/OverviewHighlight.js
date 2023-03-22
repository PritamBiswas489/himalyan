import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, Typography, CardContent, ListItemIcon, ListItemText, List, ListItem } from '@mui/material';
import {
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  StarBorderPurple500Rounded as StarBorderPurple500RoundedIcon,
  ContentPasteSearchRounded as ContentPasteSearchRoundedIcon,
} from '@mui/icons-material';
import parse from 'html-react-parser';

const OverviewHighlight = (props) => {
  const [dense, setDense] = useState(false);
  const [tour, setTour] = useState(props.tour);

  return (
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
              <ContentPasteSearchRoundedIcon style={{
                color: "#fa8a6f",
                fontSize: '40px',
                display: 'inline-block',
                verticalAlign: 'middle',
                position: 'relative',
                top: '-5px',
                marginRight: '10px',
              }} />
              Overview
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {parse(tour.description)}
            </Typography>
          </Box>
          {tour.get_highlights ? (
            <Box sx={{ marginTop: '30px', }}>
              <Typography variant="h5" style={{ paddingBottom: '0' }}>
                <StarBorderPurple500RoundedIcon style={{
                  color: "#fa8a6f",
                  fontSize: '40px',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  position: 'relative',
                  top: '-5px',
                }} />
                Highlights
              </Typography>
              <List dense={dense}>
                {Object.keys(tour.get_highlights).map((element, index) => (
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 'auto', width: "40px" }}>
                      <CheckBoxOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={tour.get_highlights[element].title} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : ''}

        </CardContent>
      </Card>
    </>
  )
}

export default OverviewHighlight
