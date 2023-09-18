import { Outlet } from "react-router-dom";
import Logo from "../logo/Logo";

import "./Layout.scss";
import Sidebar from "../sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <Logo />
      <div className="App">
        <Sidebar />
        <div className="page">
          <span className="tags top-tags">&lt;body&gt;</span>
          <Outlet />
          <span className="tags bottom-tags">
            &lt;body&gt;
            <br />
            <span className="bottom-tag-html">&lt;/html&gt;</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Layout;
