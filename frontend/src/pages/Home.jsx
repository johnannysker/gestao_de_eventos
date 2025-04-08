import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrganizer, createParticipant, getEvents } from '../api.jsx';
import EventCard from '../components/EventCard.jsx';

function Home({ token, logout }) {
  const [type, setType] = useState('organizer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents(token);
        setEvents(response.data);
      } catch (error) {
        setMessage('Erro ao carregar eventos');
      }
    };
    fetchEvents();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { name, email, password };
      if (type === 'organizer') {
        await createOrganizer(data, token);
        setMessage('Organizador criado!');
      } else {
        await createParticipant(data, token);
        setMessage('Participante criado!');
      }
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erro ao criar');
    }
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
      <h3 className='title-form'>Cadastre Organizadores e Participantes</h3>
      <form onSubmit={handleSubmit} className="create-form">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="organizer">Organizador</option>
          <option value="participant">Participante</option>
        </select>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        {type === 'organizer' && (
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
        )}
        <button type="submit">Criar</button>
      </form>
      <p className={message.includes('Erro') ? 'error' : 'success'}>{message}</p>
      <div className="home-buttons">
        <button onClick={() => navigate('/organizers')}>Lista de Organizadores</button>
        <button onClick={() => navigate('/participants')}>Lista de Participantes</button>
        <button onClick={() => navigate('/create-event')}>Criar Evento</button>
      </div><br></br><br></br>
      <h2>Eventos</h2>
      <div className="card-list">
        {events.map((event) => <EventCard key={event._id} event={event} token={token} />)}
      </div>
    </div>
  );
}

export default Home;