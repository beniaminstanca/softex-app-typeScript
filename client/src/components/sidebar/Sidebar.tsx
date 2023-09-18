import { Form, NavLink, Link, useRouteLoaderData } from "react-router-dom";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import LogoS from "../../assets/images/logo-s.png";
import LogoSubtitle from "../../assets/images/stanca.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBook,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Sidebar.module.scss";

function Sidebar() {
  const dispatch = useDispatch();
  const token: any = useRouteLoaderData("root");
  if (token) {
    dispatch(authActions.login());
  } else {
    dispatch(authActions.logout());
  }
  return (
    <div className={classes["nav-bar"]}>
      <Link className={classes.logo} to="/">
        <img src={LogoS} alt="logo" />
        <img className={classes["sub-logo"]} src={LogoSubtitle} alt="logo" />
      </Link>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          to="/"
        >
          <FontAwesomeIcon icon={faHome} color="#4d4d4e"></FontAwesomeIcon>
        </NavLink>
        {token && (
          <NavLink
            to="/offers"
            className={({ isActive }) =>
              isActive ? classes.active : 'oferte'
            }
            end
          >
            <FontAwesomeIcon icon={faFile} color="#4d4d4e"></FontAwesomeIcon>
          </NavLink>
        )}

        <NavLink
          to="/offers/new"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          <FontAwesomeIcon icon={faBook} color="#4d4d4e"></FontAwesomeIcon>
        </NavLink>

        {!token && (
          <NavLink
            to="/auth?mode=login"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <FontAwesomeIcon icon={faUser} color="#4d4d4e"></FontAwesomeIcon>
          </NavLink>
        )}
        {token && (
          <Form action="/logout" method="POST">
            <Button>Logout</Button>
          </Form>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
