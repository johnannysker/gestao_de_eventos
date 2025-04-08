import { useState } from 'react';
import { updateOrganizer, deleteOrganizer } from '../api.jsx';

function OrganizerCard({ organizer, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(organizer.name);
  const [email, setEmail] = useState(organizer.email);

  const handleUpdate = async () => {
    try {
      await updateOrganizer(organizer._id, { name, email }, token);
      setIsEditing(false);
    } catch (error) {
      alert('Erro ao atualizar organizador');
    }
  };

  const handleDelete = async () => {
    if (confirm('Tem certeza?')) {
      try {
        await deleteOrganizer(organizer._id, token);
        window.location.reload();
      } catch (error) {
        alert('Erro ao deletar organizador');
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
          <h3>{organizer.name}</h3>
          <p>{organizer.email}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button className='delete' onClick={handleDelete}>Deletar</button>
        </>
      )}
    </div>
  );
}

export default OrganizerCard;