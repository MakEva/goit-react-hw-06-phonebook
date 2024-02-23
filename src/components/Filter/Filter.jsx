import css from './Filter.module.css';
import ContactList from '../ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { getAllContacts } from '../../redux/selectors';
import { getFilter } from '../../redux/selectors';
import { setFilter } from '../../redux/filter/filter-slice';

const Filter = () => {
  const contacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const getFilteredContact = () => {
    if (!filter) {
      return contacts;
    }
    const normalisedFilter = filter.toLocaleLowerCase();
    const filteredContact = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedNumber = number.toLocaleLowerCase();
      return (
        normalizedName.includes(normalisedFilter) ||
        normalizedNumber.includes(normalisedFilter)
      );
    });
    return filteredContact;
  };

  const changeFilter = ({ target }) => dispatch(setFilter(target.value));

  const items = getFilteredContact();
  return (
    <>
      <input
        className={css.filter_input}
        onChange={changeFilter}
        name="filter"
      />
      <ContactList items={items} />
    </>
  );
};

export default Filter;
