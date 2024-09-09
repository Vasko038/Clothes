import {Link, Outlet} from "react-router-dom";
import { Avatar, Typography } from "antd";
const { Title } = Typography;

function Layout() {
  return (
    <>
      <header>header</header>
      <div className="">
        <header className="flex justify-between py-2">
          <Title level={3}>eEcnomerse</Title>
          <nav className=" flex gap-3">
            <Link to="ch">Child 1</Link>
            <Link to="chil">Child 2</Link>
	          <Link to="/homepage/profile">Profile</Link>
          </nav>
          <div>
            <Avatar>sdf</Avatar>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>footer</footer>
      </div>
    </>
  );
}

export default Layout;
