import { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'


export default function AdminLogin(){
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()


async function handleSubmit(e){
e.preventDefault();
try{
// backend must set HttpOnly cookie on login
await api.post('/api/auth/login', { username, password });
navigate('/admin');
}catch(err){
alert(err.response?.data?.message || 'Login failed')
}
}


return (
<div className="min-h-screen flex items-center justify-center">
<form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
<h2 className="text-2xl font-bold mb-4">Admin Login</h2>
<input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" className="w-full p-3 mb-3 rounded-lg border" />
<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="password" className="w-full p-3 mb-3 rounded-lg border" />
<button className="w-full bg-primary text-white py-3 rounded-lg">Sign in</button>
</form>
</div>
)
}