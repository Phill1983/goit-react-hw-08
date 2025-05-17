import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Welcome to the Contacts Book </h1>
      <p className={css.text}>This app helps you manage your personal contacts easily and securely.</p>
    </div>
  );
};

export default HomePage;
