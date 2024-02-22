import css from './Contact.module.css';

export const Contact = ({ name, number, deleteContact, id }) => {
  return (
    <li>
      {name}: {number}
      <button
        onClick={() => deleteContact(id)}
        type="button"
        className={css.deleteBtn}
      >
        Delete
      </button>
    </li>
  );
};
