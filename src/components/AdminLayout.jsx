import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { LogOut } from 'lucide-react'
import api from '../api/axios'
import { AuthContext } from '../context/AuthContext'


export default function AdminLayout(){
const {user} = useContext(AuthContext)

const [open, setOpen] = useState(false)
const navigate = useNavigate()


async function logout(){
// backend should clear cookie
try{ await api.post('/api/auth/logout'); 

}catch(e){
console.log(e)
}
navigate('/admin/login')
}


return (
  (user && 
<div className="min-h-screen md:flex">
<aside className={`bg-white dark:bg-gray-300 p-4 md:w-64 ${open? 'fixed z-40 inset-0': ''}`}>
<div className="flex items-center justify-between mb-6">
<h3 className="font-bold text-lg">Admin</h3>
<button className="md:hidden" onClick={()=>setOpen(false)}>Close</button>
</div>
<nav className="flex flex-col gap-2">
<Link to="/admin" className="px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
<Link to="/admin/products" className="px-3 py-2 rounded hover:bg-gray-100">Products</Link>
<button onClick={logout} className="text-red-500 flex items-center gap-2"><LogOut/> Logout</button>
</nav>
</aside>
<div className="flex-1 p-6">
<Outlet />
</div>
</div>
  )
)
}