import { useState } from 'react';
import { updateParticipant, deleteParticipant } from '../api.jsx';

function ParticipantCard({ participant, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(participant.name);
  const [email, setEmail] = useState(participant.email);

  const handleUpdate = async () => {
    try {
      await updateParticipant(participant._id, { name, email }, token);
      setIsEditing(false);
    } catch (error) {
      alert('Erro ao atualizar participante');
    }
  };

  const handleDelete = async () => {
    if (confirm('Tem certeza?')) {
      try {
        await deleteParticipant(participant._id, token);
        window.location.reload();
      } catch (error) {
        alert('Erro ao deletar participante');
      }
    }
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleUpdate}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3>{participant.name}</h3>
          <p>{participant.email}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button className='delete' onClick={handleDelete}>Deletar</button>
        </>
      )}
    </div>
  );
}

export default ParticipantCard;