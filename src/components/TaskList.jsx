import { useState } from 'react';

function TaskList({ tasks, onToggle, onEdit, onRemove }) {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const finishEdit = () => {
    if (editedText.trim()) {
      onEdit(editingId, editedText);
      setEditingId(null);
      setEditedText('');
    }
  };

  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-light text-muted' : ''}`}>
          <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
            <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
            {editingId === task.id ? (
              <input
                className="form-control"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={finishEdit}
                onKeyDown={(e) => e.key === 'Enter' && finishEdit()}
                autoFocus
              />
            ) : (
              <div style={{ cursor: 'pointer' }} onDoubleClick={() => startEdit(task.id, task.text)}>
                <strong>{task.text}</strong>
                <div>
                  <small className="text-secondary">Prioridade: {task.priority}</small><br />
                  {task.date && (
                    <small className="text-muted">Prazo: {new Date(task.date).toLocaleDateString()}</small>
                  )}
                </div>
              </div>
            )}
          </div>
          {!task.completed && (
            <button className="btn btn-danger btn-sm" onClick={() => onRemove(task.id)}>Remover</button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
