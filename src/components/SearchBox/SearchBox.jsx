import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter } from '../../redux/filters/filtersSlice';
import { selectNameFilter } from '../../redux/filters/filtersSelectors';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(setNameFilter(e.target.value));
  };

  return (
    <div className={css.wrapper}>
      <label className={css.label}>
        Find contacts by name
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          className={css.input}
        />
      </label>
    </div>
  );
}
