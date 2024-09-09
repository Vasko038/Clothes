import {Link, Outlet} from "react-router-dom";

function Layout() {
  return (
    <>
      <header>header</header>
	    <Link to={"/homepage/profile"}>Profile</Link>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
}

export default Layout;
