import { useState, useEffect } from 'react';
import { getOrganizers } from '../api.jsx';
import OrganizerCard from '../components/OrganizerCard.jsx';
import { useNavigate } from 'react-router-dom';

function Organizers({ token }) {
  const [organizers, setOrganizers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await getOrganizers(token);
        setOrganizers(response.data);
      } catch (error) {
        alert('Erro ao carregar organizadores');
      }
    };
    fetchOrganizers();
  }, [token]);

  return (
    <div className="container">
      <h1>Lista de Organizadores</h1>
      <button onClick={() => navigate('/home')}>Voltar</button>
      <div className="card-list">
        {organizers.map((org) => <OrganizerCard key={org._id} organizer={org} token={token} />)}
      </div>
    </div>
  );
}

export default Organizers;