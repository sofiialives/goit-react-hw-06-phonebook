import React, { useEffect, useState, useMemo } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactList';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter } from 'redux/contactsSlice';

export function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const strContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', strContacts);
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    dispatch(addContact(newContact));
  };

  const handleChange = e => {
    const { value } = e.target;
    dispatch(setFilter(value));
  };

  const deleteContacts = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = useMemo(() => {
    if (filter === '') return contacts;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContacts} />
      <h2>Contacts</h2>
      <Filter handleChange={handleChange} filter={filter} />
      <ContactsList
        filterEdit={filteredContacts}
        deleteContact={deleteContacts}
      />
    </div>
  );
}