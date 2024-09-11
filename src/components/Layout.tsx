import { Avatar, Divider, Typography } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "../App.tsx";
const { Title } = Typography;

function Layout() {
  const { user } = useUser();

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4">
        <header className="flex items-center justify-between py-3">
          <Title level={3}>Ecnomerse</Title>
          <nav className="flex items-center gap-3 ">
            <Link to="home">Home</Link>
            <Link to="about">About</Link>
            <Link to="contact">Contact</Link>
            <Link to="profile">Profile</Link>
            <Link to="listing">Listing</Link>
          </nav>
          <div>
            <Avatar>
              {user.fullname
                ? user.fullname
                    .split(" ")
                    .map((part) => part[0].toUpperCase())
                    .join("")
                : "A"}
            </Avatar>
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
