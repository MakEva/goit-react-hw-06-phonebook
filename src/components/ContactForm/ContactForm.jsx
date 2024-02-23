import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { addContact } from '../../redux/contacts/contact-slice';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAllContacts } from '../../redux/selectors';

const ContactForm = () => {
  const contacts = useSelector(getAllContacts);
  const dispatch = useDispatch();
  const nameId = nanoid();
  const numberId = nanoid();

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizedName;
    });
    return Boolean(dublicate);
  };

  const onAddContact = data => {
    if (isDublicate(data)) {
      return Notify.failure(`${data.name} is already in contacts.`);
    }
    dispatch(addContact(data));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target.elements;
    const newContact = { name: name.value, number: number.value };
    onAddContact(newContact);
    e.target.reset();
  };

  return (
    <form className={css.contact_form} onSubmit={handleSubmit} action="">
      <label htmlFor={nameId} className={css.for_label}>
        Name
      </label>
      <input
        id={nameId}
        className={css.for_input}
        type="text"
        name="name"
        required
      />
      <label htmlFor={numberId} className={css.for_label}>
        Number
      </label>
      <input
        id={numberId}
        className={css.for_input}
        type="tel"
        name="number"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
