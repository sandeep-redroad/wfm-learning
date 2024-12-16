import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/Context/AuthContext'; // Assuming you created AuthContext

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;