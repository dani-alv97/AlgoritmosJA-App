import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
import '../css/Login.css';

const API_URL = "http://localhost:3000/login"; // Reemplaza con tu URL de login

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redirigir a otras páginas

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const { id } = await response.json();
        // Guarda el ID del usuario en localStorage o en un estado global aquí si es necesario
        localStorage.setItem('userId', id);
        navigate('/actividades'); // Redirige a la página de actividades
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="image-container"> 
            <img
                src="/images/logo.jpg"
                alt="Logo"
                style={{
                    top: '10px',
                    left: '5px',
                    height: '20%',
                    width: '50%', // Asegúrate de que el ancho y el alto sean iguales
                    borderRadius: '100%' // Esto hace que la imagen sea redonda
                }}
            />
        </div>  
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;