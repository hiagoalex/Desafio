import { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
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
    setIsAuthenticated(false);
  }

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
      completed: false
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
    });

  return (
    <div className="container py-4">
      <Header onLogout={onLogout} />
      <TaskForm onAdd={addTask} />
      <div className="d-flex gap-3 my-3">
        <select className="form-select w-auto" onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">Todas</option>
          <option value="completed">Concluídas</option>
          <option value="notCompleted">Não Concluídas</option>
        </select>
        <select className="form-select w-auto" onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">Todas Prioridades</option>
          <option value="Alta">Urgente⚡</option>
          <option value="Alta">Alta🔴</option>
          <option value="Média">Média🟡</option>
          <option value="Baixa">Baixa🟢</option>
        </select>
      </div>
      <TaskList tasks={filtered} onToggle={toggleTask} onEdit={editTask} onRemove={removeTask} />
    </div>
  );
}