import React, { useState, useEffect } from 'react';
import {ContactForm} from './ContactForm/ContactForm';
import {ContactList} from './ContactList/ContactList';


const initialContacts = [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ];

export const App = () => {
  const [contacts, setContacts] = useState([]);

  // Load contacts from local storage when the component mounts
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    console.log('Loaded contacts:', savedContacts);
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      console.log('Setting inital contacts:', initialContacts);
      setContacts(initialContacts);
    }
  }, []);

  // Save contacts to local storage whenever the contacts state changes
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]); 

const addContact = newContact => {
  setContacts(prevContacts => [...prevContacts, newContact]);
  };

const deleteContact = contactId => {
  setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

console.log('render equivalent');
return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />
      
      <h2>Contacts</h2>
        <ContactList 
        contacts={contacts} 
        onDeleteContact={deleteContact} 
        />
    </>
    );
  };
