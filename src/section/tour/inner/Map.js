import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ReactPanZoom from 'react-image-pan-zoom-rotate';
import {
  Box,
  Card,
  Typography,
  CardContent,
  Button,
} from '@mui/material';
import {
  FileDownloadOutlined as FileDownloadOutlinedIcon,
  PinDropOutlined as PinDropOutlinedIcon,
} from '@mui/icons-material';

const Map = (props) => {
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
            <PinDropOutlinedIcon style={{
              color: "#fa8a6f",
              fontSize: '40px',
              display: 'inline-block',
              verticalAlign: 'middle',
              position: 'relative',
              top: '-5px',
              marginRight: '10px',
            }} />
            Map
          </Typography>
          {tour.mapImage? (
            <a href={`${process.env.REACT_APP_HOST_IMAGE}image/tour/map/${tour.mapImage}`} target="_blank" download rel="noreferrer">
            <ColorButton variant="contained" className="LearnMoreBtn">
              <FileDownloadOutlinedIcon sx={{ marginRight: '5px' }} />
              Download Map
            </ColorButton>
            </a>
          ) : ''}
        </Box>
        <Box sx={{ position: 'relative', overflow:'hidden',marginTop:'15px'}}>
          <div
            style={{
              position: 'absolute',
              right: '10px',
              zIndex: 2,
              top: 10,
              userSelect: 'none',
              borderRadius: 2,
              background: '#fff',
              boxShadow: '0px 2px 6px rgba(53, 67, 93, 0.32)',
            }}
          >
            <div style={{
                textAlign: 'center',
                cursor: 'pointer',
                height: 40,
                width: 40,
                borderBottom: ' 1px solid #ccc',
              }}
            >
              <svg
                style={{
                  height: '100%',
                  width: '100%',
                  padding: 10,
                  boxSizing: 'border-box',
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 12H20" stroke="#4C68C1" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 4L12 20" stroke="#4C68C1" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{
                textAlign: 'center',
                cursor: 'pointer',
                height: 40,
                width: 40,
                borderBottom: ' 1px solid #ccc',
              }}
            >
              <svg style={{
                  height: '100%',
                  width: '100%',
                  padding: 10,
                  boxSizing: 'border-box',
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 12H20" stroke="#4C68C1" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{
                textAlign: 'center',
                cursor: 'pointer',
                height: 40,
                width: 40,
                borderBottom: ' 1px solid #ccc',
              }}
            >
              <svg style={{
                  height: '100%',
                  width: '100%',
                  padding: 10,
                  boxSizing: 'border-box',
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 15L9 20L4 15" stroke="#4C68C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 4H13C10.7909 4 9 5.79086 9 8V20" stroke="#4C68C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{
                textAlign: 'center',
                cursor: 'pointer',
                height: 40,
                width: 40,
                borderBottom: ' 1px solid #ccc',
              }}
            >
              <svg style={{
                  height: '100%',
                  width: '100%',
                  padding: 10,
                  boxSizing: 'border-box',
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke="#4C68C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9.178,18.799V1.763L0,18.799H9.178z M8.517,18.136h-7.41l7.41-13.752V18.136z" />
                <polygon stroke="#4C68C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="11.385,1.763 11.385,18.799 20.562,18.799 " />
              </svg>
            </div>
            <div style={{
                textAlign: 'center',
                cursor: 'pointer',
                height: 40,
                width: 40,
              }}
            >
              <svg style={{
                  height: '100%',
                  width: '100%',
                  padding: 10,
                  boxSizing: 'border-box',
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#4C68C1"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </div>
          <ReactPanZoom
            image={`${process.env.REACT_APP_HOST_IMAGE}image/tour/map/${tour.mapImage}`}
            alt="Image alt text"
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default Map
