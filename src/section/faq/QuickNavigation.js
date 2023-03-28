import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Card, CardContent, MenuList, MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from '../../assets/images/accordion-bg.jpg';
// import SearchIcon from '@mui/icons-material/Search';
import { categoryListService, faqListService } from '../../service/faq.service.js';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const boxSX = {
    padding: '7px 0',
    color: '#444',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    letterSpacing: '1px',
    marginBottom: '5px',
    textTransform: 'uppercase',
    '&:hover': {
        color: '#F97150',
        background: '#fff',
    },
    '@media (max-width: 780px)': {

        fontSize: '13px',
    }
};

const styles = {
    faqBg: {
        backgroundImage: `url(${Image})`,
        backgroundAttachment: 'fixed',
    },
};

const QuickNavigation = () => {
    const [expanded, setExpanded] = useState(false);
    const [category, setCategory] = useState([]);
    const [faq, setFaq] = useState([]);
    const [faqMeta, setFaqMeta] = useState({});
    const [keyword, setKeyword] = useState('');
    const [catId, setCatId] = useState(null);
    const [page, setPage] = useState(1);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        getCategory();
    }, []);
    const getCategory = async () => {
        const response = await categoryListService();
        if (response.status === 200) {
            setCategory(response.data.data);
        }
    };
    const getFaq = async () => {
        const formData = {
            category: catId,
            keyword,
        };
        const response = await faqListService(formData, page);
        if (response.status === 200) {
            setFaq(response.data.data.records);
            setFaqMeta(response.data.data.meta);
        }
    };
    useMemo(() => {
        getFaq();
    }, [category, keyword, catId, page]);

    return (
        <>
            <Box style={styles.faqBg} className='faqSection relative'>
                <Box sx={{ flexGrow: 1 }} className='ph-80'>
                    <Grid container spacing={3} padding={3}>
                        <Grid item xs={12} md={4}>
                            <Card className='quickNavigationArea'
                                sx={{ width: '100%', }}>
                                <CardContent>
                                    <Typography
                                        variant='h4'
                                        sx={{
                                            fontWeight: 'bold',
                                            fontFamily: 'Montserrat',
                                            color: '#444',
                                        }}
                                    >
                                        Quick Navigation
                                    </Typography>
                                    <MenuList className='quickNavigationList'>
                                        {category.map((val, i) => (
                                            <MenuItem
                                                sx={boxSX}
                                                onClick={() => {
                                                    setCatId(val.id);
                                                }}
                                            >
                                                {val.name}
                                            </MenuItem>
                                        ))}
                                        {/* <MenuItem sx={boxSX}>Customer Support</MenuItem>
                                        <MenuItem sx={boxSX}>License</MenuItem>
                                        <MenuItem sx={boxSX}>Pricing & Support</MenuItem>
                                        <MenuItem sx={boxSX}>Purchasing Online </MenuItem> */}
                                    </MenuList>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box>
                                <div className='acordianSrc relative'>
                                    <input
                                        type='text'
                                        onChange={(e) => {
                                            setKeyword(e.target.value);
                                        }}
                                        className='acordianSrcInput'
                                        placeholder='Search your question..'
                                    />
                                    {/* <button className='acordianSrcBtn'>
                                        <SearchIcon />
                                    </button> */}
                                </div>
                            </Box>
                            <Box className='accordionArea'
                                sx={{
                                    minHeight: '280px',
                                }}
                            >
                                {faq.map((val, i) => (
                                    <Accordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                                        <AccordionSummary
                                            // expandIcon={<ExpandMoreIcon />}
                                            expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
                                            aria-controls={`panel${i}bh-content`}
                                            id={`panel${i}bh-header`}

                                        // expandIcon={expanded === 'panel1' ? <AddIcon /> : <MinimizeIcon />}
                                        // aria-controls="panel1bh-content"
                                        // id="panel1bh-header"
                                        >
                                            <Typography className='accordionList'>
                                                {val.question}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Inter',
                                                    color: '#444',
                                                }}
                                            >
                                                {val.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>
                            <Box
                                sx={{
                                    marginTop: '2rem',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Stack spacing={2}>
                                    {/* <Pagination count={10} color='primary' /> */}
                                    <Pagination
                                        count={faqMeta.totalPages}
                                        color='primary'
                                        page={page}
                                        onChange={(e, val) => {
                                            setPage(val);
                                        }}
                                    />
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default QuickNavigation;
