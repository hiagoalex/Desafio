import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import Login from "./src/components/Login";
import TasksPage from "./src/pages/tasks";

export function Wizard() {
    const [isAuthenticated, setIsAthenticated] = useState(false)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login onLogin={() => setIsAthenticated(true)}/>} />
                <Route path="/tasks" element={<TasksPage />} />
            </Routes>
        </BrowserRouter>
    );
  }