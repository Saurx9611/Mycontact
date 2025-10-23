import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import './App.css';
import initialContactsData from './initialcontact.json'; // We use this as a fallback

// This is the initial state for "add" form
const initialFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  isFavorite: false
};

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : initialContactsData;
  });
  // Initial variables declare
  const [searchTerm, setSearchTerm] = useState('');
  const [newContact, setNewContact] = useState(initialFormState);
  const [viewMode, setViewMode] = useState('initial');

  // Save to localStorage whenever contacts change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  //  Core Functions
  function toggleFavorite(id) {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact
      )
    );
  }

  function deleteContact(id) {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setNewContact(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleAddContact(e) {
    e.preventDefault();
    if (!newContact.firstName || !newContact.email || !newContact.phone) {
      alert('Please fill out all fields (Name, Email, and Phone).');
      return;
    }
    
    const contactToAdd = { id: Date.now(), ...newContact };
    setContacts(prevContacts => [contactToAdd, ...prevContacts]);
    setNewContact(initialFormState);
    
    // Switch view to 'show' after adding
    setViewMode('show');
  }

  // View Toggle Click Handlers
  
  /**
   * Toggles the 'show' view.
   * If view is already 'show', sets to 'initial'.
   * Otherwise, sets to 'show'.
   */
  function handleShowClick() {
    setViewMode(prevMode => (prevMode === 'show' ? 'initial' : 'show'));
  }

  /**
   * Toggles the 'add' view.
   * If view is already 'add', sets to 'initial'.
   * Otherwise, sets to 'add'.
   */
  function handleAddClick() {
    setViewMode(prevMode => (prevMode === 'add' ? 'initial' : 'add'));
  }

  //Filtering Logic

  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const contactElements = filteredContacts.map(contact => (
    <Card
      key={contact.id}
      contact={contact}
      onToggleFavorite={() => toggleFavorite(contact.id)}
      onDelete={() => deleteContact(contact.id)}
    />
  ));

  //Main JSX
  return (
    <div className="app-container">
      <h1>My Contact List</h1>

      {/*View Toggle Buttons*/}
      <div className="view-toggle-buttons">
        <button
          className={viewMode === 'show' ? 'active' : ''}
          //handler function
          onClick={handleShowClick}
        >
          Show Contacts
        </button>
        <button
          className={viewMode === 'add' ? 'active' : ''}
          // handler function
          onClick={handleAddClick}
        >
          Add Contact
        </button>
      </div>

      {/*CONDITIONAL RENDERING (No change needed here)*/}
      
      {viewMode === 'add' && (
        /*ADD CONTACT VIEW*/
        <div className="add-contact-view">
          <div className="form-container">
            <h2>Add New Contact</h2>
            <form onSubmit={handleAddContact}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newContact.firstName}
                onChange={handleFormChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newContact.lastName}
                onChange={handleFormChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={newContact.phone}
                onChange={handleFormChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newContact.email}
                onChange={handleFormChange}
              />
              <button type="submit">Add Contact</button>
            </form>
          </div>
        </div>
      )}

      {viewMode === 'show' && (
        /*SHOW CONTACTS VIEW*/
        <div className="show-contacts-view">
          <hr />
          <div className="search-container">
            <h2>Search Contacts</h2>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="contact-list">
            {contactElements.length > 0 ? contactElements : <p>No contacts found.</p>}
          </div>
        </div>
      )}

      {viewMode === 'initial' && (
        /*NEW INITIAL VIEW */
        <div className="initial-view">
          <h2>Welcome!</h2>
          <p>Select "Show Contacts" to view your list or "Add Contact" to add a new one.</p>
        </div>
      )}

    </div>
  );
}

export default App;
