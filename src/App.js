import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Productos from './pages/Productos';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import ViewProduct from './components/ViewProduct';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="/productos" element={
                    <PrivateRoute>
                        <Productos />
                    </PrivateRoute>
                } />
                <Route path="/productos/create" element={
                    <PrivateRoute>
                        <CreateProduct />
                    </PrivateRoute>
                } />
                <Route path="/productos/edit/:id" element={
                    <PrivateRoute>
                        <EditProduct />
                    </PrivateRoute>
                } />
                <Route path="/productos/view/:id" element={
                    <PrivateRoute>
                        <ViewProduct />
                    </PrivateRoute>
                } />
                <Route path="/usuarios" element={
                    <PrivateRoute>
                        <Usuarios />
                    </PrivateRoute>
                } />
                <Route path="/usuarios/create" element={
                    <PrivateRoute>
                        <CreateUser />
                    </PrivateRoute>
                } />
                <Route path="/usuarios/edit/:id" element={
                    <PrivateRoute>
                        <EditUser />
                    </PrivateRoute>
                } />
                <Route path="/usuarios/view/:id" element={
                    <PrivateRoute>
                        <ViewUser />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
