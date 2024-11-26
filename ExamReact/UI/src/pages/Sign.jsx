import React,{useState} from 'react';
import {Link ,useNavigate} from 'react-router-dom';
// import {toast} from 'react-toastify'
const Sign = () => {
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const[userType,setuserType]=useState('admin');
        const navigate = useNavigate();
         const signupSubmit = async (userDetails) =>{
            const res =await fetch (`/api/register`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(userDetails),
            });
            if(res.ok){
                // toast.success('User created successfully');
                alert('User created successfully')
                navigate('/');
            }
            else if(res===404){
              console.log("try",error)
            }
            else{
                toast.error('Error creating user');
               
            }
         }
         const submitForm=(e)=>{
            e.preventDefault();
            const userDetails={
                username,
                password,
                email,
                userType
            };
            signupSubmit(userDetails);
    
         }
        
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-red-600">Sign Up</h1>
        <form id="signupForm" onSubmit={submitForm}className="mt-6">

          <div className="mb-4">
            <label htmlFor="UserName" className="block text-sm font-medium text-gray-700">User Name:</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              name="username"
              id="username"
              type="text"
              value={username}
          onChange={(e)=>setUsername(e.target.value)}
              placeholder="Enter a unique user name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID:</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your Email ID"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              name="Password"
              id="Password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Role:</label>
            <select
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              name="userType"
              id="userType"
              value={userType}
              onChange={(e)=>setuserType(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-red-600 rounded-lg shadow hover:bg-red-600">
              Sign Up
            </button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Sign;
