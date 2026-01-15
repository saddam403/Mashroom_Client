import { useState } from 'react'
import api from '../../api/axios'


export default function AdminProductForm({product = {}, onClose}){
const [name, setName] = useState(product.name || '')
const [description, setDescription] = useState(product.description || '')
const [price, setPrice] = useState(product.price || 0)
const [weight, setWeight] = useState(product.weight || 0)
const [files, setFiles] = useState([])


async function handleSubmit(e){
e.preventDefault();
const form = new FormData();
form.append('name', name);
form.append('description', description);
form.append('price', price);
form.append('weight', weight);
for(const f of files) form.append('images', f);


try{
if (product._id){
await api.put(`/api/products/${product._id}`, form);
} else {
await api.post('/api/products', form);
}
onClose();
}catch(err){
alert(err.response?.data?.message || 'Error');
}
}


return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
<form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl w-full max-w-xl">
<h3 className="text-xl font-bold mb-4">{product._id ? 'Edit' : 'Add'} Product</h3>
<label className="text-gray-700 font-medium">Name</label>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-3 mb-2 rounded border" />
{/* <label className="text-gray-700 font-medium">Description</label> */}
<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-3 mb-2 rounded border" />
<label className="text-gray-700 font-medium">Price</label>
<input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" className="w-full p-3 mb-2 rounded border" />
<label className="text-gray-700 font-medium">Weight</label>
<input value={weight} onChange={e=>setWeight(e.target.value)} placeholder="Weight" className="w-full p-3 mb-2 rounded border" />
 <label className="text-gray-700 font-medium">Photo</label>
<input type="file" multiple onChange={e=>setFiles([...e.target.files])} className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 cursor-pointer file:bg-indigo-600 file:text-white file:border-none file:px-4 file:py-2" />
<div className="flex gap-2">
<button className="px-4 py-2 bg-[#0066ff] text-white rounded">Save</button>
<button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
</div>
</form>
</div>
)
}