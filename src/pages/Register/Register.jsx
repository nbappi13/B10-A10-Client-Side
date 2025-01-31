import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, loginWithGoogle, loginWithGitHub } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must contain uppercase, lowercase letters, and be at least 6 characters long.',
      });
      return;
    }
    try {
      await register(email, password, name, photoURL);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong during registration. Please try again.',
      });
    }
  };

  const handleGoogleRegistration = async () => {
    try {
      await loginWithGoogle();

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered with Google!',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Google registration failed. Please try again.',
      });
    }
  };

  const handleGitHubRegistration = async () => {
    try {
      await loginWithGitHub();

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered with GitHub!',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'GitHub registration failed. Please try again.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Photo URL"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
     
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </form>

    
        <div className="mt-4 flex justify-between space-x-2">
          <button
            onClick={handleGoogleRegistration}
            className="bg-red-500 text-white p-2 rounded"
          >
            Register with Google
          </button>
          <button
            onClick={handleGitHubRegistration}
            className="bg-gray-800 text-white p-2 rounded"
          >
            Register with GitHub
          </button>
        </div>

    
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;