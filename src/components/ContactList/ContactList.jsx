import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDeleteContactMutation, useFetchContactsQuery } from 'redux/contacts/contactsSlice';
import { getFilter } from 'redux/selectors';
import { Button, ListItem } from './ContactList.styled';

const ContactList = () => {
  const { data, error, isLoading } = useFetchContactsQuery();
  const [deleteContact, result] = useDeleteContactMutation();
      
  const contacts = data;
  const filter = useSelector(getFilter);

  const normalizedFilter = filter.toLowerCase();

  const filteredContacts = () => {   
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = filteredContacts();

  return (
    <>
    {error && (<p>
      Something went wrong!
    </p>)}
    {isLoading ? (
      <p>Contacts are loading...</p>
    ) : (
      <ul>
      {visibleContacts.map(({ id, name, phone }) => {
        return (
          <ListItem key={id}>
            {name}: {phone}
            <Button onClick={
              () =>  deleteContact(id)
              } disabled={result.isLoading}>Delete</Button>
          </ListItem>
        );
      })}
    </ul>
    )}
    </>
    
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
