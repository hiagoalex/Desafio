import { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export default function TasksPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas do localStorage", error);
      setTasks([]);
    }
  }, []);

  const onLogout = () => {
    navigate ('/')
  };

  const addTask = (text, priority, date) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
      date,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const filtered = tasks
    .filter((task) => {
      if (filterStatus === 'completed') return task.completed;
      if (filterStatus === 'notCompleted') return !task.completed;
      return true;
    })
    .filter((task) => {
      if (filterPriority === 'all') return true;
      return task.priority === filterPriority;
    })
    .filter((task) => {
      if (!filterDate) return true;
      return task.date === filterDate;
    });

  return (
    <div className="container py-4">
      <Header onLogout={onLogout} />
      <TaskForm onAdd={addTask} />

      <div className="d-flex flex-wrap gap-3 my-3">
         <select className="form-select w-auto" onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">Todas</option>
          <option value="completed">Concluídas</option>
          <option value="notCompleted">Não Concluídas</option>
        </select>

        <select className="form-select w-auto" onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">Todas Prioridades</option>
          <option>Urgente⚡</option>
          <option>Alta🔴</option>
          <option>Média🟡</option>
          <option>Baixa🟢</option>
        </select>
        <input
          type="date"
          className="form-control w-auto"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          />
        
      </div>
      <TaskList tasks={filtered} onToggle={toggleTask} onEdit={editTask} onRemove={removeTask} />

    </div>
  );
}
