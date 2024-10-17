import { Outlet } from 'react-router-dom';
import { NavB } from './components/navbar/Navbar';
import { BottomBar } from './components/bottombar/Bottombar';

//  The Outlet component is used to render the content of the child routes within this layout.
const Layout = () => {
  return (
    <div>
      <NavB />
      <Outlet />
      <BottomBar />
    </div>
  );
};

export default Layout;
