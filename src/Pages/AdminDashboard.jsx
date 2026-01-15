//import { useEffect } from "react";
import { Link } from "react-router-dom";
//import api from "../api/axios";
import { ShoppingBag, Image, BarChart3,Contact  } from "lucide-react";
//import useAuth from "../hooks/useAuth";

export default function AdminDashboard() {
   // const { loading, requireAdmin } = useAuth();

  // useEffect(() => {
  //   requireAdmin();
  // }, [loading, requireAdmin]);

  //if (loading) return <p>Checking authentication...</p>;
  const cards = [
    {
      title: "Products",
      count: "48",
      icon: <ShoppingBag className="w-8 h-8 opacity-70" />,
      link: "/admin/products",
    },
    {
      title: "Images",
      count: "223",
      icon: <Image className="w-8 h-8 opacity-70" />,
      link: "/admin/media",
    },
    {
      title: "Reports",
      count: "View",
      icon: <BarChart3 className="w-8 h-8 opacity-70" />,
      link: "/admin/analytics",
    },
    {
      title: "Contacts",
      count: "3",
      icon: <Contact className="w-8 h-8 opacity-70" />,
      link: "/admin/contacts",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl 
                       hover:scale-[1.03] transition-transform cursor-pointer
                       flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500">{item.title}</p>
              <h3 className="text-xl font-bold">{item.count}</h3>
            </div>
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
