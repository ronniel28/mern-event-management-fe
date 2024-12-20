import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = (data) => {
        console.log('Logged in:', data);
        // Handle login logic here
    };

    const handleRegister = (data) => {
        console.log('Registered:', data);
        // Handle registration logic here
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            {isLogin ? (
                <Login onLogin={handleLogin} />
            ) : (
                <Register onRegister={handleRegister} />
            )}
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-4 text-blue-500 hover:underline"
            >
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default Auth;