import { Contact } from '../Contact/Contact';

export const ContactList = ({ items, deleteContact }) => {
  const ContactItems = items.map(({ id, name, number }) => (
    <Contact
      key={id}
      id={id}
      name={name}
      number={number}
      deleteContact={deleteContact}
    />
  ));
  return <ul>{ContactItems}</ul>;
};
