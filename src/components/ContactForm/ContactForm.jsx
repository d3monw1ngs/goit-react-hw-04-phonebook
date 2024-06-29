import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ addContact, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

const resetForm = () => {
    setName('');
    setNumber('');
  };
    
const handleChange = e => {
  const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };
      
const handleSubmit = e => {
  e.preventDefault();
        
  if (name.trim() === '' || number.trim() === '') {
    return;
  }
        
  // if it is an existing contact, alert
const existingContact = contacts.find(
  contact => contact.name.toLowerCase() === name.toLowerCase()
);

if (existingContact) {
  alert(`${name} is already in contacts!`);
    return;
}

// Add Contacts
addContact({
  id: nanoid(),
  name: name.trim(),
  number: number.trim(),
});
        
// Reset Form fields upon submission
  resetForm();
};
      
return (
  <form className={css.form} onSubmit={handleSubmit}>
    <label className={css.label}>
      <p className={css.labelText}>Name</p>
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          value={name}
          onChange={handleChange}
        />
    </label>

    <label className={css.label}>
      <p className={css.labelText}>Number</p>
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={css.button} type="submit">Add Contact</button>
    </form>    
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};