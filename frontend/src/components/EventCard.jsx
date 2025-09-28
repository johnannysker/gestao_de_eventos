import { useState, useEffect } from 'react';
import { updateEvent, deleteEvent, addParticipantToEvent, getParticipants } from '../api.jsx';

function EventCard({ event, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [participantId, setParticipantId] = useState('');
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await getParticipants(token);
        setParticipants(response.data);
        if (response.data.length > 0) {
          setParticipantId(response.data[0]._id);
        }
      } catch (error) {
        console.error('Erro ao carregar participantes:', error);
      }
    };
    fetchParticipants();
  }, [token]);

  const handleUpdate = async () => {
    try {
      await updateEvent(event._id, { title, description }, token);
      setIsEditing(false);
    } catch (error) {
      alert('Erro ao atualizar evento');
    }
  };

  const handleDelete = async () => {
    if (confirm('Tem certeza?')) {
      try {
        await deleteEvent(event._id, token);
        window.location.reload();
      } catch (error) {
        alert('Erro ao deletar evento');
      }
    }
  };

  const handleAddParticipant = async () => {
    try {
      await addParticipantToEvent(event._id, participantId, token);
      setParticipantId(participants[0]?._id || '');
      window.location.reload();
    } catch (error) {
      alert('Erro ao adicionar participante');
    }
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={handleUpdate}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <select
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
          >
            <option value="">Selecione um participante</option>
            {participants.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.email})
              </option>
            ))}
          </select>
          <button onClick={handleAddParticipant}>Adicionar Participante</button>
          <h4>Participantes:</h4>
          <ul>
            {event.participants?.length > 0 ? (
              event.participants.map((p) => <li key={p._id}>{p.name}</li>)
            ) : (
              <li>Nenhum</li>
            )}
          </ul>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button className='delete' onClick={handleDelete}>Deletar</button>
        </>
      )}
    </div>
  );
}

export default EventCard;