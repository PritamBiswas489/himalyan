import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';


// import {
//     MonetizationOnOutlined as MonetizationOnOutlinedIcon,
//     OpenWithOutlined as OpenWithOutlinedIcon,
//     CallOutlined as CallOutlinedIcon,
// }  from '@mui/icons-material';



import { useStyles } from '../../../theme/Style';
import { widgetsApi } from '../../../service/Widgets.service';

const WhyBook = () => {

    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        getwhyBook();
    }, []);

    const getwhyBook = async () => {
        const res = await widgetsApi.whyBok();
        if (res.status === 200 && res.data.status === 200 && res.data.success === true) {
            await setData(res.data.data);
        }
    }

    return (
        <>
            <Box mt={2} className='whyBookUs'>
                <Card sx={{
                    border: '#f97150 1px solid',
                    boxShadow: 'none',
                }}>
                    <Typography gutterBottom variant="h6"
                        sx={{
                            borderBottom: '#f97150 1px solid',
                            padding: '5px 10px',
                            textAlign: 'center',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: '#f97150',
                        }}
                    >Why Book With Us?</Typography>
                    <CardContent style={{ padding: '5px 30px' }}>
                        {data.map((element, index) => (
                            <Typography>
                                <Avatar alt="Travis Howard" src={`${process.env.REACT_APP_HOST_IMAGE}image/whyBook/${element.icon}`}
                                    sx={{
                                        width: 18,
                                        height: 18,
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                        marginRight: '20px',
                                    }}
                                />
                                {element.name}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default WhyBook
