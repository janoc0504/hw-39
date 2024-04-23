import React, { useState } from 'react';
import styles from './styles.module.css';

const AddContactForm = ({ contacts, setContacts }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newContact = {
            id: Date.now(),
            name: name,
            surname: surname,
            phone: phone
        };

        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContact),
        })
            .then(response => response.json())
            .then(data => {
                setContacts(prevContacts => [...prevContacts, data]);
                setName('');
                setSurname('');
                setPhone('');
                setShowForm(false);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const showAddForm = () => {
        setShowForm(true);
    };

    return (
        <div className={styles['add-contact-form']}>
            <button onClick={showAddForm} className={styles['add-contact-button']}>Adding contact</button>
            {showForm && (
                <>
                    <h2>Adding contact form</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            Surname:
                            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        </label>
                        <label>
                            Phone:
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default AddContactForm;
