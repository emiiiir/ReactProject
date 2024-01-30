
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList/UserList';




function App() {
  // Dummy user data for illustration
  const dummyUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

  return (
    <div className="App">
      <h1>React User List App</h1>
      {/* Pass dummy user data as props */}
      <UserList></UserList>
      
      {/* <UserDetails/> */}
      
    </div>
  );
}

export default App;
