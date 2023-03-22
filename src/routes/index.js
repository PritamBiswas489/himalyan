import { Navigate, useRoutes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register.js';
import HomeLayout from '../layouts/main';
import Home from '../pages/home/Home';
import Destination from '../pages/destination/Destination';
import About from '../pages/about/About';
import Faq from '../pages/faq/Faq';
import Contact from '../pages/contact/Contact';
import TourDetails from '../pages/tour/TourDetails';
import Activity from '../pages/activity/Activity';
import ActivityDetails from '../pages/activity/ActivityDetails';
import Booking from '../pages/booking/Booking';
import AuthGuard from '../guards/AuthGuard';
import RegionDetails from '../pages/region/RegionDetails';
import Page404 from '../pages/404/Page404';
// import BookingList
import DestinationDetails from '../pages/destination/DestinationDetails';
import CustomizeTrip from '../pages/CustomizeTrip/CustomizeTrip';
import ViewBooking from '../pages/viewBooking/ViewBooking';
import Blog from '../pages/blog/Blog';
import BlogDetails from '../pages/blogDetails/BlogDetails';
import ContentPage from '../pages/contentPage/ContentPage';
import TeamList from '../pages/TeamList/TeamList';
import TeamDetails from '../pages/teamDetails/TeamDetails';

import Test from '../pages/test/Test';

export default function Router() {
    return useRoutes([
        {
            path: 'auth',
            children: [
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: 'register/:slug', element: <Register /> },
            ],
        },
        {
            path: '/',
            element: <HomeLayout />,
            children: [
                { element: <Home />, index: true },
                { path: 'home', element: <Home /> },
                { path: 'about', element: <About /> },
                { path: 'faq', element: <Faq /> },
                { path: 'contact', element: <Contact /> },
                { path: ':dest/:slug', element: <TourDetails /> },
                { path: 'customize-trip', element: <CustomizeTrip /> },
                { path: 'view-booking', element: <ViewBooking /> },
                { path: 'blog', element: <Blog /> },
                { path: 'blog-details/:slug', element: <BlogDetails /> },
                { path: 'support/:slug', element: <ContentPage /> },
                { path: 'team-list', element: <TeamList /> },
                { path: 'team-details/:slug', element: <TeamDetails /> },
                { path: 'region/:slug', element: <RegionDetails /> },
                { path: 'test', element: <Test /> },
            ],
        },
        {
            path: '/destination',
            element: <HomeLayout />,
            children: [
                { element: <Destination />, index: true },
                { path: ':slug', element: <DestinationDetails /> },
            ],
        },
        // {
        //     path: '/region',
        //     element: <HomeLayout />,
        //     children: [
        //         // { element: <Destination />, index: true },
        //         { path: ':slug', element: <RegionDetails />, index: true },
        //     ],
        // },
        {
            path: '/',
            element: (
                // <AuthGuard>
                <HomeLayout />
                // </AuthGuard>
            ),
            children: [{ path: 'payment', element: <Booking /> }],
        },
        {
            path: '/activity',
            element: <HomeLayout />,
            children: [
                { element: <Activity />, index: true },
                { path: ':slug', element: <ActivityDetails /> },
            ],
        },
        {
            path: '/style',
            element: <HomeLayout />,
            children: [{ element: <Activity />, index: true }],
        },
        {
            path: '*',
            // element: <LogoOnlyLayout />,
            children: [
              { path: '404', element: <Page404 /> },
              { path: '*', element: <Navigate to="/404" replace /> },
            ],
          },
    ]);
}
