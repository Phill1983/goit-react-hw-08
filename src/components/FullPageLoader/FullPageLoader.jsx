import Loader from '../Loader/Loader';
import css from './FullPageLoader.module.css';

const FullPageLoader = () => {
  return (
    <div className={css.wrapper}>
      <Loader />
      <p className={css.text}>Page is refreshing...</p>
    </div>
  );
};

export default FullPageLoader;

