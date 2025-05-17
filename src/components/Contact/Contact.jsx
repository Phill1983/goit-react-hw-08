import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import css from './Contact.module.css';

export default function Contact({ id, name, number, onDelete }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);

  const handleOpenModal = () => setShowModal(true);
  const handleCancelDelete = () => setShowModal(false);
  const handleConfirmDelete = () => {
    onDelete(id);
    setShowModal(false);
  };

  const handleEdit = () => setEditMode(true);

  const handleSave = () => {
    dispatch(updateContact({ id, updatedData: { name: editedName, number: editedNumber } }));
    setEditMode(false);
  };

  return (
    <li className={css.contactItem}>
      <div className={css.contactInfo}>
        {editMode ? (
          <>
            <input
              className={css.input}
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              className={css.input}
              value={editedNumber}
              onChange={(e) => setEditedNumber(e.target.value)}
            />
          </>
        ) : (
          <>
            <p className={css.contactName}>👤 {name}</p>
            <p className={css.contactNumber}>📞 {number}</p>
          </>
        )}
      </div>

      <div className={css.buttons}>
        {editMode ? (
          <button className={css.saveButton} onClick={handleSave}>Save</button>
        ) : (
          <button className={css.editButton} onClick={handleEdit}>Edit</button>
        )}

        <button className={css.deleteButton} onClick={handleOpenModal}>
          Delete
        </button>
      </div>

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this contact?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </li>
  );
}
