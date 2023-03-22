import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Box, Card, Typography, CardContent, Button } from '@mui/material';
import { QuestionAnswerOutlined as QuestionAnswerOutlinedIcon } from '@mui/icons-material';
import parse from 'html-react-parser';

const Faq = (props) => {
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
    // const [expanded, setExpanded] = useState(false);
    const [expanded, setExpanded] = useState([]);
    const [tour, setTour] = useState(props.tour);

    const handleChange = (panel) => {
        // setExpanded(isExpanded ? panel : false);
        if (expanded.includes(panel)) setExpanded(expanded.filter((val, i) => val !== panel));
        else setExpanded([...expanded, panel]);
    };

    const handleAllExpand = () => {
        // console.log('hello this is working');
        setExpanded(tour.get_faq.map((val, i) => `panel${i}`));
    };
    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    display: 'flex',
                    boxShadow: 'none',
                    border: '#ddd 1px solid',
                    marginTop: '20px',
                    height: 'auto',
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
                            <QuestionAnswerOutlinedIcon
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
                            FAQ
                        </Typography>
                        <ColorButton variant='contained' className='LearnMoreBtn' onClick={handleAllExpand}>
                            Expand All
                        </ColorButton>
                    </Box>
                    <Box className='faqAccordion'>
                        {tour.get_faq.map((element, index) => (
                            <Accordion
                                defaultExpanded={true}
                                expanded={expanded.includes(`panel${index}`) ? true : false}
                                onChange={() => {
                                    handleChange(`panel${index}`);
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel1bh-content'
                                    id='panel1bh-header'
                                >
                                    <Typography
                                        sx={{
                                            width: '100%',
                                            flexShrink: 0,
                                            fontWeight: '600',
                                            fontSize: '18px',
                                            fontFamily: 'Montserrat',
                                        }}
                                    >
                                        {element.question}?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ fontFamily: 'Montserrat', color: '#444' }}>
                                        {parse(element.answer)}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default Faq;
