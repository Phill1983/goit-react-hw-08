import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.heading}>Register</h2>
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
