import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.heading}>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

