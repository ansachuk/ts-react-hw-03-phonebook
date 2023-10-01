import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, filter, onDeleteClick }) => {
  return (
    <ul className={css.list}>
      {contacts
        .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
        .map(({ name, number, id }) => (
          <li key={name} className={css.listItem}>
            {name} :<span className={css.number}>{number}</span>
            <button
              className={css.deleteButton}
              onClick={() => {
                onDeleteClick(id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ContactList;
