import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';

import css from './ContactsPage.module.css';

const ContactsPage = () => {
  return (
    <div className={css.container}>
      {/* <h2 className={css.heading}>Your Contacts</h2> */}

      <div className={css.formRow}>
  <div className={css.form}>
    <ContactForm />
  </div>
  <div className={css.form}>
    <SearchBox />
  </div>
</div>

      <ContactList />
    </div>
  );
};

export default ContactsPage;

