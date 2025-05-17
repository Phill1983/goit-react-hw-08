import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, fetchContacts } from '../../redux/contacts/operations';
import ActionButton from '../ActionButton/ActionButton';
import toast, { Toaster } from 'react-hot-toast';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState(() => localStorage.getItem('contactName') || '');
  const [number, setNumber] = useState(() => localStorage.getItem('contactNumber') || '');

  // Save fields in localStorage
  useEffect(() => {
    localStorage.setItem('contactName', name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem('contactNumber', number);
  }, [number]);

  const resetForm = () => {
    setName('');
    setNumber('');
    localStorage.removeItem('contactName');
    localStorage.removeItem('contactNumber');
  };

  const handleAdd = () => {
    if (!name.trim() || !number.trim()) {
      toast.error('All fields are required');
      return;
    }

    dispatch(addContact({ name, number }))
      .unwrap()
      .then(() => {
        toast.success('Contact added ✅');
        resetForm();
      })
      .catch(() => toast.error('Failed to add contact ❌'));
  };

  const handleRefresh = () => {
    dispatch(fetchContacts())
      .unwrap()
      .then(() => toast.success('Contacts refreshed ✅'))
      .catch(() => toast.error('Failed to refresh contacts ❌'));
  };

  return (
    <div className={css.form}>
      <Toaster position="top-center" />
      <h2 className={css.heading}>Your Contacts</h2>

      <div className={css.field}>
        <label htmlFor="name" className={css.label}>Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={css.input}
        />
      </div>

      <div className={css.field}>
        <label htmlFor="number" className={css.label}>Phone Number</label>
        <input
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className={css.input}
        />
      </div>

      <div className={css.buttons}>
        <ActionButton label="Add Contact" variant="add" onClick={handleAdd} />
        <ActionButton label="Refresh Contacts" variant="refresh" onClick={handleRefresh} />
      </div>
    </div>
  );
}
