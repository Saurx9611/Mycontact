# Mycontact
# 📞 React Contact List App

This is a responsive single-page web application built with React and Vite. It allows you to manage a personal contact list with features like adding, searching, deleting, and favoriting contacts. All data is persistently stored in your browser's `localStorage`.

## 📸 Demo

*(Your demo images will appear here, this formatting is correct)*

![A demo of the Contact List App showing light and dark mode, adding a contact, and searching.](<img width="1918" height="859" alt="Screenshot 2025-10-23 194020" src="https://github.com/user-attachments/assets/820c7290-7af3-4b31-a087-37e2da7b6fad" />
)
<img width="1919" height="876" alt="Screenshot 2025-10-23 194011" src="https://github.com/user-attachments/assets/940d6660-9ce9-404c-9f39-061562f3dc2f" />
<img width="1918" height="870" alt="Screenshot 2025-10-23 194026" src="https://github.com/user-attachments/assets/6b5e0cd2-9519-4325-8563-752387670cfe" />
<img width="1915" height="858" alt="Screenshot 2025-10-23 194307" src="https://github.com/user-attachments/assets/2a7673a8-9737-46c6-a5a7-96d77a8b7dce" />
<img width="1916" height="858" alt="Screenshot 2025-10-23 194301" src="https://github.com/user-attachments/assets/6b13c0b8-f32b-4a15-9a7c-441d6b8855df" />
<img width="1913" height="873" alt="Screenshot 2025-10-23 194246" src="https://github.com/user-attachments/assets/340c52f5-dcc8-4df7-b911-0296d71fd4f0" />
<img width="1913" height="866" alt="Screenshot 2025-10-23 194231" src="https://github.com/user-attachments/assets/44ce3221-cd3b-4b31-b9ba-95ab2f723af6" />
<img width="1917" height="877" alt="Screenshot 2025-10-23 194222" src="https://github.com/user-attachments/assets/ab6ed06a-6194-4ad6-b857-651f581c518d" />

## ✨ Features

* **Dynamic Views:** Toggle between "Add Contact" and "Show Contacts." Clicking an active button hides its view, returning to the welcome screen.
* **Persistent Storage:** Your contact list is automatically saved in your browser's `localStorage`. Data persists even after closing the tab.
* **Add Contact:** A simple, mobile-responsive form to add new contacts. Includes validation to ensure First Name, Email, and Phone are filled out.
* **Search/Filter:** Instantly filter contacts by full name (first + last) using a real-time, case-insensitive search bar.
* **Delete Contact:** Remove any contact with a one-click "Delete" button on the card.
* **Favorite Contact:** Mark (and unmark) your most important contacts with a star icon.
* **Dark Mode:** Automatically detects and switches between light and dark themes based on your system preference.

## 💡 Core Functionality Explained

This app is built around a few key React hooks and JavaScript functions to manage the application's state and logic.

### 1. State Management (`useState`)

The app's "memory" is handled by four `useState` hooks:
* `const [contacts, setContacts]`
    * **Purpose:** Manages the main array of contact objects.
    * **Initialization:** It uses a "lazy initializer" `() => ...` to check `localStorage.getItem("contacts")` *once* on the first load. If data exists, it's parsed. Otherwise, the fallback `initialcontact.json` file is used.
* `const [newContact, setNewContact]`
    * **Purpose:** An object that stores the data from the "Add Contact" form fields as the user types.
* `const [viewMode, setViewMode]`
    * **Purpose:** A string (`'initial'`, `'show'`, or `'add'`) that controls which component is visible. This is the core of the app's navigation.
* `const [searchTerm, setSearchTerm]`
    * **Purpose:** A string that holds the current value of the search input.

### 2. View & Navigation Logic

The UI is controlled by the `viewMode` state.
* `handleShowClick` & `handleAddClick`: These functions implement the toggle logic. They check the `prevMode` (the current state). If the user clicks the "Show Contacts" button when `viewMode` is already `'show'`, it sets the mode to `'initial'`. Otherwise, it sets it to `'show'`. This provides a clean "on/off" switch for the views.

### 3. Contact Handling (CRUD)

* **Add (`handleAddContact`):**
    1.  Calls `e.preventDefault()` to stop the page from refreshing.
    2.  Validates that `newContact.firstName`, `newContact.email`, and `newContact.phone` are not empty.
    3.  Creates a new `contactToAdd` object with a unique `id` (using `Date.now()`) and the data from the `newContact` state.
    4.  Updates the `contacts` state by adding the new contact to the *top* of the array.
    5.  Resets the `newContact` form state and sets `viewMode` to `'show'`.
* **Delete (`deleteContact`):**
    * This function receives an `id`. It updates the `contacts` state by calling `setContacts` with the `.filter()` array method. It creates a new array that includes every contact *except* the one where `contact.id === id`.
* **Favorite (`toggleFavorite`):**
    * This function receives an `id`. It updates the `contacts` state using the `.map()` method. It loops through all contacts and returns a *new* object for the matching contact, flipping its `isFavorite` boolean value (`!contact.isFavorite`).

### 4. Data Persistence (`useEffect`)

* A `useEffect` hook is used to watch for changes to the `[contacts]` state.
* Any time the `contacts` array is updated (added, deleted, or favorited), this hook runs and saves the *entire* new array to `localStorage` using `localStorage.setItem("contacts", JSON.stringify(contacts))`. This ensures the data is always in sync.

### 5. Search & Filtering

* This logic isn't in a function; it's a derived variable (`filteredContacts`) that re-calculates on every render.
* It takes the main `contacts` array and chains the `.filter()` method.
* Inside the filter, it creates a `fullName` string (`${contact.firstName} ${contact.lastName}`) and converts both the `fullName` and the `searchTerm` to `.toLowerCase()`.
* This provides a fast, real-time, case-insensitive search that updates as the user types.

## 🛠️ Technologies Used

* **React:** For building the user interface with functional components and hooks (`useState`, `useEffect`).
* **Vite:** As the fast build tool and development server.
* **JavaScript (ES6+):** Core application logic.
* **CSS:** For all custom styling, including:
    * CSS Variables (for theming)
    * CSS Grid (for layouts)
    * Media Queries (for dark mode and responsiveness)
* **Browser `localStorage`:** For client-side data persistence.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (which includes npm) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Saurx9611/Mycontact.git](https://github.com/Saurx9611/Mycontact.git)
    ```

2.  **Navigate to the project directory:**
    * *(Note: This project is in the `Tria_SUb` subfolder)*
    ```bash
    cd Mycontact/Tria_SUb
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open your browser and visit `http://localhost:5173` (or the URL shown in your terminal).

## Deployment

The live version of this project is deployed on Netlify.

**Live URL:** `https://magnificent-toffee-5ccd7a.netlify.app/`
