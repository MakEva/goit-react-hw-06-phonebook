import css from './contact-list.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contact-slice';

const ContactList = ({ items }) => {
  const dispatch = useDispatch();

  if (!items) {
    return null;
  }
  const elements = items.map(({ id, name, number }) => (
    <li key={id} className={css.list}>
      {name}: {number}
      <button
        className={css.deleteBtn}
        onClick={() => dispatch(deleteContact(id))}
        type="button"
      >
        {' '}
        Delete
      </button>
    </li>
  ));
  return <ul className={css.ullist}>{elements}</ul>;
};

export default ContactList;
