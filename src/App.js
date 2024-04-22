import React, { useState, useEffect } from 'react';
import AddContactForm from '../src/Components/AddContactForm/index';
import ContactList from '../src/Components/ContactList/index';

function App() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setContacts(data));
    }, []);

    return (
        <div className="App">
            <AddContactForm contacts={contacts} setContacts={setContacts} />
            <ContactList contacts={contacts} setContacts={setContacts} />
        </div>
    );
}

export default App;
