import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Card,
    Typography,
    CardContent,
    Button,
    ListItemIcon,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import {
    AssistantPhotoOutlined as AssistantPhotoOutlinedIcon,
    FileDownloadOutlined as FileDownloadOutlinedIcon,
    FmdGoodOutlined as FmdGoodOutlinedIcon,
} from '@mui/icons-material';
import { useStyles } from '../../../theme/Style';
import parse from 'html-react-parser';

const Itinerary = (props) => {
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
        <>
            <Card
                sx={{
                    width: '100%',
                    display: 'flex',
                    boxShadow: 'none',
                    border: '#ddd 1px solid',
                    marginTop: '20px',
                }}
            >
                <CardContent sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '#ddd 1px solid',
                            padding: '10px 0',
                        }}
                    >
                        <Typography
                            gutterBottom
                            variant='h5'
                            sx={{
                                margin: '0',
                                padding: '0',
                            }}
                        >
                            <AssistantPhotoOutlinedIcon
                                style={{
                                    color: '#fa8a6f',
                                    fontSize: '40px',
                                    display: 'inline-block',
                                    verticalAlign: 'middle',
                                    position: 'relative',
                                    top: '-5px',
                                    marginRight: '10px',
                                }}
                            />
                            ITINERARY
                        </Typography>
                        {tour.brochure ? (
                            <a
                                href={`${process.env.REACT_APP_HOST_IMAGE}image/tour/brochure/${tour.brochure}`}
                                target='_blank'
                                download
                                rel='noreferrer'
                            >
                                <ColorButton variant='contained' className='LearnMoreBtn'>
                                    <FileDownloadOutlinedIcon sx={{ marginRight: '5px' }} />
                                    Download Itinary
                                </ColorButton>
                            </a>
                        ) : (
                            ''
                        )}
                    </Box>
                    {Object.entries(tour.get_itinerary).length > 0 ? (
                        <>
                            {tour.get_itinerary.map((element, index) => (
                                <Box
                                    sx={{
                                        width: '100%',
                                        position: 'relative',
                                        padding: '20px 0 20px 100px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            textAlign: 'right',
                                            position: 'absolute',
                                            left: '0',
                                            top: '20px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#f97150',
                                                fontSize: '17px',
                                                fontWeight: '700',
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            <FmdGoodOutlinedIcon
                                                style={{
                                                    color: '#fa8a6f',
                                                    fontSize: '20px',
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                    position: 'relative',
                                                    top: '-2px',
                                                    marginRight: '10px',
                                                }}
                                            />
                                            Day {index + 1}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#ecebea',
                                                fontSize: '42px',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        sx={{
                                            color: '#f97150',
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {element.title}
                                    </Typography>
                                    <Grid
                                        container
                                        rowSpacing={1}
                                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                        p={0}
                                        mt={2}
                                        mb={2}
                                    >
                                        <Grid xs={4}>
                                            <ListItem className={classes.root}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        variant='square'
                                                        alt='Remy Sharp'
                                                        src='../images/itinerary/1.svg'
                                                        sx={{ width: 42, height: 42 }}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary='Trek Distance'
                                                    secondary={`${element.distance}km / ${Number(
                                                        element.distance * 0.621371
                                                    ).toFixed(2)}miles`}
                                                />
                                            </ListItem>
                                        </Grid>
                                        <Grid xs={4}>
                                            <ListItem className={classes.root}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        variant='square'
                                                        alt='Remy Sharp'
                                                        src='../images/itinerary/2.svg'
                                                        sx={{ width: 42, height: 42 }}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary='Highest Altitude'
                                                    secondary={`${element.atitude}m / ${Number(
                                                        element.atitude * 3.2808
                                                    ).toFixed(1)}ft`}
                                                />
                                            </ListItem>
                                        </Grid>
                                        <Grid xs={4}>
                                            <ListItem className={classes.root}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        variant='square'
                                                        alt='Remy Sharp'
                                                        src='../images/itinerary/3.svg'
                                                        sx={{ width: 42, height: 42 }}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary='Duration'
                                                    secondary={`${element.duration}Hour`}
                                                />
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                    <Typography variant='body1' color='text.secondary'>
                                        {parse(element.description)}
                                    </Typography>
                                    <Box
                                        sx={{
                                            padding: '0 20px',
                                            background: '#f3f3f3',
                                            borderRadius: '6px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <List>
                                            <ListItem classes={{ root: classes.noPadding }} sx={{ margin: '8px 0' }}>
                                                <ListItemIcon sx={{ minWidth: 'auto', width: '40px' }}>
                                                    <Avatar
                                                        variant='square'
                                                        alt='Remy Sharp'
                                                        src='../images/itinerary/4.svg'
                                                        sx={{ width: 42, height: 42 }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText sx={{ paddingLeft: '15px' }} primary={element.hotel} />
                                            </ListItem>
                                            <ListItem classes={{ root: classes.noPadding }} sx={{ margin: '8px 0' }}>
                                                <ListItemIcon sx={{ minWidth: 'auto', width: '40px' }}>
                                                    <Avatar
                                                        variant='square'
                                                        alt='Remy Sharp'
                                                        src='../images/itinerary/5.svg'
                                                        sx={{ width: 42, height: 42 }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    sx={{ paddingLeft: '15px' }}
                                                    primary={`Included standard meals (${
                                                        element.breackfast ? 'Breakfast +' : ''
                                                    }${element.lunch ? 'Lunch +' : ''}${
                                                        element.dinner ? 'Dinner' : ''
                                                    })`}
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                            ))}
                        </>
                    ) : (
                        ''
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default Itinerary;
