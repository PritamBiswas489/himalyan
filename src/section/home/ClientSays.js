import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Card, Avatar, Rating, List, Stack, Badge } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Parallax } from 'react-parallax';
import parse from 'html-react-parser';
import { fDateDMMMY } from '../../utils/formatTime';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const ClientSays = (props) => {
  return (
    <>
      <Box className='clientSaysSection relative'>
        <Parallax bgImage="../images/client-says.jpg" bgImageAlt="" strength={200} className='lientSaysParalax'>
          <Box sx={{ flexGrow: 1 }} className='ph-80'>
            <Grid container spacing={3} padding={3}>
              <Grid item xs={12}>
                <Paper sx={{ backgroundColor: "transparent", boxShadow: "none", textAlign: "center" }} className='sectionTitle'>
                  <Typography variant="subtitle1"
                    sx={{
                      fontFamily: "Amertha PERSONAL USE ONLY",
                      color: "#f97150",
                      fontSize: "30px",
                      padding: "0",
                    }}
                  >
                    {props.home?.reviewTitle}
                  </Typography>

                  <Typography variant="h3" gutterBottom
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Montserrat",
                      fontSize: "40px"
                    }}
                  >
                    {props.home?.reviewSubTitle}
                  </Typography>
                </Paper>
              </Grid>
              {props.review.map((element, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ borderRadius: "20px;" }} className='clientSayBox'>
                    <List component="div"
                      sx={{ display: 'flex', alignItems: "center" }}>
                      <item>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                          <Avatar className='shadowPad' alt="Travis Howard" src={`${process.env.REACT_APP_HOST_IMAGE}image/review/${element.image}`} sx={{ width: 84, height: 84 }} />
                        </Badge>
                      </item>
                      <item className="pl-15">
                        <Typography variant="h5"
                          sx={{
                            padding: "0",
                            fontFamily: "Inter",
                            fontSize: "20px",
                            color: "#003663",
                            fontWeight: "800"
                          }}
                        >
                          {element.name}
                        </Typography>

                        <Typography variant="caption" display="block"
                          sx={{
                            padding: "0",
                            fontFamily: "Inter",
                            fontSize: "13px",
                            color: "#acacac",
                            fontWeight: "600"
                          }}
                        >
                          {element.get_country.name}
                        </Typography>
                      </item>
                    </List>
                    <Box className='ovrScroll'>
                      <Typography variant="body2" color="text.secondary" sx={{ padding: 0, marginTop: 2 }}>
                        {parse(element.review)}
                      </Typography>
                    </Box>

                    <List component="div" className='cbRateDate'
                      sx={{ display: 'flex', justifyContent: "space-between", marginTop: "20px" }}>
                      <item>
                        <Stack >
                          <Rating name="size-small" value={element.rating} defaultValue={0} size="small" readOnly precision={0.5} />
                        </Stack>
                      </item>
                      <item sx={{}} >
                        {fDateDMMMY(element.ratingDate)}
                      </item>
                    </List>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Parallax>
      </Box>
    </>
  )
}

export default ClientSays