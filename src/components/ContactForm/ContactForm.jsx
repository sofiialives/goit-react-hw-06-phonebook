import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setNumber } from 'redux/formSlice';

export function ContactForm({ addContact }) {
  const name = useSelector(state => state.form.name);
  const number = useSelector(state => state.form.number);
  const dispatch = useDispatch();

  const id = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        dispatch(setName(value));
        break;

      case 'number':
        dispatch(setNumber(value));
        break;

      default:
        break;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addContact({ name, number });
    dispatch(setName(''));
    dispatch(setNumber(''));
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor={id}>Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+$"
        minLength="3"
        maxLength="16"
        id={id}
        value={name}
        onChange={handleChange}
        className={css.inputName}
        required
      />
      <label htmlFor={id}>Number</label>
      <input
        type="tel"
        name="number"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
        title="xxx-xx-xx"
        id={id}
        value={number}
        onChange={handleChange}
        className={css.inputName}
        required
      />
      <button type="submit" className={css.buttonContacts}>
        Add Contact
      </button>
    </form>
  );
}
