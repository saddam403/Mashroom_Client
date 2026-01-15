export default function AdminDashboard(){
return (
<div>
<h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="p-4 bg-white rounded-2xl shadow">Products summary here</div>
<div className="p-4 bg-white rounded-2xl shadow">Images</div>
<div className="p-4 bg-white rounded-2xl shadow">Stats</div>
</div>
</div>
)
}