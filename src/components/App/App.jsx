import { Component } from 'react';

import { Notify } from 'notiflix';

import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';

const LOCAL_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onDeleteClick = id => {
    Notify.info('Contact has deleted!');
    return this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  componentDidMount = () => {
    const localContacts = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (localContacts) {
      this.setState({
        contacts: localContacts,
      });
    }
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
    }
  };

  onContactSave = contactData => {
    const hasSameContactName = this.state.contacts.some(
      contact => contact.name === contactData.name
    );

    if (!hasSameContactName) {
      Notify.success('Contact has added!');
      return this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, contactData],
        };
      });
    }

    return Notify.failure(`${contactData.name} is already in contacts!`);
  };

  render() {
    const { state, onInputChange, onContactSave, onDeleteClick } = this;
    return (
      <>
        <h1 className={css.title}>Phone Book</h1>

        <ContactForm onSubmit={onContactSave}></ContactForm>
        <h2 className={css.subtitle}>Contacts</h2>

        <Filter onInputChange={onInputChange} filter={state.filter} />
        {state.contacts.length ? (
          <ContactList
            contacts={state.contacts}
            filter={state.filter}
            onDeleteClick={onDeleteClick}
          />
        ) : (
          <p className={css.message}>You have no contacts yet!</p>
        )}
      </>
    );
  }
}
