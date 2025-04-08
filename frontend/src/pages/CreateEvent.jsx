import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent, getOrganizers } from '../api.jsx';

function CreateEvent({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [organizerId, setOrganizerId] = useState('');
  const [organizers, setOrganizers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await getOrganizers(token);
        setOrganizers(response.data);
        if (response.data.length > 0) {
          setOrganizerId(response.data[0]._id); // Define o primeiro organizador como padrão
        }
      } catch (error) {
        setMessage('Erro ao carregar organizadores');
      }
    };
    fetchOrganizers();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({ title, description, organizerId }, token);
      setMessage('Evento criado com sucesso!');
      setTimeout(() => navigate('/home'), 1000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erro ao criar evento');
    }
  };

  return (
    <div className="container">
      <h1>Criar Evento</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <select
          value={organizerId}
          onChange={(e) => setOrganizerId(e.target.value)}
          required
        >
          <option value="">Selecione um organizador</option>
          {organizers.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name} ({org.email})
            </option>
          ))}
        </select>
        <button type="submit">Criar</button>
        <button type="button" onClick={() => navigate('/home')}>Cancelar</button>
      </form>
      <p className={message.includes('Erro') ? 'error' : 'success'}>{message}</p>
    </div>
  );
}

export default CreateEvent;