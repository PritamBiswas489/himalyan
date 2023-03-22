import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import { useStyles } from '../../../theme/Style';
import { widgetsApi } from '../../../service/Widgets.service';

const CustomerSupport = () => {

    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        getCustomerSupport();
    }, []);

    const getCustomerSupport = async () => {
        const res = await widgetsApi.customerSupport();
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
                            padding: '5px 10px',
                            textAlign: 'center',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: '#fff',
                            background: '#f97150',
                        }}
                    >24/7 Customer Support</Typography>
                    <CardContent style={{ padding: '5px 30px' }}>
                        {data.map((element, index) => (
                            <Typography>
                                <Avatar alt="Travis Howard" src={`${process.env.REACT_APP_HOST_IMAGE}image/customerSupport/${element.icon}`}
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

export default CustomerSupport
