import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    name: '',
    number: '',
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };
    
  handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

      handleSubmit = e => {
        e.preventDefault();
        const { name, number } = this.state;
        const { addContact, contacts } = this.props;

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
        this.resetForm();
      };
    
    render() {
      const { name, number } = this.state;
      
      return (
        <form className={css.form} onSubmit={this.handleSubmit}>
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </label>
          <button className={css.button} type="submit">Add Contact</button>
        </form>    
        );
    }
}