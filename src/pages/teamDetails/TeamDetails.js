import React, { useEffect } from 'react';
import { Box, Typography, Container, Avatar, Pagination, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaLinkedin, FaYoutube } from 'react-icons/fa';

import WhyBook from '../../section/tour/inner/WhyBook';
import CustomerSupport from '../../section/tour/inner/CustomerSupport';
import { teamDetailsService } from '../../service/team.service';

const TeamDetails = () => {
    const { slug } = useParams();
    const [teamDtl, setTeamDtl] = useState({});
    // const [tour, setTour] = useState();
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        getTeamDetails();
    }, []);

    const getTeamDetails = async () => {
        const team = await teamDetailsService(slug);
        if (team.status === 200) {
            setTeamDtl(team.data.data);
        }
    };
    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const hoverStyle = {
        color: isHover ? '#292f69' : '#444',
        textDecoration: 'underline',
    };
    return (
        <>
            <Box
                className='contentPageBann'
                style={{ background: 'url(../images/team-bg.jpg) top center no-repeat' }}
            ></Box>
            <Box sx={{ flexGrow: 1 }} className='ph-80 blogArea'>
                {/* <Container> */}
                <Grid container spacing={3} padding={3}>
                    <Grid sx={12} sm={12} md={9} lg={9}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                padding: '3rem',
                            }}
                        >
                            <Box className='personImg'>
                                <Box className='personImgInner'>
                                    <img
                                        src={`${process.env.REACT_APP_HOST_IMAGE}image/team/${teamDtl.image}`}
                                        alt=''
                                    />
                                </Box>
                            </Box>
                            <Box className='personDetails'>
                                <Box className='personDetailsInner'>
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            fontWeight: '600',
                                            color: '#666',
                                            paddingBottom: '0',
                                        }}
                                    >
                                        {teamDtl.sub_title}
                                    </Typography>
                                    <Typography variant='h3_hoabout'>{teamDtl.title}</Typography>
                                    <Typography
                                        variant='body1'
                                        dangerouslySetInnerHTML={{
                                            __html: teamDtl.content,
                                        }}
                                    ></Typography>
                                </Box>
                                <Box className='personDetailsInnerBox'>
                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            color: '#f97150',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1',
                                            fontFamily: 'Montserrat',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {teamDtl.experience_title}
                                    </Typography>
                                    <Typography
                                        variant='h3_package'
                                        dangerouslySetInnerHTML={{
                                            __html: teamDtl.experience_description,
                                        }}
                                    ></Typography>
                                </Box>
                                <Box className='personDetailsInnerBox'>
                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            color: '#f97150',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1',
                                            fontFamily: 'Montserrat',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {teamDtl.expertise_title}
                                    </Typography>
                                    <Typography variant='h3_package'>
                                        {teamDtl?.team_expertises
                                            ?.map((val, i) => val.region.name)
                                            .join(', ')
                                            .toString()}
                                    </Typography>
                                </Box>
                                <Box className='personDetailsInnerBox'>
                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            color: '#f97150',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1',
                                            fontFamily: 'Montserrat',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Email
                                    </Typography>
                                    <Typography variant='h3_package'>
                                        <Link
                                            to={'/'}
                                            style={hoverStyle}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            vinton.fenson@serenite.com
                                        </Link>
                                    </Typography>
                                </Box>

                                <Box className='personDetailsInnerBox'>
                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            color: '#f97150',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1',
                                            fontFamily: 'Montserrat',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Phone
                                    </Typography>
                                    <Typography variant='h3_package'>
                                        <Link
                                            to={'/'}
                                            style={hoverStyle}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            (+01) 123 456 7890
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={12} md={3} lg={3}>
                        <Box className='teamDtlsRight'>
                            <WhyBook />
                            <CustomerSupport />
                        </Box>
                    </Grid>
                </Grid>
                {/* </Container> */}
            </Box>
        </>
    );
};

export default TeamDetails;
