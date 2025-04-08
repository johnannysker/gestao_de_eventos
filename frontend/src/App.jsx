import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth.jsx';
import Home from './pages/Home.jsx';
import Organizers from './pages/Organizers.jsx';
import Participants from './pages/Participants.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/home" /> : <Auth setToken={setToken} />} />
      <Route path="/home" element={token ? <Home token={token} logout={handleLogout} /> : <Navigate to="/" />} />
      <Route path="/organizers" element={token ? <Organizers token={token} /> : <Navigate to="/" />} />
      <Route path="/participants" element={token ? <Participants token={token} /> : <Navigate to="/" />} />
      <Route path="/create-event" element={token ? <CreateEvent token={token} /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
