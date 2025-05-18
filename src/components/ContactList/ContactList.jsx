import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact/Contact';
import { deleteContact } from '@/redux/contacts/operations';
import {
  selectFilteredContacts,
  selectLoading,
  selectError
} from '@/redux/contacts/selectors';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleDelete = (id) => dispatch(deleteContact(id));

  if (loading) {
    return (
      <>
        <Loader />
        <p className={css.text}>Contacs are refreshing...</p>
      </>
    );
  }

  if (error) return <ErrorMessage message={error} />;
  if (!contacts.length)
    return <p className={css.emptyText}>There is no such contact</p>;

  const isCyrillic = (char) => /[а-яА-ЯёЁіІїЇєЄ]/.test(char);

  const cyrillicContacts = contacts
    .filter((c) => isCyrillic(c.name[0]))
    .sort((a, b) => a.name.localeCompare(b.name, 'uk'));

  const latinContacts = contacts
    .filter((c) => !isCyrillic(c.name[0]))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));

  return (
    <ul className={css.list}>
      {cyrillicContacts.length > 0 && (
        <>
          <li className={css.sectionLabel}>А–Я</li>
          {cyrillicContacts.map(({ id, name, number }) => (
            <Contact
              key={id}
              id={id}
              name={name}
              number={number}
              onDelete={handleDelete}
            />
          ))}
        </>
      )}

      {latinContacts.length > 0 && (
        <>
          <li className={css.sectionLabel}>A–Z</li>
          {latinContacts.map(({ id, name, number }) => (
            <Contact
              key={id}
              id={id}
              name={name}
              number={number}
              onDelete={handleDelete}
            />
          ))}
        </>
      )}
    </ul>
  );
}
