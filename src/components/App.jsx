import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addContact, deleteContact } from '../redux/contacts/contact-slice';
import { setFilter } from '../redux/filter/filter-slice';
import { getFilteredContacts } from '../redux/selectors';

export const App = () => {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      const normalizedCurrentNumber = item.number.toLowerCase();
      return (
        normalizedCurrentName === normalizedName ||
        normalizedCurrentNumber === normalizedNumber
      );
    });
    return Boolean(dublicate);
  };

  const onAddContact = data => {
    if (isDublicate(data)) {
      return Notify.failure(`${data.name} is already in contacts.`);
    }

    const action = addContact(data);
    dispatch(action);
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const changeFilter = ({ target }) => dispatch(setFilter(target.value));

  return (
    <>
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={onAddContact} />
        <h2>Contacts</h2>
        <Filter changeFilter={changeFilter} />
        <ContactList items={contacts} deleteContact={onDeleteContact} />
      </div>
    </>
  );
};
