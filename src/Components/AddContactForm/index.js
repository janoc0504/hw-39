import React from 'react';

const AddContactForm = ({ contacts, setContacts }) => {
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [phone, setPhone] = React.useState('');

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
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCancel = () => {
        setName('');
        setSurname('');
        setPhone('');
    };

    return (
        <div>
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
        </div>
    );
};

export default AddContactForm;
