import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import LoginPage from "./src/components/Login";
import TasksPage from "./src/pages/tasks";

export function Wizard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
                <Route path="/tasks" element={<TasksPage />} />
            </Routes>
        </BrowserRouter>
    );
  }
