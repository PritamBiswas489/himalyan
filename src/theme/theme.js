import { createTheme } from "@mui/material/styles";
export let theme = createTheme();
theme = createTheme(theme, {
    typography: {
        h2: {
            fontSize: '1.7rem',
            fontWeight: "bold",
            fontFamily: "Montserrat",
            '@media (min-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h2_itBan: {
            fontSize: '1.3rem',
            fontWeight: "bold",
            fontFamily: "Montserrat",
            '@media (min-width:600px)': {
                fontSize: '1.7rem',
            },
        },
        h3_abt: {
            fontSize: '1.4rem',
            fontWeight: "bold",
            fontFamily: "Montserrat",
            '@media (min-width:600px)': {
                fontSize: '1.7rem',
            },
        },
        h3_hoabout: {
            fontWeight: "bold",
            fontFamily: "Montserrat",
            fontSize: "1.563rem",
            '@media (min-width:768px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            fontSize: '1.2rem',
            '@media (min-width:600px)': {
                fontSize: '1.3rem',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '1.5rem',
            },
        },
        h3_package: {
            fontSize: '1rem',
            fontWeight: "bold",
            fontFamily: "Montserrat",
            '@media (min-width:768px)': {
                fontSize: '1.3rem',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '1.4rem',
            },
        },
        h2_aboutus: {
            fontSize: '2.75rem',
            color: "#f97150",
            fontWeight: "bold",
            '@media (min-width:600px)': {
                fontSize: '3.75rem',
            },
        },
        h5: {
            fontWeight: "bold",
            fontFamily: "Montserrat",
            fontSize: "16px",
            '@media (min-width:1366px)': {
                fontSize: '25px',
            },
            '@media (min-width:768px)': {
                fontSize: '22px',
            },
        },
        h6_df: {
            fontFamily: "Amertha PERSONAL USE ONLY",
            fontSize: "30px",
            color: "#f97150",
        },
    },

});