import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const DestinationTab = ({ destination }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='tabSec relative'>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={3} padding={3} className='tabSecInner'>
                        <Grid item xs={12} md={3}>
                            <Tabs
                                className='tabLeft'
                                orientation='vertical'
                                // variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label='Vertical tabs example'
                                sx={{ borderRight: 1, borderColor: 'divider', textAlign: 'left' }}
                            >
                                {/* <Tab label='General Information' {...a11yProps(0)} />
                                <Tab label='Language and Culture' {...a11yProps(1)} />
                                <Tab label='Accommodation' {...a11yProps(2)} />
                                <Tab label='Climate and Weather' {...a11yProps(3)} />
                                <Tab label='Popular Activities' {...a11yProps(4)} /> */}
                                {destination?.get_destination_info?.map((val, i) => (
                                    <Tab label={val?.title} {...a11yProps(i)} />
                                ))}
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Box className='tabDtls'>
                                {destination?.get_destination_info?.map((val, i) => (
                                    <TabPanel key={`tabpane-${i}`} value={value} index={i}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: val?.description,
                                            }}
                                        ></span>
                                    </TabPanel>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 322 }}
            >
                
                
            </Box> */}
        </>
    );
};

export default DestinationTab;
