export const getAllContacts = store => store.contacts;

export const getFilter = store => store.filter;

export const getFilteredContacts = store => {
  const { contacts, filter } = store;
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
