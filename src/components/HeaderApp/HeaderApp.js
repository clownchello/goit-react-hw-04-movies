import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import s from './HeaderApp.module.css';

function HeaderApp(props) {
  return (
    <nav className={s.nav}>
      <NavLink
        exact
        to={routes.home}
        className={s.link}
        activeClassName={s.linkActive}
      >
        Home
      </NavLink>
      <NavLink
        to={routes.movies}
        className={s.link}
        activeClassName={s.linkActive}
      >
        Movies
      </NavLink>
    </nav>
  );
}

HeaderApp.propTypes = {};

export default HeaderApp;
