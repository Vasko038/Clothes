import { Avatar, Divider, Typography } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Title } = Typography;

function Layout() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4">
        <header className="flex justify-between items-center py-3">
          <Title level={3}>Ecnomerse</Title>
          <nav className=" flex gap-3 items-center">
            <Link to="home">Home</Link>
            <Link to="about">About</Link>
            <Link to="contact">Contact</Link>
          </nav>
          <div>
            <Avatar>A</Avatar>
          </div>
        </header>
        <Divider style={{ margin: 0 }} />
        <main>
          <Outlet />
        </main>
        <footer className="py-[40px] grid grid-cols-5 gap-3">
          <div>Eccomerse</div>
          <div>Eccomerse</div>
          <div>Eccomerse</div>
          <div>Eccomerse</div>
          <div>Eccomerse</div>
        </footer>
      </div>
    </>
  );
}

export default Layout;
