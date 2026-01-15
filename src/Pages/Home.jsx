import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

import TrustCarousel from '../components/TrustCarousel'


export default function Home() {

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/api/products');
      return res.data;
    }
  });

  return (
    <div>
      {/* <Header /> */}
      <main className="container mx-auto p-4">
        {/* TRUST CAROUSEL */}
        <TrustCarousel />
        
        <h1 className="text-3xl font-bold mb-6">Fresh Mushrooms</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200  rounded-xl animate-pulse"
                />
              ))
            : products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
        </div>
      </main>
    </div>
  );
}
