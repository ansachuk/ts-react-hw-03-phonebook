import { Component, FormEvent } from "react";
import { nanoid } from "nanoid";

import { Contact } from "../../types/types";

import css from "./ContactForm.module.css";

type Props = {
	onSubmit(contactData: Contact): void;
};

const INITIAL_STATE = {
	contactName: "",
	number: "",
};

export default class ContactForm extends Component<Props> {
	state = { ...INITIAL_STATE };

	onInputChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		this.setState({ [name]: value });
	};

	onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const {
			props: { onSubmit },
		} = this;
		const form = e.currentTarget;

		this.setState({ ...INITIAL_STATE });

		return onSubmit({
			name: form.contactName.value.trim(),
			number: form.number.value,
			id: nanoid(),
		});
	};

	render() {
		const {
			onFormSubmit,
			onInputChange,
			state: { contactName, number },
		} = this;

		return (
			<form className={css.form} onSubmit={onFormSubmit}>
				<label className={css.label}>
					Name
					<input
						value={contactName}
						onChange={onInputChange}
						className={css.name}
						type="text"
						name="contactName"
						pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						autoComplete="off"
						required
					/>
				</label>
				<label className={css.label}>
					Telephone
					<input
						value={number}
						onChange={onInputChange}
						className={css.number}
						type="tel"
						name="number"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						autoComplete="off"
						required
					/>
				</label>
				<button className={css.submitButton} type="submit">
					Add contact
				</button>
			</form>
		);
	}
}
