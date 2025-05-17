import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact/Contact';
import { deleteContact } from '@/redux/contacts/contactsOps';
import {
  selectFilteredContacts,
  selectLoading,
  selectError
} from '@/redux/contacts/contactsSelectors';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleDelete = (id) => dispatch(deleteContact(id));

  if (loading) return <><Loader /><p className={css.text}>Contacs are refreshing...</p></> ;
  if (error) return <ErrorMessage message={error} />;
  if (!contacts.length)
    return <p className={css.emptyText}>There is no such contact</p>;

  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          number={number}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
