import { Component, FormEvent } from "react";

import { Notify } from "notiflix";

import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";

import { Contact } from "../../types/types";

import css from "./App.module.css";

const LOCAL_KEY = "contacts";

type State = {
	contacts: Contact[];
	filter: string;
};

export class App extends Component {
	state: State = {
		contacts: [],
		filter: "",
	};

	local = localStorage.getItem(LOCAL_KEY);

	onInputChange = (e: FormEvent<HTMLInputElement>): void => {
		const { name, value } = e.currentTarget;
		this.setState({ [name]: value });
	};

	onDeleteClick = (id: string): void => {
		Notify.info("Contact has deleted!");
		return this.setState(prevState => {
			return {
				contacts: (prevState as State).contacts.filter(contact => contact.id !== id),
			};
		});
	};

	componentDidMount = () => {
		if (this.local) {
			const localContacts = JSON.parse(this.local);
			this.setState({
				contacts: localContacts,
			});
		}
	};

	componentDidUpdate = (_: never, prevState: State) => {
		if (prevState.contacts.length !== this.state.contacts.length) {
			localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
		}
	};

	onContactSave = (contactData: Contact): void => {
		const hasSameContactName = this.state.contacts.some(contact => contact.name === contactData.name);

		if (!hasSameContactName) {
			Notify.success("Contact has added!");
			return this.setState(prevState => {
				return {
					contacts: [...(prevState as State).contacts, contactData],
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
					<ContactList contacts={state.contacts} filter={state.filter} onDeleteClick={onDeleteClick} />
				) : (
					<p className={css.message}>You have no contacts yet!</p>
				)}
			</>
		);
	}
}
