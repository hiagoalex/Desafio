import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Média🟡');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && date) {
      onAdd(text, priority, date);
      setText('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-wrap gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Nova tarefa"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="date"
        className="form-control-sm w-auto"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        className="form-select w-auto"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Urgente⚡</option>
        <option>Alta🔴</option>
        <option>Média🟡</option>
        <option>Baixa🟢</option>
      </select>
      <button className="btn btn-success">Adicionar</button>
    </form>
  );
}

export default TaskForm;
