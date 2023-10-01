import { FormEvent } from "react";

import css from "./Filter.module.css";

type Props = {
	onInputChange(e: FormEvent<HTMLInputElement>): void;
	filter: string;
};

function Filter({ onInputChange, filter }: Props) {
	return (
		<div>
			<h2 className={css.subtitle}>Find contact by name</h2>
			<label className={css.label}>
				<input
					value={filter}
					onChange={onInputChange}
					className={css.input}
					type="text"
					name="filter"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
				/>
			</label>
		</div>
	);
}

export default Filter;
