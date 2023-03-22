import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Avatar, Pagination, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { BsArrowRightCircle } from 'react-icons/bs';
import { teamListService, teamContentService } from '../../service/team.service';

const TeamList = () => {
    const [team, setTeam] = useState([]);
    const [teamMeta, setTeamMeta] = useState({});
    const [page, setPage] = useState(1);
    const [content, setContent] = useState({});
    const [item, setItem] = useState([]);

    useEffect(() => {
        getTeam();
        getTeamContent();
    }, [page]);

    const getTeamContent = async () => {
        const result = await teamContentService();
        if (result.status === 200) {
            setContent(result.data.data.team);
            setItem(result.data.data.item);
        }
    };
    const getTeam = async () => {
        const team = await teamListService(page);
        if (team.status === 200) {
            setTeam(team.data.data.records);
            setTeamMeta(team.data.data.meta);
        }
    };
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
            <Box className='contentPageBann' style={{ background: 'url(../images/team-bg.jpg) top center no-repeat' }}></Box>
            <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth='lg'>
                    <Grid container spacing={3} padding={3}>
                        <Grid sx={12} sm={12} md={8} lg={8}>
                            <Box
                                className='teamIntro'
                                sx={{
                                    maxWidth: '600px',
                                    width: '100%',
                                }}
                            >
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
                                    {content?.content?.about_me_title}
                                </Typography>
                                <Typography variant='h2'>{content?.content?.about_me_sub_title}</Typography>
                                <Typography
                                    variant='body1'
                                    dangerouslySetInnerHTML={{
                                        __html: content?.content?.about_me_description,
                                    }}
                                ></Typography>
                            </Box>
                            <Box
                                className='teamIntro'
                                sx={{
                                    maxWidth: '600px',
                                    width: '100%',
                                }}
                            >
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
                                    {content?.content?.skill_title}
                                </Typography>
                                <Typography variant='h2_itBan'>{content?.content?.skill_sub_title}</Typography>
                                <Typography
                                    variant='body1'
                                    dangerouslySetInnerHTML={{
                                        __html: content?.content?.skill_description,
                                    }}
                                ></Typography>
                            </Box>

                            <Box
                                sx={{
                                    maxWidth: '600px',
                                    width: '100%',
                                    margin: '4rem 0 6rem',
                                }}
                            >
                                <Grid container spacing={3} padding={0}>
                                    {item.map((val, i) => (
                                        <Grid sx={12} sm={6} md={6} lg={6}>
                                            <Box
                                                sx={{
                                                    boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                                    padding: '3rem 2rem',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Avatar
                                                    alt='Remy Sharp'
                                                    src={`${process.env.REACT_APP_HOST_IMAGE}image/team/${val?.image}`}
                                                    variant='square'
                                                    sx={{
                                                        width: 64,
                                                        height: 64,
                                                        margin: '0 auto',
                                                    }}
                                                />
                                                <Typography
                                                    variant='h4'
                                                    sx={{
                                                        fontSize: '1.25rem',
                                                        fontWeight: '700',
                                                        fontFamily: 'Montserrat',
                                                        marginTop: '1.25rem',
                                                    }}
                                                >
                                                    {val?.title}
                                                </Typography>
                                                <Typography variant='body1'>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: val.description,
                                                        }}
                                                    ></span>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}

                                    {/* <Grid sx={12} sm={6} md={6} lg={6}>
                                        <Box
                                            sx={{
                                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                                padding: '3rem 2rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Avatar
                                                alt='Remy Sharp'
                                                src='../images/team/1.svg'
                                                variant='square'
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    margin: '0 auto',
                                                }}
                                            />
                                            <Typography
                                                variant='h4'
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '700',
                                                    fontFamily: 'Montserrat',
                                                    marginTop: '1.25rem',
                                                }}
                                            >
                                                Design systems
                                            </Typography>
                                            <Typography variant='body1'>
                                                It is a long established fact that a reader will be distracted
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid sx={12} sm={6} md={6} lg={6}>
                                        <Box
                                            sx={{
                                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                                padding: '3rem 2rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Avatar
                                                alt='Remy Sharp'
                                                src='../images/team/2.svg'
                                                variant='square'
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    margin: '0 auto',
                                                }}
                                            />
                                            <Typography
                                                variant='h4'
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '700',
                                                    fontFamily: 'Montserrat',
                                                    marginTop: '1.25rem',
                                                }}
                                            >
                                                Prototyping
                                            </Typography>
                                            <Typography variant='body1'>
                                                It is a long established fact that a reader will be distracted
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid sx={12} sm={6} md={6} lg={6}>
                                        <Box
                                            sx={{
                                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                                padding: '3rem 2rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Avatar
                                                alt='Remy Sharp'
                                                src='../images/team/3.svg'
                                                variant='square'
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    margin: '0 auto',
                                                }}
                                            />
                                            <Typography
                                                variant='h4'
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '700',
                                                    fontFamily: 'Montserrat',
                                                    marginTop: '1.25rem',
                                                }}
                                            >
                                                Ui/Ux design
                                            </Typography>
                                            <Typography variant='body1'>
                                                It is a long established fact that a reader will be distracted
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid sx={12} sm={6} md={6} lg={6}>
                                        <Box
                                            sx={{
                                                boxShadow: '0px 0px 68px 0px rgba(0, 0, 0, 0.08)',
                                                padding: '3rem 2rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Avatar
                                                alt='Remy Sharp'
                                                src='../images/team/4.svg'
                                                variant='square'
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    margin: '0 auto',
                                                }}
                                            />
                                            <Typography
                                                variant='h4'
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '700',
                                                    fontFamily: 'Montserrat',
                                                    marginTop: '1.25rem',
                                                }}
                                            >
                                                Product Strategy
                                            </Typography>
                                            <Typography variant='body1'>
                                                It is a long established fact that a reader will be distracted
                                            </Typography>
                                        </Box>
                                    </Grid> */}
                                </Grid>
                            </Box>

                            <Box
                                className='experience'
                                sx={{
                                    maxWidth: '600px',
                                    width: '100%',
                                }}
                            >
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
                                    {content?.content?.experience_title}
                                </Typography>
                                <Typography variant='h2_itBan'>{content?.content?.experience_sub_title}</Typography>
                                <Typography
                                    variant='body1'
                                    dangerouslySetInnerHTML={{
                                        __html: content?.content?.experience_description,
                                    }}
                                ></Typography>
                            </Box>

                            {/* <Box
                                className='experience'
                                sx={{
                                    maxWidth: '600px',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant='subtitle1'
                                    sx={{
                                        color: '#f97150',
                                        letterSpacing: '1',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '600',
                                    }}
                                >
                                    {content?.content?.freelance_title}
                                </Typography>
                                <Typography variant='h3_package'>{content?.content?.freelance_sub_title}</Typography>
                                <Typography
                                    variant='body1'
                                    dangerouslySetInnerHTML={{
                                        __html: content?.content?.freelance_description,
                                    }}
                                ></Typography>
                            </Box>

                            <Box
                                className='experience'
                                sx={{
                                    maxWidth: '600px',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant='subtitle1'
                                    sx={{
                                        color: '#f97150',
                                        letterSpacing: '1',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '600',
                                    }}
                                >
                                    {content?.content?.uxper_company_title}
                                </Typography>
                                <Typography variant='h3_package'>
                                    {content?.content?.uxper_company_sub_title}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    dangerouslySetInnerHTML={{
                                        __html: content?.content?.uxper_company_description,
                                    }}
                                ></Typography>
                            </Box>

                            <Box
                                className='experience'
                                sx={{
                                    maxWidth: '600px',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant='subtitle1'
                                    sx={{
                                        color: '#f97150',
                                        letterSpacing: '1',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '600',
                                    }}
                                >
                                    {content?.content?.envato_group_title}
                                </Typography>
                                <Typography variant='h3_package'>{content?.content?.envato_group_sub_title}</Typography>
                                <Typography
                                    variant='body1'
                                    dangerouslySetInnerHTML={{
                                        __html: content?.content?.envato_group_description,
                                    }}
                                ></Typography>
                            </Box>
                            <Box
                                className='arrow'
                                sx={{
                                    maxWidth: '600px',
                                    width: '100%',
                                }}
                            >
                                <img src={`../images/team/arrow.svg`} alt='' />
                            </Box> */}

                            {content?.content?.experience_info.map((val, i) => (
                                <Box
                                    className='experience'
                                    sx={{
                                        maxWidth: '600px',
                                        width: '100%',
                                    }}
                                >
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
                                        {val.title}
                                    </Typography>
                                    <Typography variant='h2_itBan'>{val?.sub_title}</Typography>
                                    <Typography
                                        variant='body1'
                                        dangerouslySetInnerHTML={{
                                            __html: val?.description,
                                        }}
                                    ></Typography>
                                </Box>
                            ))}

                            <Box
                                className='teamIntro'
                                sx={{
                                    maxWidth: '600px',
                                    width: '100%',
                                }}
                            >
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
                                    {content?.content?.lets_talk_title}
                                </Typography>
                                <Typography variant='h2'>{content?.content?.lets_talk_sub_title}</Typography>
                                <Box
                                    sx={{
                                        marginTop: '2rem',
                                    }}
                                >
                                    <Link to={'/contact'}>
                                    <ColorButton variant='contained' className=''>
                                        Hire me
                                    </ColorButton>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid sx={12} sm={12} md={4} lg={4}>
                            <Box className='singleImg'>
                                <img src={`${process.env.REACT_APP_HOST_IMAGE}image/team/${content?.content?.image}`} alt='' />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{ flexGrow: 1 }} className='ph-80 blogArea'>
                <Grid container spacing={3} padding={3}>
                    <Grid sx={12} sm={12} md={12} lg={12}>
                        <Box
                            className='teamTitle'
                            sx={{
                                textAlign: 'center',
                                marginBottom: '1.5rem',
                            }}
                        >
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    color: '#f97150',
                                    fontWeight: '700',
                                    fontFamily: 'Montserrat',
                                }}
                            >
                                {content?.content?.team_we_have_title}
                            </Typography>
                            <Typography
                                variant='h3'
                                style={{
                                    fontSize: '2.25rem',
                                    fontWeight: '700',
                                    fontFamily: 'Montserrat',
                                }}
                            >
                                {content?.content?.team_we_have_sub_title}
                            </Typography>
                            <Typography
                                variant='body1'
                                dangerouslySetInnerHTML={{
                                    __html: content?.content?.team_we_have_description,
                                }}
                            ></Typography>
                        </Box>
                    </Grid>

                    {team.map((val, i) => (
                        <Grid sx={12} sm={6} md={4} lg={4}>
                            <Box
                                className='teamBox'
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    width: '100%',
                                    alignItems: 'center',
                                }}
                            >
                                <Box className='teamListImg'>
                                    <Link to={'/'}>
                                        <img src={`${process.env.REACT_APP_HOST_IMAGE}image/team/${val.image}`} alt='' />
                                    </Link>
                                </Box>
                                <Box className='teamListDtls'>
                                    <Typography
                                        variant='h4'
                                        sx={{
                                            fontSize: '1.1rem',
                                            fontFamily: 'Montserrat',
                                            fontWeight: '700',
                                        }}
                                    >
                                        {val.title}
                                    </Typography>
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            fontSize: '.9rem',
                                            fontFamily: 'Montserrat',
                                            fontWeight: '500',
                                            color: '#666',
                                            marginBottom: '.8rem',
                                        }}
                                    >
                                        {val.sub_title}
                                    </Typography>
                                    {/* <Box className='itemSocial'>
                                        <ul className='d-flex'>
                                            <li>
                                                <Link to={'/'}>
                                                    <FaFacebookSquare />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/'}>
                                                    <FaTwitterSquare />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/'}>
                                                    <FaInstagramSquare />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/'}>
                                                    <FaLinkedin />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/'}>
                                                    <FaYoutube />
                                                </Link>
                                            </li>
                                        </ul>
                                    </Box> */}
                                    <Link className='redMore' to={`/team-details/${val.slug}`}>
                                        Read More <BsArrowRightCircle />
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                    {/* <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box
                            className='teamBox'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Box className='teamListImg'>
                                <Link to={'/'}>
                                    <img src={`../images/team/1.jpg`} alt='' />
                                </Link>
                            </Box>
                            <Box className='teamListDtls'>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '700',
                                    }}
                                >
                                    Richard Simpson
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontSize: '.9rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '500',
                                        color: '#666',
                                        marginBottom: '.8rem',
                                    }}
                                >
                                    VP of Engineering
                                </Typography>
                                <Box className='itemSocial'>
                                    <ul className='d-flex'>
                                        <li>
                                            <Link to={'/'}>
                                                <FaFacebookSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaTwitterSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaInstagramSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaLinkedin />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaYoutube />
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>
                                <Link className='redMore' to={'/'}>
                                    Read More <BsArrowRightCircle />
                                </Link>
                            </Box>
                        </Box>
                    </Grid> */}
                    {/* <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box
                            className='teamBox'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Box className='teamListImg'>
                                <Link to={'/'}>
                                    <img src={`../images/team/2.jpg`} alt='' />
                                </Link>
                            </Box>
                            <Box className='teamListDtls'>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '700',
                                    }}
                                >
                                    Richard Simpson
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontSize: '.9rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '500',
                                        color: '#666',
                                        marginBottom: '.8rem',
                                    }}
                                >
                                    VP of Engineering
                                </Typography>
                                <Box className='itemSocial'>
                                    <ul className='d-flex'>
                                        <li>
                                            <Link to={'/'}>
                                                <FaFacebookSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaTwitterSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaInstagramSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaLinkedin />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaYoutube />
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>
                                <Link className='redMore' to={'/'}>
                                    Read More <BsArrowRightCircle />
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box
                            className='teamBox'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Box className='teamListImg'>
                                <Link to={'/'}>
                                    <img src={`../images/team/3.jpg`} alt='' />
                                </Link>
                            </Box>
                            <Box className='teamListDtls'>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '700',
                                    }}
                                >
                                    Richard Simpson
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontSize: '.9rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '500',
                                        color: '#666',
                                        marginBottom: '.8rem',
                                    }}
                                >
                                    VP of Engineering
                                </Typography>
                                <Box className='itemSocial'>
                                    <ul className='d-flex'>
                                        <li>
                                            <Link to={'/'}>
                                                <FaFacebookSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaTwitterSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaInstagramSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaLinkedin />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaYoutube />
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>
                                <Link className='redMore' to={'/'}>
                                    Read More <BsArrowRightCircle />
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box
                            className='teamBox'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Box className='teamListImg'>
                                <Link to={'/'}>
                                    <img src={`../images/team/4.jpg`} alt='' />
                                </Link>
                            </Box>
                            <Box className='teamListDtls'>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '700',
                                    }}
                                >
                                    Richard Simpson
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontSize: '.9rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '500',
                                        color: '#666',
                                        marginBottom: '.8rem',
                                    }}
                                >
                                    VP of Engineering
                                </Typography>
                                <Box className='itemSocial'>
                                    <ul className='d-flex'>
                                        <li>
                                            <Link to={'/'}>
                                                <FaFacebookSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaTwitterSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaInstagramSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaLinkedin />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaYoutube />
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>
                                <Link className='redMore' to={'/'}>
                                    Read More <BsArrowRightCircle />
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box
                            className='teamBox'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Box className='teamListImg'>
                                <Link to={'/'}>
                                    <img src={`../images/team/5.jpg`} alt='' />
                                </Link>
                            </Box>
                            <Box className='teamListDtls'>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '700',
                                    }}
                                >
                                    Richard Simpson
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontSize: '.9rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '500',
                                        color: '#666',
                                        marginBottom: '.8rem',
                                    }}
                                >
                                    VP of Engineering
                                </Typography>
                                <Box className='itemSocial'>
                                    <ul className='d-flex'>
                                        <li>
                                            <Link to={'/'}>
                                                <FaFacebookSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaTwitterSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaInstagramSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaLinkedin />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaYoutube />
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>
                                <Link className='redMore' to={'/'}>
                                    Read More <BsArrowRightCircle />
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={12} sm={6} md={4} lg={4}>
                        <Box
                            className='teamBox'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Box className='teamListImg'>
                                <Link to={'/'}>
                                    <img src={`../images/team/6.jpg`} alt='' />
                                </Link>
                            </Box>
                            <Box className='teamListDtls'>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '700',
                                    }}
                                >
                                    Richard Simpson
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontSize: '.9rem',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '500',
                                        color: '#666',
                                        marginBottom: '.8rem',
                                    }}
                                >
                                    VP of Engineering
                                </Typography>
                                <Box className='itemSocial'>
                                    <ul className='d-flex'>
                                        <li>
                                            <Link to={'/'}>
                                                <FaFacebookSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaTwitterSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaInstagramSquare />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaLinkedin />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>
                                                <FaYoutube />
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>
                                <Link className='redMore' to={'/'}>
                                    Read More <BsArrowRightCircle />
                                </Link>
                            </Box>
                        </Box>
                    </Grid> */}
                    <Grid sx={12} sm={12} md={12} lg={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '2rem',
                            }}
                        >
                            <Pagination
                                count={teamMeta.totalPages}
                                color='primary'
                                page={page}
                                onChange={(e, val) => {
                                    setPage(val);
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default TeamList;
