import React ,{useState}from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const navigate=useNavigate();
    const loginSubmit =async (e) =>{
        e.preventDefault();
        const loginDetails= {
            username,
            password,
        };
        const res =await fetch('/api/login',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(loginDetails),
            credentials:'include',

        })
        if(res.ok){
            const data =await res.json();
            alert(`logged in as  ${data.userType}`)
            navigate('/home');
        }
        else{
            toast.error('Please check your credentials');
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
     onSubmit={loginSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center text-red-600">Login</h1>

        <div className="mt-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            User Name:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"  value={password}
            onChange={(e) => setPassword(e.target.value)}

            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-red-600 rounded-lg shadow hover:bg-red-700"
          >
            Login
          </button>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/sign" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
