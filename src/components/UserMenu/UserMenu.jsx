import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={css.menu}>
      <p className={css.greeting}>
        Hello, <span className={css.username}>{name}</span>!
      </p>
      <button onClick={handleLogout} className={css.button}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
