import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactList';
import { useSelector } from 'react-redux';

export function App() {
  const contacts = useSelector(state => state.contacts.contacts);

  useEffect(() => {
    const strContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', strContacts);
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter/>
      <ContactsList />
    </div>
  );
}
