import { useState, useEffect } from 'react';
import { getParticipants } from '../api.jsx';
import ParticipantCard from '../components/ParticipantCard.jsx';
import { useNavigate } from 'react-router-dom';

function Participants({ token }) {
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await getParticipants(token);
        setParticipants(response.data);
      } catch (error) {
        alert('Erro ao carregar participantes');
      }
    };
    fetchParticipants();
  }, [token]);

  return (
    <div className="container">
      <h1>Lista de Participantes</h1>
      <button onClick={() => navigate('/home')}>Voltar</button>
      <div className="card-list">
        {participants.map((part) => <ParticipantCard key={part._id} participant={part} token={token} />)}
      </div>
    </div>
  );
}

export default Participants;