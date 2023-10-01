import { Contact } from "../../types/types";

import css from "./ContactList.module.css";

type Props = {
	contacts: Contact[];
	filter: string;
	onDeleteClick(id: string): void;
};

const ContactList = ({ contacts, filter, onDeleteClick }: Props) => {
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

export default ContactList;
