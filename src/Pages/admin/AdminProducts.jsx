import { useQuery } from '@tanstack/react-query'
import api from '../../api/axios'
import { useState } from 'react'
import AdminProductForm from './AdminProductForm'


export default function AdminProducts(){
  const [editing, setEditing] = useState(null)

  const {
  data: products = [],
  isLoading,
  isError,
  error,
  refetch
} = useQuery({
  queryKey: ['admin-products'],
  queryFn: async () => {
    const { data } = await api.get('/api/products');
    return data;
  }
});

if (isLoading) return <p>Loading...</p>;
if (isError) return <p>{error.message}</p>;




return (
<div>
<div className="flex items-center justify-between mb-4">
<h2 className="text-2xl font-bold">Products</h2>
<button onClick={()=>setEditing({})} className="px-4 py-2 bg-[#0066ff] text-white rounded">Add Product</button>
</div>


<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{products.map(p=> (
<div key={p._id} className="bg-white p-4 rounded-2xl shadow">
<img src={p.images?.[0]?.url} className="h-40 w-full object-cover rounded" />
<h3 className="font-bold mt-2">{p.name}</h3>
<p className="text-sm text-gray-500">৳{p.price}</p>
<div className="mt-3 flex gap-2">
<button onClick={()=>setEditing(p)} className="px-3 py-1 rounded bg-yellow-300">Edit</button>
<button onClick={async()=>{ if(!confirm('Delete?'))return; await api.delete(`/api/products/${p._id}`); refetch(); }} className="px-3 py-1 rounded bg-red-200">Delete</button>
</div>
</div>
))}
</div>


{editing && <AdminProductForm product={editing} onClose={()=>{ setEditing(null); refetch(); }} />}
</div>
)
}