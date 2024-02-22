import css from './Filter.module.css';

export const Filter = ({ changeFilter }) => {
  return (
    <label htmlFor="filter" className={css.filter}>
      Find contacts by name
      <input
        onChange={changeFilter}
        name="filter"
        className={css.filter_input}
      ></input>
    </label>
  );
};
