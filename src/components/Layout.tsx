import { Avatar, Typography } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Title } = Typography;

function Layout() {
  return (
    <div className="">
      <header className="flex justify-between py-2">
        <Title level={3}>eEcnomerse</Title>
        <nav className=" flex gap-3">
          <Link to="ch">Child 1</Link>
          <Link to="chil">Child 2</Link>
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
  );
}

export default Layout;
