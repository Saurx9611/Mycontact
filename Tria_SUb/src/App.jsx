import React, { useState, useEffect } from 'react'; // 1. Import useEffect
import Card from './Card.jsx';
import './App.css';
import initialContactsData from './initialcontact.json'; // We use this as a fallback

// This is the initial state for your "add" form
const initialFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  isFavorite: false
};

function App() {
  // 2. Use a function for lazy initialization of state
  // This reads from localStorage only on the first load
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      return JSON.parse(savedContacts);
    } else {
      return initialContactsData;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [newContact, setNewContact] = useState(initialFormState);

  // 3. Add a useEffect hook to save to localStorage
  // This runs every time the 'contacts' state changes
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // --- Function to toggle favorite status ---
  function toggleFavorite(id) {
    setContacts(prevContacts => {
      return prevContacts.map(contact => {
        return contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact;
      });
    });
  }

  // 4. Add the deleteContact function
  function deleteContact(id) {
    // We use filter to create a new array *without* the contact
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  }

  // --- Feature 3: Add New Contact ---
  function handleFormChange(e) {
    const { name, value } = e.target;
    setNewContact(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleAddContact(e) {
    e.preventDefault();
    if (!newContact.firstName || !newContact.email) {
      alert('First name and email are required.');
      return;
    }
    
    const contactToAdd = {
      id: Date.now(),
      ...newContact
    };
    
    setContacts(prevContacts => [contactToAdd, ...prevContacts]);
    setNewContact(initialFormState);
  }

  // --- Feature 2: Search Contact ---
  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // --- Feature 1: View Contact List ---
  const contactElements = filteredContacts.map(contact => (
    <Card
      key={contact.id}
      contact={contact}
      onToggleFavorite={() => toggleFavorite(contact.id)}
      // 5. Pass the delete function as a prop
      onDelete={() => deleteContact(contact.id)}
    />
  ));

  return (
    <div className="app-container">
      <h1>My Contact List</h1>

      {/* Add Contact Form */}
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

      <hr />

      {/* Search Bar */}
      <div className="search-container">
        <h2>Search Contacts</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <div className="contact-list">
        {contactElements.length > 0 ? contactElements : <p>No contacts found.</p>}
      </div>
    </div>
  );
}

export default App;