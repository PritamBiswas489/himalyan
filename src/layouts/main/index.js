import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

export default function HomeLayout () {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
}