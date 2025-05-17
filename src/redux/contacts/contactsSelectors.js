import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/filtersSelectors';

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (!Array.isArray(contacts)) return [];

    const normalizedFilter = (filter || '').toLowerCase();

    return contacts
      .filter(contact => {
        const nameMatch = contact.name?.toLowerCase().includes(normalizedFilter);
        const numberMatch = contact.number?.toLowerCase().includes(normalizedFilter);
        return nameMatch || numberMatch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
);

