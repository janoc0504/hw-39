import React, { useState, useEffect } from 'react';
import AddContactForm from '../src/Components/AddContactForm/index';
import ContactList from '../src/Components/ContactList/index';

function App() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                const modifiedData = data.map(contact => {
                    const [firstName, ...lastNameArray] = contact.name.split(' ');
                    const lastName = lastNameArray.join(' ');
                    return {
                        ...contact,
                        name: firstName,
                        surname: lastName
                    };
                });
                setContacts(modifiedData);
            });
    }, []);

    return (
        <div className="App">
            <AddContactForm contacts={contacts} setContacts={setContacts} />
            <ContactList contacts={contacts} setContacts={setContacts} />
        </div>
    );
}

export default App;
