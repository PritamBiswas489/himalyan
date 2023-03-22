import React, { useState } from 'react';
import { Box, Card, Typography, CardContent, ListItemIcon, ListItemText, List, ListItem } from '@mui/material';

import {
    MonetizationOn as MonetizationOnIcon,
    CheckCircleOutlined as CheckCircleOutlinedIcon,
} from '@mui/icons-material';

const Costing = (props) => {
    const [tour, setTour] = useState(props.tour);

    return (
        <>
            <Card
                style={{
                    marginTop: '30px',
                    boxShadow: 'none',
                    border: '#ddd 1px solid',
                }}
            >
                <CardContent>
                    <Box>
                        <Typography
                            gutterBottom
                            variant='h5'
                            sx={{
                                borderBottom: '#ddd 1px solid',
                                padding: '10px 0',
                            }}
                        >
                            <MonetizationOnIcon
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
                            Costing
                        </Typography>
                        {Object.entries(tour.get_cost_included).length > 0 ? (
                            <Box>
                                <Typography variant='h6' color='#069809'>
                                    What is included in the tour price?
                                </Typography>
                                <List sx={{ width: '100%' }}>
                                    {tour.get_cost_included.map((element, index) => (
                                        <ListItem alignItems='flex-start'>
                                            <ListItemIcon
                                                verticalAlign={'top'}
                                                sx={{ minWidth: 'auto', width: '40px', color: '#069809' }}
                                            >
                                                <CheckCircleOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography variant='body1' style={{ color: '#444444' }}>
                                                        {element.description}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant='caption'
                                                        style={{ color: '#069809', fontSize: '15px' }}
                                                    >
                                                        {element.second_description
                                                            ? `(${element.second_description})`
                                                            : ''}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        ) : (
                            ''
                        )}
                        {Object.entries(tour.get_cost_excluded).length > 0 ? (
                            <Box>
                                <Typography variant='h6' color='#f97150'>
                                    What is included in the tour price?
                                </Typography>
                                <List sx={{ width: '100%' }}>
                                    {tour.get_cost_excluded.map((element, index) => (
                                        <ListItem alignItems='flex-start'>
                                            <ListItemIcon
                                                verticalAlign={'top'}
                                                sx={{ minWidth: 'auto', width: '40px', color: '#f97150' }}
                                            >
                                                <CheckCircleOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography variant='body1' style={{ color: '#444444' }}>
                                                        {element.description}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant='caption'
                                                        style={{ color: '#f97150', fontSize: '15px' }}
                                                    >
                                                        {element.second_description
                                                            ? `(${element.second_description})`
                                                            : ''}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        ) : (
                            ''
                        )}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default Costing;
