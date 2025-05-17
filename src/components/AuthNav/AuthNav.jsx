import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div className={css.wrapper}>
      <NavLink to="/register" className={css.link}>
        Register
      </NavLink>
      <NavLink to="/login" className={css.link}>
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
